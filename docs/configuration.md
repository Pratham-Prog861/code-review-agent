# Configuration

This guide covers all configuration options for the Code Review Agent.

## Environment Variables

### Required Variables

#### GEMINI_API_KEY

- **Required**: Yes
- **Description**: Google Gemini API key for AI-powered code analysis
- **Where to get**: [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Example**: `AIzaSyD...your_key_here`

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Optional Variables

#### SCALEDOWN_API_KEY

- **Required**: No (but highly recommended)
- **Description**: ScaleDown API key for token compression
- **Where to get**: [ScaleDown](https://scaledown.xyz/)
- **Example**: `sk_live_...your_key_here`
- **Impact if missing**: Compression features disabled, higher API costs

```env
SCALEDOWN_API_KEY=your_scaledown_api_key_here
```

### Environment File Setup

Create a `.env.local` file in the project root:

```bash
# .env.local
GEMINI_API_KEY=your_gemini_api_key
SCALEDOWN_API_KEY=your_scaledown_api_key
```

> **Security Note**: Never commit `.env.local` to version control. It's already in `.gitignore`.

### Environment Variables by Deployment

#### Development

```env
GEMINI_API_KEY=your_dev_key
SCALEDOWN_API_KEY=your_dev_key
```

#### Production (Vercel)

```bash
# Set via Vercel Dashboard or CLI
vercel env add GEMINI_API_KEY production
vercel env add SCALEDOWN_API_KEY production
```

#### Production (Netlify)

```bash
# Set via Netlify Dashboard or CLI
netlify env:set GEMINI_API_KEY your_key
netlify env:set SCALEDOWN_API_KEY your_key
```

## API Configuration

### Gemini Model Selection

In `src/app/api/review/route.ts`:

```typescript
// Change the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // Options: gemini-pro, gemini-2.5-flash
});
```

### ScaleDown Configuration

```typescript
const scaledownRequest = {
  context: context,
  prompt: code,
  scaledown: {
    rate: "auto", // Options: "auto", "0.5", "0.3"
  },
  model: "gpt-4o", // Target model for optimization
};
```

### Request Timeouts

```typescript
const TIMEOUTS = {
  scaledown: 30000, // 30 seconds
  gemini: 60000, // 60 seconds
  total: 90000, // 90 seconds
};
```

## UI Configuration

### Theme Colors

Edit `src/app/globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    /* Customize other colors */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    /* Customize dark mode colors */
  }
}
```

### Component Styling

Edit `components.json` for shadcn/ui:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## Deployment Configuration

### Vercel

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "GEMINI_API_KEY": "@gemini-api-key",
    "SCALEDOWN_API_KEY": "@scaledown-api-key"
  }
}
```

### Netlify

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Performance Tuning

### Image Optimization

```typescript
// next.config.ts
const nextConfig = {
  images: {
    domains: ["your-cdn.com"],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
};
```

For deployment-specific configuration, see the [Getting Started](./getting-started.md) guide.
