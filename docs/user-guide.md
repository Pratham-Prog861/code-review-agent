# User Guide

Complete guide to using the Code Review Agent effectively.

## 📖 Table of Contents

- [Getting Started](#getting-started)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
- [Understanding Results](#understanding-results)
- [Best Practices](#best-practices)
- [Tips & Tricks](#tips--tricks)
- [FAQs](#faqs)

## Getting Started

### Accessing the Application

1. Open your browser and navigate to the application URL
2. You'll see the landing page with an overview of features
3. Scroll down to the code review section or click "Get Started"

### First Code Review

Let's walk through your first code review:

#### Step 1: Paste Your Code

Click into the code editor and paste your code:

```javascript
function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}
```

#### Step 2: Select Language

Choose the appropriate language from the dropdown:

- JavaScript
- TypeScript
- Python
- Java
- C++
- Go
- Rust

**For this example**: Select "JavaScript"

#### Step 3: Choose Review Depth

Select how thorough you want the analysis:

- **Quick Scan**: Fast, focuses on critical issues (5-10 seconds)
- **Standard Review**: Balanced analysis (10-20 seconds) ⭐ **Recommended**
- **Deep Analysis**: Comprehensive review (20-40 seconds)

**For this example**: Select "Standard Review"

#### Step 4: Enable Compression (Optional)

Toggle the "ScaleDown Compression" switch:

- **ON**: Saves tokens and reduces costs (recommended)
- **OFF**: Uses full context without compression

**For this example**: Leave it ON

#### Step 5: Review Code

Click the **"Review Code"** button and wait for the analysis.

#### Step 6: View Results

You'll receive:

- ✅ Quality score (0-100)
- 📋 List of issues with severity levels
- 💡 Suggestions for improvement
- 📊 Token usage statistics

## Basic Usage

### Understanding the Interface

#### Code Editor Section

```bash
┌─────────────────────────────────────┐
│ ● ● ●  editor.tsx        1250 chars│
├─────────────────────────────────────┤
│                                     │
│  // Your code goes here             │
│  function example() {               │
│    return "Hello World";            │
│  }                                  │
│                                     │
└─────────────────────────────────────┘
```

**Features**:

- Mac-style window controls (decorative)
- Character counter (top right)
- Syntax awareness
- Auto-resize to content

#### Settings Panel

```bash
┌─────────────────────────┐
│ Language                │
│ [JavaScript ▼]          │
│                         │
│ Review Depth            │
│ [Standard Review ▼]     │
│                         │
│ ScaleDown Compression   │
│ [●──────────] ON        │
└─────────────────────────┘
```

#### Results Panel

After analysis, you'll see:

```bash
┌─────────────────────────────────────┐
│ Quality Score: 82/100               │
│ ████████████████████░░░░            │
├─────────────────────────────────────┤
│ Issues Found (3)                    │
│                                     │
│ ⚠️ Line 3: Unused variable 'result'│
│ 💡 Line 7: Use Array.map() instead │
│ ℹ️ General: Add error handling     │
├─────────────────────────────────────┤
│ Summary:                            │
│ Good code with minor improvements...│
├─────────────────────────────────────┤
│ Token Statistics                    │
│ Original: 1,250 | Compressed: 425   │
│ Savings: 66% | Cost: $0.008         │
└─────────────────────────────────────┘
```

## Advanced Features

### Language-Specific Reviews

Each language has specialized analysis:

#### JavaScript Example

```javascript
// Paste this code
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

**Expected Issues**:

- Missing error handling
- No response validation
- Potential XSS from unvalidated ID

#### Python Example

```python
# Paste this code
def calculate_average(numbers):
    sum = 0
    for num in numbers:
        sum += num
    return sum / len(numbers)
```

**Expected Issues**:

- Division by zero risk
- Could use built-in `sum()`
- Type hints missing

#### TypeScript Example

```typescript
// Paste this code
function getUser(id: any) {
  return users.find((u) => u.id === id);
}
```

**Expected Issues**:

- Using `any` type
- No null/undefined handling
- Return type not specified

### Review Depth Comparison

#### Quick Scan Output

```bash
✓ Quality Score: 75/100
⚠️ Critical syntax error on line 5
🔴 Undefined variable 'result'
```

Quick, focused feedback on critical issues only.

#### Standard Review Output

```bash
✓ Quality Score: 75/100
⚠️ Line 5: Syntax error - missing semicolon
🔴 Line 8: Undefined variable 'result'
💡 Line 12: Consider using const instead of var
ℹ️ Line 15: Add JSDoc comments
📊 General: Code structure is good
```

Balanced analysis with suggestions.

#### Deep Analysis Output

```bash
✓ Quality Score: 75/100

Critical Issues (1):
🔴 Line 8: Undefined variable 'result' will cause runtime error
   Suggestion: Declare variable or check for typo

Warnings (2):
⚠️ Line 5: Missing semicolon (automatic insertion can be unreliable)
⚠️ Line 12: var is function-scoped, prefer const or let

Suggestions (5):
💡 Line 15: Add JSDoc for better documentation
💡 Line 20: Extract magic number to named constant
💡 Line 25: Function is too long, consider splitting
💡 Line 30: Add error handling with try-catch
💡 General: Consider using TypeScript

Security Analysis:
✓ No XSS vulnerabilities detected
✓ No SQL injection risks
⚠️ Potential prototype pollution on line 18

Performance:
⚠️ Nested loops on lines 22-25 (O(n²) complexity)
💡 Consider using Map for lookups

Architecture:
ℹ️ Function has 4 responsibilities, violates SRP
💡 Extract validation logic to separate function
```

Comprehensive, detailed analysis.

### Compression Usage

#### When to Enable Compression

✅ **Enable when**:

- Code is long (>500 lines)
- Using standard or deep analysis
- Want to reduce costs
- API key is configured

❌ **Disable when**:

- Code is very short (<50 lines)
- Using quick scan
- Testing without API key
- Need fastest possible response

#### Compression Statistics

After review with compression enabled:

```bash
Token Statistics:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Original Tokens:     1,500 tokens
Compressed Tokens:     450 tokens
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Savings:                70%
Cost Reduction:      $0.0105
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Compression Time:     250ms
Analysis Time:      2,150ms
Total Time:         2,400ms
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Understanding Results

### Quality Score Interpretation

| Score  | Badge        | Meaning          | Action                  |
| ------ | ------------ | ---------------- | ----------------------- |
| 90-100 | 🌟 Excellent | Production ready | Deploy with confidence  |
| 75-89  | ✅ Good      | Minor tweaks     | Address suggestions     |
| 60-74  | ⚠️ Fair      | Needs work       | Fix warnings            |
| 40-59  | ❌ Poor      | Major issues     | Significant refactoring |
| 0-39   | 🚨 Critical  | Not usable       | Complete rewrite        |

### Issue Severity Levels

#### 🔴 Critical

**Immediate action required** - These issues will cause bugs or security vulnerabilities.

**Examples**:

- Undefined variables
- Syntax errors
- Security vulnerabilities
- Memory leaks
- Logic errors

**What to do**: Fix immediately before deploying.

#### ⚠️ Warning

**Should be addressed** - These issues indicate poor practices or potential problems.

**Examples**:

- Deprecated API usage
- Performance bottlenecks
- Type inconsistencies
- Missing error handling

**What to do**: Address before next release.

#### ℹ️ Info

**Good to know** - Informational messages about code quality.

**Examples**:

- Missing documentation
- Style inconsistencies
- Unused imports
- Code complexity

**What to do**: Consider improving.

#### 💡 Suggestion

**Optional improvements** - Ideas for better code.

**Examples**:

- Modern syntax alternatives
- Refactoring opportunities
- Best practice recommendations
- Optimization tips

**What to do**: Implement when convenient.

### Reading the Summary

The summary provides a concise overview:

```bash
Summary: "Good code overall with modern ES6 syntax.
Consider adding error handling for network requests
and using TypeScript for better type safety. Performance
is acceptable but could be improved with memoization."
```

**Key Points**:

1. Overall assessment (Good/Fair/Poor)
2. Main strengths
3. Top 2-3 improvement areas
4. Specific recommendations

## Best Practices

### Writing Reviewable Code

#### ✅ Do's

```javascript
// ✅ Good: Clear, concise, focused
function calculateTax(amount, rate) {
  return amount * rate;
}
```

```javascript
// ✅ Good: Proper error handling
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
```

#### ❌ Don'ts

```javascript
// ❌ Bad: Too complex for single review
// Paste entire 5000-line file

// ❌ Bad: Incomplete code
function doSomething() {
  // ... rest of function

// ❌ Bad: No context
x = y + z; // What are these variables?
```

### Optimizing Review Quality

1. **Provide Complete Functions**: Include full function definitions
2. **Add Context Comments**: Explain complex logic
3. **Choose Right Depth**: Match depth to code importance
4. **Review in Chunks**: Break large files into logical sections
5. **Iterate**: Apply fixes and review again

### Cost Optimization

#### Save Money with Compression

```bash
Without Compression:
- 1,000 reviews/month
- Avg 2,000 tokens/review
- Total: 2M tokens
- Cost: ~$20

With Compression (70% savings):
- 1,000 reviews/month
- Avg 600 tokens/review
- Total: 600K tokens
- Cost: ~$6

Monthly Savings: $14 💰
```

#### Choose Appropriate Depth

- **Quick** for quick checks (cheapest)
- **Standard** for regular work (balanced)
- **Thorough** for production code (most expensive)

## Tips & Tricks

### Keyboard Shortcuts

- `Ctrl/Cmd + A`: Select all code
- `Ctrl/Cmd + C`: Copy code
- `Ctrl/Cmd + V`: Paste code
- `Tab`: Indent (in editor)

### Quick Actions

1. **Rapid Testing**: Use Quick Scan for fast iteration
2. **Paste from IDE**: Copy directly from VS Code, IntelliJ, etc.
3. **Compare Languages**: Review same code in multiple languages
4. **Learn Patterns**: Study suggestions to improve coding skills

### Common Workflows

#### Pre-Commit Review

```bash
1. Write code in IDE
2. Copy to Code Review Agent
3. Quick Scan (fast feedback)
4. Fix critical issues
5. Commit to Git
```

#### Pre-Production Review

```bash
1. Export production function
2. Paste into Code Review Agent
3. Deep Analysis (thorough check)
4. Address all warnings
5. Deploy with confidence
```

#### Learning Mode

```bash
1. Write intentionally buggy code
2. Standard Review
3. Study issues and suggestions
4. Apply fixes
5. Review again (should improve score)
```

## FAQs

### General Questions

**Q: Is my code stored on your servers?**
A: No, code is analyzed in real-time and never stored.

**Q: How accurate are the reviews?**
A: Very accurate for common issues. AI may occasionally miss context-specific problems.

**Q: Can I use this for production code?**
A: Yes, but use as a supplement to human review, not a replacement.

**Q: What's the maximum code length?**
A: Generally 50,000 characters. Larger files should be split.

### Technical Questions

**Q: Why is compression sometimes disabled?**
A: ScaleDown API key may not be configured or service is unavailable.

**Q: How long does analysis take?**
A: Quick: 5-10s, Standard: 10-20s, Thorough: 20-40s

**Q: Can I review multiple files?**
A: Currently one file at a time. Multi-file support coming soon.

**Q: What AI model is used?**
A: Google Gemini 2.5 Flash for analysis.

### Troubleshooting

**Q: Review failed with error 500**
A: API key may be invalid or service temporarily down. Try again.

**Q: No compression statistics shown**
A: Compression is disabled. Check if ScaleDown API key is configured.

**Q: Results are taking too long**
A: Large code with deep analysis can take 30-60s. Consider splitting or using quick scan.

**Q: Quality score seems wrong**
A: AI is probabilistic. Run review again or try different depth for varied perspective.

## Next Steps

- 📖 Read [Features Documentation](./features.md) for detailed capabilities
- 🔧 Check [Configuration Guide](./configuration.md) for advanced settings
- 🏗️ Explore [Architecture](./architecture.md) to understand how it works
- 🐛 Visit [Troubleshooting](./troubleshooting.md) for common issues

---
