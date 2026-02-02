# Architecture

This document provides a comprehensive overview of the Code Review Agent's technical architecture, design decisions, and system components.

## 🏗️ System Overview

Code Review Agent is built as a modern, serverless web application using Next.js 16 with the App Router architecture.

```bash
┌─────────────────────────────────────────────────────────────┐
│                         Client (Browser)                     │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Landing   │  │ Code Editor  │  │Review Panel  │      │
│  │    Page     │  │  Component   │  │  Component   │      │
│  └─────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App (Server)                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              API Route: /api/review                  │   │
│  │  ┌──────────────────┐      ┌──────────────────┐    │   │
│  │  │   Input Parser   │─────▶│  ScaleDown API   │    │   │
│  │  └──────────────────┘      └──────────────────┘    │   │
│  │           │                          │               │   │
│  │           │    ┌────────────────────┘               │   │
│  │           ▼    ▼                                     │   │
│  │  ┌──────────────────────────┐                       │   │
│  │  │    Gemini AI Service     │                       │   │
│  │  └──────────────────────────┘                       │   │
│  │           │                                          │   │
│  │           ▼                                          │   │
│  │  ┌──────────────────────────┐                       │   │
│  │  │   Response Formatter     │                       │   │
│  │  └──────────────────────────┘                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌────────────────┐            ┌────────────────┐          │
│  │  ScaleDown API │            │   Gemini API    │          │
│  │(Token Compress)│            │ (AI Analysis)   │          │
│  └────────────────┘            └────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Design Principles

### 1. Serverless-First

- No persistent server state
- Stateless API routes
- Edge-ready deployment
- Automatic scaling

### 2. API-First

- RESTful design
- JSON communication
- Clear contracts
- Versioned endpoints

### 3. Type Safety

- TypeScript throughout
- Strict type checking
- Interface definitions
- Runtime validation

### 4. Component-Based

- Modular UI components
- Reusable patterns
- Separation of concerns
- Single responsibility

### 5. Performance-Optimized

- Code splitting
- Lazy loading
- Compression
- Caching strategies

## 📁 Directory Structure

```bash
src/
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   │   └── review/         # Code review endpoint
│   │       └── route.ts    # POST handler
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
│
├── components/              # React Components
│   ├── code-review/        # Feature components
│   │   ├── code-editor.tsx     # Code input
│   │   ├── review-panel.tsx    # Results display
│   │   ├── settings-panel.tsx  # Configuration
│   │   └── stats-card.tsx      # Statistics
│   ├── landing/            # Marketing components
│   │   ├── features.tsx        # Feature showcase
│   │   ├── how-it-works.tsx    # Process explanation
│   │   ├── stats-section.tsx   # Metrics
│   │   └── cta-section.tsx     # Call-to-action
│   ├── layout/             # Layout components
│   │   └── footer.tsx          # Site footer
│   └── ui/                 # shadcn/ui components
│       ├── button.tsx          # Radix UI wrapped
│       ├── card.tsx            # Container component
│       └── ...                 # Other UI primitives
│
└── lib/                    # Utilities & Config
    ├── constants.ts        # App constants
    ├── types.ts            # TypeScript types
    └── utils.ts            # Helper functions
```

## 🔌 Core Components

### Frontend Layer

#### 1. Main Page (`page.tsx`)

- **Purpose**: Primary application interface
- **State Management**: React useState hooks
- **Key Responsibilities**:
  - Code input management
  - Settings configuration
  - API communication
  - Result display
  - Error handling

#### 2. Code Editor Component

```typescript
interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  disabled: boolean;
}
```

- **Features**: Syntax awareness, character counting, mac-style window chrome
- **Styling**: Monaco-inspired design with Tailwind

#### 3. Settings Panel Component

```typescript
interface SettingsPanelProps {
  language: string;
  setLanguage: (val: string) => void;
  depth: "quick" | "standard" | "thorough";
  setDepth: (val: "quick" | "standard" | "thorough") => void;
  useCompression: boolean;
  setUseCompression: (val: boolean) => void;
  disabled?: boolean;
}
```

- **Controls**: Language picker, depth selector, compression toggle

#### 4. Review Panel Component

```typescript
interface ReviewPanelProps {
  result: CodeReviewResponse;
}
```

- **Displays**: Issues, quality score, summary, token stats

### Backend Layer

#### API Route: `/api/review`

**Endpoint**: `POST /api/review`

**Request Flow**:

```typescript
1. Receive CodeReviewRequest
   ├─ code: string
   ├─ language: string
   ├─ depth: "quick" | "standard" | "thorough"
   └─ useCompression: boolean

2. Build Context Prompt
   ├─ Language-specific instructions
   ├─ Depth-specific guidelines
   └─ Output format specification

3. Optional: ScaleDown Compression
   ├─ Send context + code to ScaleDown API
   ├─ Receive compressed prompt
   └─ Calculate token savings

4. AI Analysis
   ├─ Send prompt to Gemini API
   ├─ Parse JSON response
   └─ Extract structured data

5. Return CodeReviewResponse
   ├─ issues: ReviewIssue[]
   ├─ qualityScore: number
   ├─ summary: string
   └─ stats: TokenStats
```

## 🧩 Data Models

### Core Types

```typescript
// Issue representation
interface ReviewIssue {
  line?: number; // Code line number
  message: string; // Issue description
  severity: IssueSeverity; // critical | warning | info | suggestion
  suggestion?: string; // Fix recommendation
}

// Request payload
interface CodeReviewRequest {
  code: string; // Code to review
  language: string; // Programming language
  depth: ReviewDepth; // Analysis depth
  useCompression: boolean; // Enable ScaleDown
}

// Response payload
interface CodeReviewResponse {
  issues: ReviewIssue[]; // Detected issues
  qualityScore: number; // 0-100 score
  summary: string; // Executive summary
  refactoredCode?: string; // Improved code (future)
  stats: TokenStats; // Token usage
}

// Token statistics
interface TokenStats {
  originalTokens: number; // Before compression
  compressedTokens: number; // After compression
  savingsPercentage: number; // Reduction %
  costSavings: number; // Estimated $ saved
}
```

## 🔄 Request Lifecycle

### 1. Client-Side Request

```typescript
// User clicks "Review Code"
const handleReview = async () => {
  // Validate input
  if (!code.trim()) {
    toast.error("Please enter some code to review.");
    return;
  }

  // Set loading state
  setIsAnalyzing(true);
  setResult(null);

  try {
    // Make API call
    const response = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        language,
        depth,
        useCompression,
      }),
    });

    const data = await response.json();

    // Handle response
    if (!response.ok) {
      throw new Error(data.error || "Failed to analyze code");
    }

    setResult(data);
    toast.success("Code review completed!");
  } catch (error) {
    toast.error(error.message);
  } finally {
    setIsAnalyzing(false);
  }
};
```

### 2. Server-Side Processing

```typescript
export async function POST(req: NextRequest) {
  // 1. Parse request
  const { code, language, depth, useCompression } = await req.json();

  // 2. Build context
  const context = buildReviewContext(language, depth);

  // 3. Optional compression
  let compressedContext = context;
  let tokenStats = { original: 0, compressed: 0 };

  if (useCompression && SCALEDOWN_API_KEY) {
    const result = await compressContext(context);
    compressedContext = result.compressed;
    tokenStats = result.stats;
  }

  // 4. AI analysis
  const aiResponse = await analyzeCode(compressedContext, code);

  // 5. Format response
  return NextResponse.json({
    issues: aiResponse.issues,
    qualityScore: aiResponse.score,
    summary: aiResponse.summary,
    stats: tokenStats,
  });
}
```

## 🔐 Security Architecture

### Environment Variables

```bash
GEMINI_API_KEY=<secret>      # Server-side only
SCALEDOWN_API_KEY=<secret>   # Server-side only
```

### Security Measures

1. **API Key Protection**
   - Never exposed to client
   - Stored in `.env.local`
   - Accessed via `process.env`

2. **Input Validation**
   - Code length limits
   - Language validation
   - Sanitized inputs

3. **Rate Limiting** (Recommended)
   - Implement via middleware
   - Prevent abuse
   - Protect API costs

4. **CORS Configuration**
   - Restrict origins
   - Validate headers
   - Block unauthorized access

## 🚀 Performance Optimizations

### 1. Code Splitting

```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

### 2. Compression

- ScaleDown reduces API payload by 70%
- Gzip compression on responses
- Minified production builds

### 3. Caching

- Static assets cached via CDN
- API responses use appropriate headers
- Browser caching for fonts/icons

### 4. Bundle Optimization

```typescript
// next.config.ts
export default {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
  },
};
```

## 🎨 Styling Architecture

### Tailwind Configuration

```typescript
// tailwind.config.ts
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // shadcn/ui color system
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        // ... other colors
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
```

### Design System

- **Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Fonts**: System fonts + Geist
- **Theme**: Light/Dark mode support

## 🧪 Testing Strategy

### Recommended Testing Layers

1. **Unit Tests**: Component logic
2. **Integration Tests**: API routes
3. **E2E Tests**: User workflows
4. **Visual Regression**: UI consistency

### Testing Tools (Future)

- Jest for unit tests
- React Testing Library for components
- Playwright for E2E
- Cypress for visual tests

## 📊 Monitoring & Observability

### Recommended Additions

1. **Error Tracking**: Sentry integration
2. **Analytics**: PostHog or Mixpanel
3. **Performance**: Vercel Analytics
4. **Logs**: Structured logging with Pino

## 🔮 Future Architecture Considerations

### Scalability

- Database integration for user accounts
- Redis for caching
- Queue system for batch processing
- Microservices for specialized analysis

### Features

- WebSocket for real-time updates
- GraphQL API option
- Multi-tenant architecture
- Plugin system for extensions

---

For implementation details, see the [API Reference](./api-reference.md) or [Contributing Guide](./contributing.md).
