# Troubleshooting Guide

Common issues and their solutions.

## Installation Issues

### npm install fails

**Problem:** Dependencies fail to install

**Solutions:**
1. Clear npm cache:
   \`\`\`bash
   npm cache clean --force
   \`\`\`

2. Delete node_modules and lock file:
   \`\`\`bash
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`

3. Use a different package manager:
   \`\`\`bash
   yarn install
   # or
   pnpm install
   \`\`\`

### Node version errors

**Problem:** "Unsupported engine" or Node version errors

**Solution:** Install Node.js 18.17 or later:
\`\`\`bash
nvm install 18
nvm use 18
\`\`\`

---

## Runtime Issues

### Page not loading

**Problem:** Dashboard pages don't load or show errors

**Solutions:**
1. Clear browser cache and cookies
2. Check browser console for errors
3. Ensure you're logged in with valid credentials
4. Check that localStorage is enabled

### Permission denied

**Problem:** "Access Denied" message on pages

**Solutions:**
1. Log out and log in again
2. Select a role with appropriate permissions
3. Contact administrator if you need elevated access

### Charts not displaying

**Problem:** Charts show blank or don't render

**Solutions:**
1. Refresh the page
2. Check browser console for JavaScript errors
3. Ensure window is fully loaded
4. Try a different browser

---

## Authentication Issues

### Can't log in

**Problem:** Login doesn't work

**Solutions:**
1. In demo mode, any email/password works
2. Select a role when prompted
3. Clear localStorage:
   \`\`\`javascript
   localStorage.clear()
   \`\`\`

### Session expired

**Problem:** Randomly logged out

**Solutions:**
1. Clear browser cookies
2. Disable browser extensions
3. Check for localStorage conflicts

---

## Build Issues

### Build fails

**Problem:** `npm run build` fails

**Solutions:**
1. Check for TypeScript errors:
   \`\`\`bash
   npx tsc --noEmit
   \`\`\`

2. Fix linting issues:
   \`\`\`bash
   npm run lint -- --fix
   \`\`\`

3. Check for missing dependencies:
   \`\`\`bash
   npm ls
   \`\`\`

### Type errors

**Problem:** TypeScript compilation errors

**Solutions:**
1. Check `tsconfig.json` configuration
2. Ensure all types are properly imported
3. Update dependencies:
   \`\`\`bash
   npm update
   \`\`\`

---

## Deployment Issues

### Vercel deployment fails

**Problem:** Deployment to Vercel fails

**Solutions:**
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Verify `next.config.mjs` configuration
4. Check for build-time errors locally first

### Docker container won't start

**Problem:** Container exits immediately

**Solutions:**
1. Check container logs:
   \`\`\`bash
   docker logs <container_id>
   \`\`\`

2. Verify Dockerfile configuration
3. Ensure all required environment variables are set
4. Check port conflicts

---

## Performance Issues

### Slow page loads

**Problem:** Pages take too long to load

**Solutions:**
1. Check network tab for slow requests
2. Reduce data payload sizes
3. Implement pagination for large lists
4. Use React.memo for expensive components

### Memory issues

**Problem:** High memory usage

**Solutions:**
1. Check for memory leaks in useEffect
2. Properly clean up subscriptions
3. Use pagination instead of loading all data
4. Monitor with browser DevTools

---

## Getting Help

If you can't resolve your issue:

1. **Search Issues:** Check GitHub issues for similar problems
2. **Create Issue:** Open a new GitHub issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Error messages
   - Environment details (OS, Node version, browser)
3. **Contact Support:** Email support@hydrosync.app

---

## Debug Mode

Enable debug logging by adding to your code:

\`\`\`typescript
// Enable verbose logging
localStorage.setItem('hydrosync-debug', 'true')

// Check current user
console.log(localStorage.getItem('hydrosync-user'))

// Check permissions
import { getCurrentUser, hasPermission } from '@/lib/auth'
const user = getCurrentUser()
console.log('User:', user)
console.log('Can access meters:', hasPermission(user, 'meters', 'read'))
