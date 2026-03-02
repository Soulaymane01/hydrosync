<div align="center">
  
  # HydroSync - Smart Water Management System
  
  **Enterprise-grade water utility management platform and customer-facing smart water meter application.**
  
</div>

---

## Overview

HydroSync is a comprehensive monorepo containing the entire ecosystem for modern water management. It serves both municipal water departments and individual water consumers.

This repository includes three primary components:

1. **[Backend API](./Backend)**: The core engine built with Django and Django REST Framework. It handles operations, billing, Role-Based Access Control (RBAC), and analytics.
2. **[Partner Dashboard](./Partner)**: An enterprise-grade water utility management platform built with Next.js, serving system operators, field technicians, and customer service teams.
3. **[Client Application](./Client)**: A mobile-first Next.js web application for smart water meter monitoring, enabling consumers to track usage, receive leak alerts, and manage billing securely.

---

## Technology Stack

- **Backend ecosystem**: Python 3.12+, Django 5.0, Django REST Framework, PostgreSQL 14+
- **Frontend ecosystem**: Next.js 14/15, TypeScript 5, Tailwind CSS, shadcn/ui

---

## Quick Start

### 1. Backend Service
Make sure you have Python 3.12+ and PostgreSQL 14+ installed.

```bash
cd Backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py runserver
```
Check the [Backend README](./Backend/README.md) for detailed information on database configuration and service tools.

### 2. Partner Dashboard
Requires Node.js 18.17+

```bash
cd Partner
npm install
npm run dev
```
Explore the [Partner README](./Partner/README.md) for more info on RBAC and documentation.

### 3. Client Application
Requires Node.js 18.0+

```bash
cd Client
npm install
npm run dev
```
Explore the [Client README](./Client/README.md) for architecture and dashboard breakdown.

---

## Contributing

For changes across the monorepo, please refer to the specific module's contributing guidelines along with the master repository standard practices. Make sure you install dependencies locally for the respective component before making API or UI changes.

---

<div align="center">
  <p>© 2026 HydroSync. All rights reserved.</p>
</div>
