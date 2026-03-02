# Changelog

All notable changes to HydroSync will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2026-01-31

### 🚀 Changes & Features (Hydrosync Partner)

#### Frontend (What I Added)
*   **Real JWT Authentication**: Integrated `axios` with Django backend. Replaced mock login.
*   **Role-Based Access Control (RBAC)**: Implemented `RoleGuard` component.
    *   Protect specific routes based on user role (e.g., restricted Billing for technicians).
*   **Session Management**: Login state persists on refresh using `localStorage`.
*   **Packages Added**: `axios` for API requests.

#### Backend (What I Added for Partner Support)
*   **Auth API**: Created endpoints for secure Login/Logout (`/api/auth/...`).
*   **User Management**: Connected Django Users/Roles to the API.
*   **Seeding Scripts**: Created `seed_permissions` and `seed_roles` commands.

---

### 👷‍♂️ Team Guide: How to Run This Branch
**Follow these exact steps after pulling:**

#### 1. Backend Setup (`hydrosync_backend`)
1.  **Dependencies**: `pip install -r requirements.txt`
2.  **Database**: `python manage.py migrate`
3.  **Seed Essential Data**:
    *   `python manage.py seed_permissions` (Required)
    *   `python manage.py seed_roles` (Required)
4.  **Create Your User**:
    *   `python manage.py createsuperuser`
    *   Go to Admin (`/admin`), create a test user, and **assign them a Role** (e.g., Manager).

#### 2. Frontend Setup (`hydrosync-partner`)
1.  **Install**: `npm install`
2.  **Run**: `npm run dev`
3.  **Login**: Use the credential you created in Django Admin.