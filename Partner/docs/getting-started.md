# Getting Started with HydroSync

## Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm** package manager

## Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/hydrosync.git
cd hydrosync

# Install dependencies
npm install

# Start the development server
npm run dev
\`\`\`

## First Run

1. Open `http://localhost:3000`
2. Enter any email and password (demo mode)
3. Select a role to explore different access levels

## Configuration

### Environment Variables

Create a `.env.local` file:

\`\`\`env
NEXT_PUBLIC_APP_NAME=HydroSync
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### Customizing the Theme

Edit `app/globals.css` to customize colors:

\`\`\`css
:root {
  --primary: 210 100% 50%;
  --background: 0 0% 100%;
  --foreground: 222 84% 5%;
}
\`\`\`

### Branding

Replace the logo at `public/images/hydrosync-logo.png`

## Next Steps

- Read the [User Guide](./user-guide.md)
- Check [Role Management](./roles.md)
- See [Deployment](./deployment.md) for production setup
