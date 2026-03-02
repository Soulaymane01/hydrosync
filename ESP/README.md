# HydroSync ESP32 Water Flow Sensor

A complete hardware integration guide for connecting an ESP32 microcontroller with a YF-S201 water flow sensor to the HydroSync backend API. This repository contains the firmware and documentation needed to send real-time, 100% accurate water consumption data over WiFi.

## 🛠 Hardware Setup & Requirements

To replicate this setup, you will need the following hardware components:
- **ESP32 Development Board** (e.g., ESP32 DevKit V1)
- **YF-S201 Hall Effect Water Flow Sensor** (or similar compatible flow sensor)
- **Jumper Wires** (Female-to-Female or Male-to-Female depending on your board)
- **Breadboard** (optional, for clean prototyping)
- **Micro USB Cable** (for programming the ESP32)
- **Power Bank** (optional, recommended for battery-powered deployment during demonstrations)

### Wiring Guide

Connect the YF-S201 sensor to your ESP32 as follows:

| YF-S201 Sensor Wire | ESP32 DevKit V1 Pin | Purpose |
|---------------------|---------------------|---------|
| **Red**             | `VIN` (or `5V`)     | Power supply to the sensor |
| **Black**           | `GND`               | Ground |
| **Yellow**          | `GPIO 27`           | Signal (Pulse Output) |

*Note: The YF-S201 requires a pull-up resistor. By default, the ESP32 code enables the internal pull-up resistor on GPIO 27 via software, so no external resistor is necessary.*

---

## 🏗 Technical Architecture

The ESP32 acts as the bridge between the physical water flow and the digital backend. The technical pipeline is designed to be highly reliable, loss-proof, and fast.

### 1. The Sensor Output
The **YF-S201** contains a plastic valve body, water rotor, and a hall-effect sensor. As water forces the rotor to roll, the hall-effect sensor outputs a corresponding electrical square-wave pulse signal.
* **Standard Calibration Rate:** ~450 pulses = 1 Liter of water.

### 2. ESP32 Interruption Handling (Zero Data Loss)
Every time the sensor sends a pulse, a hardware **Interrupt Service Routine (ISR)** inside the ESP32 is triggered. This ISR simply increments a counter (`pulseCount`) tracking the absolute number of pulses. This operation runs independently at the hardware level and executes instantly. No water pulses are missed, even during background network tasks like WiFi connections or HTTP POST requests.

### 3. Data Processing & Payload Transformation
To accurately report water consumption without losing data between network transmissions:
1. Every **3 seconds**, the ESP32 calculates how many *new* pulses occurred since the last upload by referencing its persistent `lastSendPulseCount`.
2. It divides these interval pulses by `450.0` to calculate the exact **water volume (in Liters)** consumed during this specific 3-second window.
3. This 100% accurate *Interval Volume* ensures zero data loss, accurately capturing every single drop regardless if the flow is continuous or sporadic.

### 4. Network and API Integration
The ESP32 constructs a JSON payload containing the exact volume consumed in the last interval and transmits it via an `HTTP POST` request over WiFi to the HydroSync backend API. The backend then saves this data block to the PostgreSQL database to add up to the daily accumulated total.

---

## 🚀 Complete Walkthrough Process

Here is the step-by-step breakdown of how a single drop of water makes its way to the user interface in roughly 5 seconds:

1. **Water Starts Flowing:** The physical act of turning on the tap forces the sensor's turbine to spin.
2. **Micro-Pulse Generation:** The YF-S201 generates continuous electrical square waves (pulses).
3. **Hardware Interrupt Detection (Real-Time):** The ESP32's `GPIO 27` catches *every single* falling edge of these, incrementing `pulseCount` instantly, regardless of what the main processor is doing.
4. **Volume Interval Calculation (Every 3 seconds):** The ESP32 freezes the pulse count for a microsecond to see how many new pulses were detected over the exact 3-second window. It calculates the accurate volume by dividing by 450.
5. **HTTP JSON Serialization:** The ESP32 creates a payload: 
   ```json
   {"meter_id": "METER-ESP32-001", "reading_value": 0.250, "unit": "L", "reading_type": "automatic"}
   ```
6. **Network Transmission:** The ESP32 utilizes the local 2.4GHz WiFi network to execute a POST request to the configured Django API IP address. *(Note: Any new water flowing during this split-second network transmission continues being correctly tallied by the hardware interrupt!)*.
7. **Database Storage:** The Django backend parses the incoming JSON, verifies the meter ID exists, and commits the 0.250 L to the PostgreSQL `MeterReadings` database table with a precise timestamp.
8. **Dashboard UI Refreshes:** The Next.js frontend fetches the new accumulated volume through its 2-second polling hook and instantly displays the updated metrics (like average calculated flow rate and total volume) and charts to the user.

---

## ⚙️ Initial Setup & Requirements

### Software Prerequisites
1. **[Arduino IDE](https://www.arduino.cc/en/software)** Installed (version 2.x recommended).
2. **ESP32 Board Support** added to Arduino IDE via the Boards Manager:
   * URL: `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
3. **ArduinoJson Library** installed (Search for `ArduinoJson` by Benoit Blanchon in the Arduino IDE Library Manager).

### Modifying the Code (Your Responsibilities)

Before uploading the `.ino` firmware to your board, you must configure the environment variables within `esp32_water_sensor.ino`.

#### 1. Configure WiFi Credentials
Replace the placeholders with the actual 2.4GHz network the ESP32 and Backend will share (e.g., your smartphone hotspot or local WiFi).
```cpp
const char* WIFI_SSID = "YOUR_WIFI_SSID";          
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";
```

#### 2. Configure Backend API Endpoint
Find the IPv4 address of the computer running your Django backend (run `ipconfig` on Windows or `ifconfig` on Mac/Linux). **Do not use `127.0.0.1` or `localhost`**, because the ESP32 is an external device on the network. Use your real machine network IP.

```cpp
// Example: If your computer's IP is 192.168.100.36
const char* API_URL = "http://192.168.100.36:8000/api/esp32/data/";
```

#### 3. Upload The Code
Select your ESP32 board (`DOIT ESP32 DEVKIT V1` is common) and the appropriate COM port in the Arduino IDE. Hit the **Upload** button. Monitor the Serial Output at `115200` baud.

---

## 🔗 Useful Links & API Reference

### Primary ESP32 API Endpoint
* **URL:** `POST http://<SERVER_IP>:8000/api/esp32/data/`
* **Payload Format:**
  ```json
  {
    "meter_id": "METER-ESP32-001",
    "reading_value": <float>,
    "unit": "L",
    "reading_type": "automatic"
  }
  ```
* **Success Response:** `HTTP 201 Created`

### Testing and Troubleshooting Commands

**Start the Django Backend (Important):**
Ensure your Django backend is started via `0.0.0.0` to allow external network connections from the ESP32!
```bash
python manage.py runserver 0.0.0.0:8000
```

**Ping Your API from CMD (To ensure Backend is listening on the network):**
```bash
curl http://YOUR_HTTP_SERVER_IP:8000/api/meters/
```

**Django Command to Clear Test Data before the hackathon demo:**
Run this in your backend Django terminal if you want to wipe old recordings and start the dashboard volumes from zero.
```bash
python manage.py shell
```
```python
from core.models import MeterReadings
MeterReadings.objects.all().delete()
```

---
*Created by the Hardware Integration Team for the HydroSync Smart Water Meter Project.*
