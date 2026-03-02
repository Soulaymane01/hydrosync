# Deployment Guide

## Vercel (Recommended)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/hydrosync)

### Manual Deployment

\`\`\`bash
npm i -g vercel
vercel login
vercel --prod
\`\`\`

## Docker

### Dockerfile

\`\`\`dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

### Build and Run

\`\`\`bash
docker build -t hydrosync .
docker run -p 3000:3000 hydrosync
\`\`\`

## Self-Hosted

\`\`\`bash
# Install PM2
npm install -g pm2

# Build and start
npm run build
pm2 start npm --name "hydrosync" -- start
pm2 save
\`\`\`

## Production Checklist

- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Backups configured
- [ ] Monitoring setup
- [ ] Error tracking enabled
