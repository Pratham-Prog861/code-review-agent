# Contributing

Thank you for your interest in contributing to Code Review Agent! This document provides guidelines and instructions for contributing.

## 🎯 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Testing Guidelines](#testing-guidelines)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. We expect all contributors to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment, trolling, or discriminatory comments
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm**, **yarn**, **pnpm**, or **bun**
- **Git** for version control
- A code editor (VS Code recommended)
- Basic knowledge of React, Next.js, and TypeScript

### Fork and Clone

1. **Fork the repository** on GitHub

2. **Clone your fork**:

```bash
git clone https://github.com/YOUR_USERNAME/code-review-agent.git
cd code-review-agent
```

3. **Add upstream remote**:

```bash
git remote add upstream https://github.com/original/code-review-agent.git
```

4. **Install dependencies**:

```bash
npm install
```

5. **Set up environment**:

```bash
cp .env.example .env.local
# Add your API keys to .env.local
```

6. **Start development server**:

```bash
npm run dev
```

## Development Workflow

### Branch Strategy

We use a simplified Git Flow:

```bash
main (production)
  ↓
develop (integration)
  ↓
feature/your-feature-name (your work)
```

### Creating a Feature Branch

```bash
# Make sure you're up to date
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feature/add-new-language-support
```

### Branch Naming Convention

- **Feature**: `feature/description-of-feature`
- **Bug Fix**: `fix/description-of-bug`
- **Documentation**: `docs/what-docs-updated`
- **Performance**: `perf/what-improved`
- **Refactor**: `refactor/what-refactored`
- **Test**: `test/what-tested`

Examples:

```bash
feature/add-ruby-support
fix/compression-not-working
docs/update-api-reference
perf/optimize-token-counting
refactor/simplify-review-logic
test/add-unit-tests-for-api
```

## Coding Standards

### TypeScript Guidelines

#### Use Strict Typing

```typescript
// ✅ Good
interface ReviewRequest {
  code: string;
  language: string;
  depth: "quick" | "standard" | "thorough";
}

function processReview(request: ReviewRequest): Promise<ReviewResponse> {
  // Implementation
}

// ❌ Bad
function processReview(request: any): any {
  // Implementation
}
```

#### Prefer Interfaces for Objects

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Also good for unions
type Status = "pending" | "complete" | "error";

// ❌ Bad (inconsistent)
type User = {
  id: string;
  name: string;
};
```

#### Use Const Assertions

```typescript
// ✅ Good
const SEVERITY_LEVELS = ["critical", "warning", "info", "suggestion"] as const;
type Severity = (typeof SEVERITY_LEVELS)[number];

// ❌ Bad
const SEVERITY_LEVELS = ["critical", "warning", "info", "suggestion"];
```

### React Best Practices

#### Component Structure

```typescript
// ✅ Good: Clear, typed, documented
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Primary button component
 * @param label - Button text
 * @param onClick - Click handler
 * @param disabled - Whether button is disabled
 */
export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn btn-primary"
    >
      {label}
    </button>
  );
}
```

#### Use Client Components Correctly

```typescript
// ✅ Good: Mark client components
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// ✅ Good: Server component (no "use client")
export async function ServerData() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

#### State Management

```typescript
// ✅ Good: Destructured, clear names
const [isLoading, setIsLoading] = useState(false);
const [userData, setUserData] = useState<User | null>(null);

// ❌ Bad: Generic names
const [data, setData] = useState();
const [flag, setFlag] = useState(false);
```

### CSS/Tailwind Guidelines

```typescript
// ✅ Good: Organized, readable
<div className="
  flex items-center gap-4
  p-6 rounded-lg
  bg-card shadow-lg
  hover:shadow-xl transition-shadow
">

// ❌ Bad: Unorganized long line
<div className="flex items-center gap-4 p-6 rounded-lg bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
```

### File Organization

#### Component Files

```bash
component-name/
├── index.ts              # Public exports
├── component-name.tsx    # Main component
├── component-name.test.tsx  # Tests (if applicable)
└── types.ts             # Component-specific types
```

#### Feature Files

```bash
feature-name/
├── index.ts              # Public API
├── feature-logic.ts      # Business logic
├── feature-ui.tsx        # UI components
├── types.ts             # Feature types
└── constants.ts         # Feature constants
```

### Naming Conventions

| Type                 | Convention       | Example                            |
| -------------------- | ---------------- | ---------------------------------- |
| **Components**       | PascalCase       | `CodeEditor`, `ReviewPanel`        |
| **Functions**        | camelCase        | `analyzeCode`, `formatResult`      |
| **Variables**        | camelCase        | `userData`, `isLoading`            |
| **Constants**        | UPPER_SNAKE_CASE | `MAX_CODE_LENGTH`, `API_URL`       |
| **Types/Interfaces** | PascalCase       | `ReviewRequest`, `UserData`        |
| **Files**            | kebab-case       | `code-editor.tsx`, `api-client.ts` |

## Commit Guidelines

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(editor): add syntax highlighting for Python"

# Bug fix
git commit -m "fix(api): handle timeout errors gracefully"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Breaking change
git commit -m "feat(api): change response format

BREAKING CHANGE: API now returns { data, meta } instead of flat object"
```

### Commit Best Practices

✅ **Do**:

- Write clear, descriptive messages
- Keep commits focused (one logical change)
- Reference issues when applicable: `fix: resolve #123`

❌ **Don't**:

- Write vague messages: "fix stuff", "update code"
- Combine unrelated changes
- Commit commented-out code or console.logs

## Pull Request Process

### Before Submitting

1. **Update from develop**:

```bash
git checkout develop
git pull upstream develop
git checkout your-branch
git rebase develop
```

2. **Run checks**:

```bash
# Lint
npm run lint

# Build
npm run build

# Test (if tests exist)
npm test
```

3. **Self-review**:
   - Read through your changes
   - Remove debug code
   - Update documentation if needed

### Creating Pull Request

1. **Push to your fork**:

```bash
git push origin feature/your-feature
```

2. **Open PR on GitHub**:
   - Use a clear title
   - Fill out the PR template
   - Link related issues

3. **PR Template**:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made

- Added X feature
- Fixed Y bug
- Updated Z documentation

## Testing

How was this tested?

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests (if applicable)
```

### Review Process

1. **Automated Checks**: CI/CD runs linting and builds
2. **Code Review**: Maintainer reviews code
3. **Feedback**: Address review comments
4. **Approval**: Once approved, maintainer will merge

### Addressing Feedback

```bash
# Make changes based on feedback
git add .
git commit -m "refactor: address PR feedback"
git push origin feature/your-feature
```

## Project Structure

### Key Directories

```bash
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
│
├── components/          # React components
│   ├── code-review/    # Feature components
│   ├── landing/        # Marketing components
│   ├── layout/         # Layout components
│   └── ui/            # shadcn/ui primitives
│
└── lib/                # Utilities
    ├── constants.ts    # App constants
    ├── types.ts       # TypeScript types
    └── utils.ts       # Helper functions
```

### Adding New Components

1. **Create component file**:

```typescript
// src/components/feature/new-component.tsx
"use client";

import { SomeUI } from "@/components/ui/some-ui";

interface NewComponentProps {
  title: string;
}

export function NewComponent({ title }: NewComponentProps) {
  return <div>{title}</div>;
}
```

2. **Export from index** (if needed):

```typescript
// src/components/feature/index.ts
export { NewComponent } from "./new-component";
```

3. **Use in parent**:

```typescript
import { NewComponent } from "@/components/feature/new-component";
```

### Adding New Language Support

1. **Update constants**:

```typescript
// src/lib/constants.ts
export const LANGUAGE_CONTEXTS: Record<string, string> = {
  // ... existing languages
  ruby: `
You are an expert Ruby Code Reviewer.
Focus on:
- Ruby idioms and conventions
- Rails best practices
- Security vulnerabilities
- Performance patterns
`,
};
```

2. **Test the language**:
   - Paste Ruby code
   - Select "Ruby" from dropdown
   - Verify analysis is appropriate

3. **Update documentation**:
   - Add to [features.md](./features.md)
   - Update language table

## Testing Guidelines

### Manual Testing Checklist

Before submitting PR, test:

- [ ] Code editor accepts input
- [ ] Language selection works
- [ ] Depth selection works
- [ ] Compression toggle works
- [ ] "Review Code" button works
- [ ] Results display correctly
- [ ] Error handling works
- [ ] Responsive design works (mobile/tablet/desktop)
- [ ] Dark mode works
- [ ] Loading states show correctly

### Testing Edge Cases

```typescript
// Test empty input
code: "";

// Test very long input
code: "x".repeat(100000);

// Test special characters
code: "const x = 'test\nline\ttab';";

// Test invalid language
language: "invalid";

// Test API failures (disconnect internet)
```

### Writing Tests (Future)

When test suite is added:

```typescript
// Example unit test
import { formatIssue } from "./utils";

describe("formatIssue", () => {
  it("should format critical issue correctly", () => {
    const issue = {
      line: 5,
      message: "Undefined variable",
      severity: "critical" as const,
    };

    const formatted = formatIssue(issue);
    expect(formatted).toContain("🔴");
    expect(formatted).toContain("Line 5");
  });
});
```

## Additional Resources

### Helpful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

### Style Guides

- [Airbnb React Style Guide](https://airbnb.io/javascript/react/)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Recognition

Contributors will be:

- Listed in README.md
- Mentioned in release notes
- Given credit in commit history

Thank you for contributing! 🎉

---

Questions? Open a [discussion](https://github.com/yourusername/code-review-agent/discussions) or reach out to maintainers.
