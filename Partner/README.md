<div align="center">
  <img src="public/images/hydrosync-logo.png" alt="HydroSync Logo" width="120" height="120">
  
  # HydroSync - Water Management System
  
  **Enterprise-grade water utility management platform built with Next.js**

  [![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![License]()](LICENSE)

  [Live Demo](#quick-start) · [Documentation](docs/README.md) · [Report Bug](https://github.com/yourusername/hydrosync/issues) · [Request Feature](https://github.com/yourusername/hydrosync/issues)

</div>

---

## Overview

HydroSync is a comprehensive water utility management system designed for municipal water departments and utility companies. It provides real-time monitoring, customer management, billing, compliance tracking, and emergency response capabilities in a modern, intuitive interface.

## Key Features

| Category | Features |
|----------|----------|
| **Operations** | Real-time dashboard, smart meters, work orders, network map, water quality |
| **Business** | Customer portal, advanced billing, asset management, inventory, compliance |
| **Analytics** | Consumption trends, revenue tracking, predictive insights, custom reports |
| **Security** | Role-based access control, 6 user roles, granular permissions |
| **Emergency** | Incident management, team coordination, response tracking |

---

## Role-Based Access Control

| Role | Level | Access |
|------|-------|--------|
| System Administrator | 5 | Full system access |
| Operations Manager | 4 | Operations, reports, billing, analytics |
| Field Technician | 3 | Work orders, meters, field ops, assets |
| System Operator | 3 | Monitoring, quality, emergency response |
| Customer Service | 2 | Customers, billing, portal management |
| Read-Only User | 1 | Dashboard and basic reports only |

---

## Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/hydrosync.git
cd hydrosync

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Login

Use any email/password combination and select a role to explore the system.

---

## Project Structure

\`\`\`
hydrosync/
├── app/                          # Next.js App Router
│   ├── dashboard/                # Protected dashboard routes
│   │   ├── analytics/            # Data analytics
│   │   ├── assets/               # Asset management
│   │   ├── billing/              # Billing system
│   │   ├── clients/              # Customer management
│   │   ├── compliance/           # Regulatory compliance
│   │   ├── emergency/            # Emergency response
│   │   ├── environmental/        # Environmental monitoring
│   │   ├── field/                # Field operations
│   │   ├── inventory/            # Inventory management
│   │   ├── meters/               # Smart meters
│   │   ├── quality/              # Water quality
│   │   ├── reports/              # Report generation
│   │   ├── revenue/              # Revenue tracking
│   │   ├── users/                # User management
│   │   ├── work-orders/          # Work order system
│   │   └── ...                   # Other modules
│   └── page.tsx                  # Login page
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── app-sidebar.tsx           # Navigation sidebar
│   └── role-guard.tsx            # Permission wrapper
├── lib/                          # Utilities
│   ├── auth.ts                   # Authentication & RBAC
│   └── utils.ts                  # Helper functions
├── docs/                         # Documentation
└── public/                       # Static assets
\`\`\`

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| UI Components | shadcn/ui + Radix UI |
| Charts | Recharts |
| Icons | Lucide React |
| Date Handling | date-fns |

---

## Scripts

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
\`\`\`

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/hydrosync)

### Docker

\`\`\`bash
docker build -t hydrosync .
docker run -p 3000:3000 hydrosync
\`\`\`

---

## Documentation

- [Getting Started](docs/getting-started.md)
- [Architecture](docs/architecture.md)
- [User Guide](docs/user-guide.md)
- [Role Management](docs/roles.md)
- [API Reference](docs/api-reference.md)
- [Deployment](docs/deployment.md)
- [Troubleshooting](docs/troubleshooting.md)

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Roadmap

- [ ] Database integration (Supabase/PostgreSQL)
- [ ] Real-time WebSocket features
- [ ] Mobile app version
- [ ] Advanced AI analytics
- [ ] Multi-language support
- [ ] API development
- [ ] Third-party integrations

---

<div align="center">
  <p>Built with Next.js and shadcn/ui</p>
  <p>© 2025 HydroSync. All rights reserved.</p>
</div>
