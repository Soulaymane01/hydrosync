/*
 * HydroSync ESP32 Water Flow Sensor
 * 
 * Hardware: ESP32 DevKit V1 + YF-S201 Flow Sensor
 * Purpose: Measure water flow and send data to HydroSync backend
 * 
 * Author: HydroSync Team
 * Version: 1.0.0
 * Date: 2026-02-01
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// ============================================================================
// CONFIGURATION - MODIFY THESE VALUES FOR YOUR SETUP
// ============================================================================

// WiFi Credentials
const char* WIFI_SSID = "YOUR_WIFI_SSID_HERE";          // TODO: Replace with your WiFi network name
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD_HERE";  // TODO: Replace with your WiFi password

// Backend API Configuration
const char* API_URL = "http://YOUR_IP_ADDRESS:8000/api/esp32/data/";  // TODO: Replace YOUR_IP_ADDRESS with your computer's local IP (e.g., 192.168.1.100)

// Meter Configuration
const char* METER_ID = "METER-ESP32-001";  // Must match the meter_id in your database

// YF-S201 Sensor Configuration
const int SENSOR_PIN = 27;                 // GPIO pin connected to YF-S201 signal (yellow wire)
const float PULSES_PER_LITER = 450.0;      // TODO: Adjust if your sensor has different pulse rate (typically 450 pulses/liter for YF-S201)

// Timing Configuration
const unsigned long SEND_INTERVAL = 3000; // Send data every 3 seconds (3000 milliseconds)
const unsigned long FLOW_CALC_INTERVAL = 1000; // Calculate flow rate every 1 second

// ============================================================================
// GLOBAL VARIABLES
// ============================================================================

// Pulse counting
volatile unsigned long pulseCount = 0;
unsigned long lastPulseCount = 0;
unsigned long lastSendPulseCount = 0;  // Track pulses at last send for interval volume
unsigned long lastFlowCalcTime = 0;
unsigned long lastSendTime = 0;

// Flow measurements
float currentFlowRate = 0.0;    // Current flow rate in L/min
float totalVolume = 0.0;        // Total volume in liters since startup
float dailyVolume = 0.0;        // Volume accumulated today (resets at midnight)

// Daily reset tracking
int lastDay = 0;

// ============================================================================
// INTERRUPT SERVICE ROUTINE
// ============================================================================

void IRAM_ATTR pulseCounter() {
  pulseCount++;
}

// ============================================================================
// SETUP FUNCTION
// ============================================================================

void setup() {
  // Initialize Serial Monitor
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("\n\n========================================");
  Serial.println("  HydroSync ESP32 Water Flow Sensor");
  Serial.println("========================================");
  Serial.println("Version: 1.0.0");
  Serial.println("Meter ID: " + String(METER_ID));
  Serial.println("========================================\n");
  
  // Configure sensor pin
  pinMode(SENSOR_PIN, INPUT_PULLUP);
  
  // Attach interrupt for pulse counting
  attachInterrupt(digitalPinToInterrupt(SENSOR_PIN), pulseCounter, FALLING);
  
  Serial.println("[SENSOR] YF-S201 initialized on GPIO " + String(SENSOR_PIN));
  Serial.println("[SENSOR] Pulses per liter: " + String(PULSES_PER_LITER));
  
  // Connect to WiFi
  connectToWiFi();
  
  // Initialize timers
  lastFlowCalcTime = millis();
  lastSendTime = millis();
  
  // Get current day for daily reset
  lastDay = getDay();
  
  Serial.println("\n[SYSTEM] Setup complete! Starting measurements...\n");
}

// ============================================================================
// MAIN LOOP
// ============================================================================

void loop() {
  unsigned long currentTime = millis();
  
  // Check if we need to reset daily volume (midnight rollover)
  int currentDay = getDay();
  if (currentDay != lastDay) {
    Serial.println("\n[DAILY RESET] New day detected - Resetting daily volume");
    Serial.println("[DAILY RESET] Previous day total: " + String(dailyVolume, 3) + " L");
    dailyVolume = 0.0;
    lastDay = currentDay;
  }
  
  // Calculate flow rate every second
  if (currentTime - lastFlowCalcTime >= FLOW_CALC_INTERVAL) {
    calculateFlowRate();
    lastFlowCalcTime = currentTime;
  }
  
  // Send data to backend at specified interval
  if (currentTime - lastSendTime >= SEND_INTERVAL) {
    sendDataToBackend();
    lastSendTime = currentTime;
  }
  
  // Check WiFi connection
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("\n[WIFI] Connection lost! Reconnecting...");
    connectToWiFi();
  }
  
  delay(100); // Small delay to prevent watchdog timer issues
}

// ============================================================================
// WIFI CONNECTION FUNCTION
// ============================================================================

void connectToWiFi() {
  Serial.println("\n[WIFI] Connecting to: " + String(WIFI_SSID));
  
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n[WIFI] Connected successfully!");
    Serial.println("[WIFI] IP Address: " + WiFi.localIP().toString());
    Serial.println("[WIFI] Signal Strength: " + String(WiFi.RSSI()) + " dBm");
  } else {
    Serial.println("\n[WIFI] Connection FAILED!");
    Serial.println("[WIFI] Please check your WiFi credentials and try again");
  }
}

// ============================================================================
// FLOW RATE CALCULATION
// ============================================================================

void calculateFlowRate() {
  // Disable interrupts temporarily to read pulse count
  noInterrupts();
  unsigned long currentPulseCount = pulseCount;
  interrupts();
  
  // Calculate pulses since last calculation
  unsigned long pulseDiff = currentPulseCount - lastPulseCount;
  lastPulseCount = currentPulseCount;
  
  // Calculate flow rate in L/min
  // Flow (L/min) = (Pulses per second * 60) / Pulses per liter
  float flowRateLPS = pulseDiff / (FLOW_CALC_INTERVAL / 1000.0); // Pulses per second
  currentFlowRate = (flowRateLPS * 60.0) / PULSES_PER_LITER;     // Convert to L/min
  
  // Calculate volume added in this interval (in liters)
  float volumeAdded = pulseDiff / PULSES_PER_LITER;
  totalVolume += volumeAdded;
  dailyVolume += volumeAdded;
  
  // Print status to Serial Monitor
  Serial.println("---------------------------------------");
  Serial.println("Time: " + String(millis() / 1000) + "s");
  Serial.println("Pulses: " + String(currentPulseCount) + " (+" + String(pulseDiff) + ")");
  Serial.println("Flow Rate: " + String(currentFlowRate, 2) + " L/min");
  Serial.println("Interval Volume: " + String(volumeAdded, 3) + " L");
  Serial.println("Total Volume: " + String(totalVolume, 3) + " L");
  Serial.println("Daily Volume: " + String(dailyVolume, 3) + " L");
  Serial.println("---------------------------------------");
}

// ============================================================================
// SEND DATA TO BACKEND
// ============================================================================

void sendDataToBackend() {
  // Check WiFi connection
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("\n[HTTP] Cannot send - WiFi not connected!");
    return;
  }
  
  Serial.println("\n[HTTP] Preparing to send data to backend...");
  
  // Calculate volume consumed since last send
  // Capture current pulse count (interrupt continues during HTTP send!)
  noInterrupts();
  unsigned long currentSendPulses = pulseCount;
  interrupts();
  
  // Calculate volume since last transmission
  unsigned long pulsesSinceLastSend = currentSendPulses - lastSendPulseCount;
  float intervalVolume = pulsesSinceLastSend / PULSES_PER_LITER;
  lastSendPulseCount = currentSendPulses;  // Update for next interval
  
  // Calculate average flow rate for display info
  float intervalSeconds = SEND_INTERVAL / 1000.0;
  float averageFlowRate = (intervalVolume / intervalSeconds) * 60.0;  // L/min
  
  HTTPClient http;
  http.begin(API_URL);
  http.addHeader("Content-Type", "application/json");
  
  // Create JSON payload - send VOLUME (not flow rate!)
  // Backend will sum these volumes for daily total
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["meter_id"] = METER_ID;
  jsonDoc["reading_value"] = intervalVolume;  // Volume in liters consumed this interval
  jsonDoc["unit"] = "L";                       // Liters (not L/min!)
  jsonDoc["reading_type"] = "automatic";
  
  String jsonString;
  serializeJson(jsonDoc, jsonString);
  
  Serial.println("[HTTP] Sending JSON: " + jsonString);
  Serial.println("[HTTP] Interval Volume: " + String(intervalVolume, 3) + " L");
  Serial.println("[HTTP] Average Flow Rate: " + String(averageFlowRate, 2) + " L/min (calculated)");
  Serial.println("[HTTP] Total Volume: " + String(totalVolume, 3) + " L");
  Serial.println("[HTTP] URL: " + String(API_URL));
  
  // Send POST request
  int httpResponseCode = http.POST(jsonString);
  
  // Check response
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("[HTTP] Response Code: " + String(httpResponseCode));
    
    if (httpResponseCode == 201 || httpResponseCode == 200) {
      Serial.println("[HTTP] ✓ Data sent successfully!");
      Serial.println("[HTTP] Server Response: " + response);
    } else {
      Serial.println("[HTTP] ✗ Unexpected response code");
      Serial.println("[HTTP] Response: " + response);
    }
  } else {
    Serial.println("[HTTP] ✗ Error sending data!");
    Serial.println("[HTTP] Error Code: " + String(httpResponseCode));
    Serial.println("[HTTP] Error: " + http.errorToString(httpResponseCode));
    Serial.println("[HTTP] Please check:");
    Serial.println("       - Backend server is running");
    Serial.println("       - API_URL is correct");
    Serial.println("       - Firewall is not blocking connection");
  }
  
  http.end();
  Serial.println();
}

// ============================================================================
// HELPER FUNCTION - Get Current Day
// ============================================================================

int getDay() {
  // Simple day counter based on milliseconds
  // For a more accurate calendar day, you would use NTP time synchronization
  return (millis() / (1000UL * 60 * 60 * 24));
}
