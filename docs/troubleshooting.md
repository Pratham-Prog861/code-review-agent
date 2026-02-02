# Troubleshooting

Common issues and solutions for Code Review Agent.

## 🔍 Quick Diagnosis

### Check Application Health

Run through this checklist:

- [ ] Application is running on correct port (default: 3000)
- [ ] `.env.local` file exists with API keys
- [ ] API keys are valid and not expired
- [ ] Internet connection is stable
- [ ] Browser is up-to-date

### Error Categories

- [Installation Issues](#installation-issues)
- [API/Connection Issues](#apiconnection-issues)
- [Analysis Issues](#analysis-issues)
- [Performance Issues](#performance-issues)
- [UI/Display Issues](#uidisplay-issues)

## Installation Issues

### Port Already in Use

**Problem**: Error message "Port 3000 is already in use"

**Solution**:

```bash
# Option 1: Use different port
PORT=3001 npm run dev

# Option 2: Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 3: Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9
```

### Module Not Found

**Problem**: Error "Cannot find module '@/components/...'"

**Solution**:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or with npm cache clear
npm cache clean --force
npm install
```

### TypeScript Errors

**Problem**: Type errors during build

**Solution**:

```bash
# Regenerate TypeScript declarations
rm -rf .next
npm run build

# If persists, check tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Tailwind Classes Not Working

**Problem**: Styles not applying

**Solution**:

1. Check `tailwind.config.ts` content paths:

```typescript
content: [
  "./src/app/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
],
```

2. Restart dev server:

```bash
npm run dev
```

## API/Connection Issues

### GEMINI_API_KEY Not Configured

**Problem**: Error "GEMINI_API_KEY is not configured"

**Symptoms**:

- 500 error when clicking "Review Code"
- Console error about missing API key

**Solution**:

1. Create/check `.env.local` file in project root:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

2. Verify key is valid at [Google AI Studio](https://makersuite.google.com/app/apikey)

3. Restart the development server:

```bash
npm run dev
```

4. Test with curl:

```bash
curl -X POST http://localhost:3000/api/review \
  -H "Content-Type: application/json" \
  -d '{"code":"console.log(\"test\")","language":"javascript","depth":"quick","useCompression":false}'
```

### ScaleDown Compression Not Working

**Problem**: No compression statistics shown

**Symptoms**:

- "ScaleDown Compression" toggle works but no effect
- Original and compressed tokens are the same
- No compression time shown

**Solution**:

1. Check if API key is set:

```env
SCALEDOWN_API_KEY=your_scaledown_api_key
```

2. Verify key at [ScaleDown Dashboard](https://scaledown.xyz/)

3. Check console for ScaleDown errors:

```bash
# Look for messages like:
# "ScaleDown API Error: ..."
# "Proceeding without compression"
```

4. Test ScaleDown directly:

```bash
curl -X POST https://api.scaledown.xyz/compress/raw \
  -H "x-api-key: your_key" \
  -H "Content-Type: application/json" \
  -d '{"context":"test","prompt":"test","scaledown":{"rate":"auto"}}'
```

### API Request Timeout

**Problem**: Request times out or takes too long

**Symptoms**:

- Spinner never stops
- "Request timeout" error
- Takes longer than 60 seconds

**Solution**:

1. Check your internet connection

2. Reduce code size:

```javascript
// Instead of entire file
// Review smaller sections
```

3. Use Quick Scan instead of Thorough:

```javascript
depth: "quick"; // Faster analysis
```

4. Disable compression for faster response:

```javascript
useCompression: false;
```

5. Increase timeout (in `src/app/page.tsx`):

```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 120000); // 2 min
```

### CORS Errors

**Problem**: CORS policy error in browser console

**Solution**:

Add CORS headers in `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "POST, OPTIONS" },
        { key: "Access-Control-Allow-Headers", value: "Content-Type" },
      ],
    },
  ];
},
```

### Rate Limit Exceeded

**Problem**: "Rate limit exceeded" error

**Solution**:

1. Wait and retry (limits reset hourly)

2. For Google Gemini, check quota at [Google Cloud Console](https://console.cloud.google.com/)

3. For ScaleDown, check usage at [ScaleDown Dashboard](https://scaledown.xyz/)

4. Implement request queuing:

```typescript
// Add delay between requests
await new Promise((resolve) => setTimeout(resolve, 1000));
```

## Analysis Issues

### No Issues Found (Unexpectedly)

**Problem**: Code has obvious issues but none reported

**Possible Causes**:

1. **Wrong language selected**: Verify language matches code
2. **Quick scan depth**: Use Standard or Thorough for more detail
3. **Code is actually good**: AI might be correct!

**Solution**:

```typescript
// Try different settings
language: "javascript", // Make sure this matches
depth: "thorough",      // More comprehensive
```

### Incorrect Analysis Results

**Problem**: AI suggests wrong fixes or misunderstands code

**Common Scenarios**:

1. **Context missing**: AI doesn't have full file context

```javascript
// Add context comments
// This function is called from...
// The parameter 'data' is always validated upstream
function processData(data) { ... }
```

2. **Domain-specific code**: AI may not understand specialized libraries

```javascript
// Explain specialized code
// Using custom framework that handles...
customFramework.doThing();
```

3. **Intentional patterns**: Code that looks wrong but isn't

```javascript
// Mark intentional patterns
// eslint-disable-next-line
eval(dynamicCode); // Required for plugin system
```

**Solution**:

- Add explanatory comments
- Use more specific depth setting
- Try rephrasing code

### Quality Score Seems Inaccurate

**Problem**: Score doesn't match code quality perception

**Why This Happens**:

- AI scoring is probabilistic
- Different runs may give slightly different scores
- Cultural/stylistic differences

**Solution**:

1. Focus on issues, not just score
2. Run analysis multiple times
3. Use score as relative metric, not absolute

### Missing Line Numbers

**Problem**: Issues don't have line numbers

**Why**: Some issues are general (not line-specific)

**Examples**:

- "Add more documentation" (general)
- "Consider using TypeScript" (project-wide)
- "Performance is good" (overall assessment)

**Not a Bug**: Expected behavior for general issues.

## Performance Issues

### Slow Analysis

**Problem**: Reviews take longer than expected

**Expected Times**:

- Quick: 5-10 seconds
- Standard: 10-20 seconds
- Thorough: 20-40 seconds

**If Slower**:

1. Check internet speed:

```bash
# Test connection
ping google.com
```

2. Try without compression:

```typescript
useCompression: false; // Faster but costs more
```

3. Reduce code size:

```javascript
// Review in smaller chunks
// 100-200 lines at a time
```

4. Check API service status:
   - [Google AI Status](https://status.cloud.google.com/)
   - [ScaleDown Status](https://scaledown.xyz/status)

### High Memory Usage

**Problem**: Browser tab uses lots of memory

**Solution**:

1. Close other tabs
2. Clear browser cache
3. Restart browser
4. Use incognito/private mode

```bash
# Chrome task manager
Shift + Esc (Windows/Linux)
Cmd + Option + Esc (Mac)
```

### Application Crashes

**Problem**: Page becomes unresponsive

**Solution**:

1. Check browser console for errors:

```
F12 → Console tab
```

2. Look for memory leaks:

```javascript
// In browser console
performance.memory.usedJSHeapSize;
```

3. Disable browser extensions temporarily

4. Update browser to latest version

## UI/Display Issues

### Dark Mode Not Working

**Problem**: Dark mode toggle doesn't work

**Solution**:

1. Check if `next-themes` is installed:

```bash
npm install next-themes
```

2. Verify `ThemeProvider` in layout:

```typescript
// src/app/layout.tsx
import { ThemeProvider } from "next-themes";

<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>
```

3. Clear local storage:

```javascript
// In browser console
localStorage.clear();
location.reload();
```

### Styles Look Broken

**Problem**: UI appears unstyled or misaligned

**Solution**:

1. Hard refresh browser:

```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

2. Clear Next.js cache:

```bash
rm -rf .next
npm run dev
```

3. Check if CSS loaded:

```javascript
// In browser console
document.styleSheets.length; // Should be > 0
```

4. Verify Tailwind is working:

```bash
# Check tailwind.config.ts exists
# Check postcss.config.mjs exists
```

### Components Not Appearing

**Problem**: Missing buttons, panels, or sections

**Solution**:

1. Check browser console for component errors

2. Verify all dependencies installed:

```bash
npm install
```

3. Check for client component errors:

```typescript
// Components using hooks need "use client"
"use client";

import { useState } from "react";
```

### Mobile View Issues

**Problem**: Layout broken on mobile

**Solution**:

1. Test responsive design:

```
F12 → Toggle device toolbar
```

2. Check Tailwind responsive classes:

```typescript
// Use responsive prefixes
className = "text-sm md:text-base lg:text-lg";
```

3. Verify viewport meta tag:

```html
<!-- Should be in layout.tsx -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## Advanced Troubleshooting

### Enable Debug Logging

Add to `.env.local`:

```env
NEXT_PUBLIC_DEBUG=true
NODE_ENV=development
```

### Check Network Requests

1. Open browser DevTools (F12)
2. Go to Network tab
3. Click "Review Code"
4. Inspect `/api/review` request:
   - Status: Should be 200
   - Response: Check for errors
   - Timing: Check how long it took

### Inspect API Response

```bash
# Test API directly
curl -X POST http://localhost:3000/api/review \
  -H "Content-Type: application/json" \
  -d @- << EOF
{
  "code": "function test() { return true; }",
  "language": "javascript",
  "depth": "standard",
  "useCompression": false
}
EOF
```

### Check Environment Variables

```bash
# List all env vars (be careful not to expose keys!)
printenv | grep -i api

# Or in Node.js
node -e "console.log(process.env.GEMINI_API_KEY ? 'Set' : 'Not set')"
```

### Server Logs

Check terminal where dev server is running for:

```
✓ ScaleDown compression successful
✗ ScaleDown API Error: ...
✓ Gemini API request successful
✗ Error analyzing code: ...
```

## Getting Help

### Before Asking for Help

Collect this information:

1. **Error Message**: Full text of any errors
2. **Steps to Reproduce**: What you did before error
3. **Environment**:
   - OS: Windows/Mac/Linux
   - Node version: `node --version`
   - npm version: `npm --version`
   - Browser: Chrome/Firefox/Safari
4. **Code Sample**: Minimal example that triggers issue
5. **Screenshots**: If UI-related

### Where to Get Help

1. **Documentation**:
   - Read relevant guide
   - Check [FAQ](#faqs)
   - Search this troubleshooting guide

2. **GitHub Issues**:
   - Search existing issues
   - Open new issue with details above

3. **Community**:
   - Discord server (if available)
   - Stack Overflow (tag with project name)

4. **Support**:
   - Email: support@yourcompany.com

### Issue Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**

- OS: [e.g. Windows 11]
- Node: [e.g. 20.10.0]
- Browser: [e.g. Chrome 120]

**Additional context**
Any other relevant information.
```

## Known Issues

### Current Limitations

1. **Single File Only**: Can't analyze multiple files together (coming soon)
2. **No Git Integration**: Can't review diffs directly (planned)
3. **Large Files**: Files >50k characters may timeout
4. **Language Detection**: Must manually select language
5. **No Persistence**: Results not saved (unless you copy them)

### Workarounds

**For Large Files**:

```javascript
// Split into sections
// Review critical parts separately
```

**For Multi-File Projects**:

```javascript
// Review main files individually
// Provide context in comments
```

## FAQs

**Q: App won't start**
A: Check if port is available, dependencies are installed, Node version is 20+

**Q: API key error persists after adding**
A: Restart dev server, verify `.env.local` location, check for typos

**Q: Results are inconsistent**
A: AI is probabilistic. Slight variations are normal. Focus on critical issues.

**Q: Compression doesn't work**
A: ScaleDown API key may not be set or service temporarily unavailable. Check logs.

**Q: Very slow on Windows**
A: Disable Windows Defender real-time scanning for project folder (temporarily)

---
