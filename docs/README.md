# Code Review Agent Documentation

Welcome to the Code Review Agent documentation. This guide will help you understand, set up, and use the application effectively.

## 📚 Documentation Structure

- [Getting Started](./getting-started.md) - Installation and setup
- [Features](./features.md) - Comprehensive feature overview
- [Architecture](./architecture.md) - Technical architecture and design
- [API Reference](./api-reference.md) - API endpoints and usage
- [Configuration](./configuration.md) - Environment variables and settings
- [User Guide](./user-guide.md) - How to use the application
- [Contributing](./contributing.md) - Guidelines for contributors
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions

## 🎯 Quick Links

- [GitHub Repository](https://github.com/pratham-prog861/code-review-agent)

## 🚀 Overview

Code Review Agent is an AI-powered code analysis platform that provides instant, intelligent code reviews with advanced token compression technology. Built with Next.js 16, React 19, and powered by Google's Gemini AI and ScaleDown compression technology.

### Key Features

- 🤖 **AI-Powered Analysis** - Advanced code review using Gemini 2.5 Flash
- ⚡ **Smart Compression** - Up to 70% token reduction with ScaleDown
- 🔒 **Security First** - Comprehensive security vulnerability detection
- 📊 **Quality Scoring** - Automated code quality assessment (0-100)
- 🎨 **Multi-Language Support** - JavaScript, TypeScript, Python, Java, C++, Go, Rust
- 📈 **Real-time Feedback** - Instant analysis as you code
- 💰 **Cost Savings** - Reduced API costs through intelligent compression

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **AI**: Google Gemini 2.5 Flash
- **Compression**: ScaleDown API
- **Icons**: Lucide React
- **UI Components**: Radix UI

## 📦 Project Structure

```bash
code-review-agent/
├── docs/                    # Documentation files
├── public/                  # Static assets
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── api/           # API routes
│   │   │   └── review/    # Code review endpoint
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Main page
│   ├── components/        # React components
│   │   ├── code-review/  # Code review features
│   │   ├── landing/      # Landing page sections
│   │   ├── layout/       # Layout components
│   │   └── ui/           # shadcn/ui components
│   └── lib/              # Utilities and types
│       ├── constants.ts  # App constants
│       ├── types.ts      # TypeScript types
│       └── utils.ts      # Helper functions
├── components.json        # shadcn/ui config
├── next.config.ts        # Next.js config
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
└── tailwind.config.ts    # Tailwind config
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Gemini API](https://ai.google.dev/gemini-api/docs/quickstart)
- [ScaleDown Documentation](https://docs.scaledown.ai/quickstart#typescript)
