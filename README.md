# 🤖 Code Review Agent

An AI-powered code analysis platform that provides instant, intelligent code reviews with advanced token compression technology. Built with Next.js 16, React 19, and powered by Google's Gemini AI and ScaleDown compression.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

- 🤖 **AI-Powered Analysis** - Advanced code review using Google Gemini 2.5 Flash
- ⚡ **Smart Compression** - Up to 70% token reduction with ScaleDown technology
- 🔒 **Security First** - Comprehensive security vulnerability detection
- 📊 **Quality Scoring** - Automated code quality assessment (0-100 scale)
- 🎨 **Multi-Language Support** - JavaScript, TypeScript, Python, Java, C++, Go, Rust
- 📈 **Real-time Feedback** - Instant analysis as you code
- 💰 **Cost Savings** - Reduced API costs through intelligent compression
- 🌓 **Dark Mode** - Beautiful UI with light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun
- Google Gemini API key ([Get one here](https://aistudio.google.com/api-keys))
- ScaleDown API key - optional but recommended ([Get one here](https://scaledown.ai/getapikey/))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/pratham-prog861/code-review-agent.git
cd code-review-agent
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
SCALEDOWN_API_KEY=your_scaledown_api_key_here
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

1. **Paste your code** into the editor
2. **Select the programming language** (JavaScript, TypeScript, Python, etc.)
3. **Choose review depth**:
   - **Quick Scan** - Fast, focuses on critical issues (5-10s)
   - **Standard Review** - Balanced analysis (10-20s) ⭐ Recommended
   - **Deep Analysis** - Comprehensive review (20-40s)
4. **Toggle compression** to save on API costs (recommended)
5. **Click "Review Code"** and get instant feedback!

### Example

```javascript
// Paste this code to try it out
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

You'll receive:

- ✅ Quality score (e.g., 75/100)
- 🔴 Critical issues (security, bugs)
- ⚠️ Warnings (best practices)
- 💡 Suggestions (improvements)
- 📊 Token usage statistics

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **AI**: [Google Gemini 2.5 Flash](https://ai.google.dev/)
- **Compression**: [ScaleDown API](https://docs.scaledown.ai/quickstart#typescript)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

- 📘 [Getting Started](docs/getting-started.md) - Detailed installation and setup
- ⚡ [Features](docs/features.md) - Complete feature overview
- 🏗️ [Architecture](docs/architecture.md) - Technical architecture and design
- 🔌 [API Reference](docs/api-reference.md) - API endpoints and usage
- ⚙️ [Configuration](docs/configuration.md) - Environment variables and settings
- 📖 [User Guide](docs/user-guide.md) - How to use the application
- 🤝 [Contributing](docs/contributing.md) - Guidelines for contributors
- 🔧 [Troubleshooting](docs/troubleshooting.md) - Common issues and solutions

## 🎯 Supported Languages

| Language       | Focus Areas                                                  |
| -------------- | ------------------------------------------------------------ |
| **JavaScript** | ES6+, async/await, memory leaks, XSS prevention              |
| **TypeScript** | Type safety, generics, null handling, React/Next.js patterns |
| **Python**     | PEP 8, type hints, exception handling, security              |
| **Java**       | OOP principles, Stream API, concurrency, Spring Boot         |
| **C++**        | Memory management, RAII, STL, move semantics                 |
| **Go**         | Goroutines, error handling, interfaces, idiomatic patterns   |
| **Rust**       | Ownership, borrowing, lifetimes, unsafe code                 |

## 📊 Review Depth Options

### Quick Scan ⚡

- **Speed**: 5-10 seconds
- **Focus**: Critical bugs and syntax errors only
- **Best For**: Rapid feedback, pre-commit checks

### Standard Review ⭐ (Recommended)

- **Speed**: 10-20 seconds
- **Focus**: Bugs, style, best practices, performance
- **Best For**: Regular development workflow

### Deep Analysis 🔍

- **Speed**: 20-40 seconds
- **Focus**: Architecture, security, performance, edge cases
- **Best For**: Production code, security audits

## 🔐 Security

- ✅ Your code is **never stored** on our servers
- ✅ All communication is encrypted via **HTTPS**
- ✅ API keys are stored securely in environment variables
- ✅ No third-party tracking or analytics
- ✅ Client-side processing for maximum privacy

## 💰 Cost Optimization

With ScaleDown compression enabled:

```bash
Without Compression:
  1,000 reviews/month × 2,000 tokens = 2M tokens
  Cost: ~$20/month

With Compression (70% savings):
  1,000 reviews/month × 600 tokens = 600K tokens
  Cost: ~$6/month

Monthly Savings: $14 💰
```

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/code-review-agent)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add GEMINI_API_KEY
vercel env add SCALEDOWN_API_KEY
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/contributing.md) for details.

### Quick Start for Contributors

```bash
# Fork and clone
git clone https://github.com/pratham-prog861/code-review-agent.git

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "feat: add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐ Show Your Support

If you find this project helpful, please consider giving it a star on GitHub!

---

<div align="center">

Made with ❤️ by Pratham Darji

</div>
