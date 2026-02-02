# API Reference

Complete API documentation for the Code Review Agent.

## Base URL

```bash
Development: http://localhost:3000
Production: https://your-domain.com
```

## Authentication

Currently, the API does not require authentication for public access. API keys are managed server-side via environment variables.

> **Note**: For production deployments, consider implementing API key authentication or rate limiting.

## Endpoints

### POST /api/review

Analyze code and return a comprehensive review.

#### Request

**Headers**

```http
Content-Type: application/json
```

**Body**

```typescript
{
  "code": string,              // Code to analyze (required)
  "language": string,          // Programming language (required)
  "depth": string,             // Review depth (required)
  "useCompression": boolean    // Enable ScaleDown compression (required)
}
```

**Parameters**

| Field            | Type    | Required | Description               | Valid Values                                                                    |
| ---------------- | ------- | -------- | ------------------------- | ------------------------------------------------------------------------------- |
| `code`           | string  | Yes      | The source code to review | Any valid code string                                                           |
| `language`       | string  | Yes      | Programming language      | `"javascript"`, `"typescript"`, `"python"`, `"java"`, `"cpp"`, `"go"`, `"rust"` |
| `depth`          | string  | Yes      | Analysis depth            | `"quick"`, `"standard"`, `"thorough"`                                           |
| `useCompression` | boolean | Yes      | Enable token compression  | `true`, `false`                                                                 |

**Example Request**

```bash
curl -X POST http://localhost:3000/api/review \
  -H "Content-Type: application/json" \
  -d '{
    "code": "function add(a, b) { return a + b; }",
    "language": "javascript",
    "depth": "standard",
    "useCompression": true
  }'
```

#### Response

**Success Response (200 OK)**

```typescript
{
  "issues": ReviewIssue[],      // Array of detected issues
  "qualityScore": number,       // Score from 0-100
  "summary": string,            // Executive summary
  "refactoredCode": string,     // Improved code (optional)
  "stats": TokenStats           // Token usage statistics
}
```

**ReviewIssue Object**

```typescript
{
  "line": number | null,        // Line number (null if general)
  "message": string,            // Issue description
  "severity": string,           // "critical" | "warning" | "info" | "suggestion"
  "suggestion": string          // Recommended fix (optional)
}
```

**TokenStats Object**

```typescript
{
  "originalTokens": number,     // Tokens before compression
  "compressedTokens": number,   // Tokens after compression
  "savingsPercentage": number,  // Percentage saved
  "costSavings": number         // Estimated cost saved in USD
}
```

**Example Success Response**

```json
{
  "issues": [
    {
      "line": 3,
      "message": "Variable 'result' is declared but never used",
      "severity": "warning",
      "suggestion": "Remove unused variable or use it in your code"
    },
    {
      "line": 7,
      "message": "Function could be more efficient using Array.map()",
      "severity": "suggestion",
      "suggestion": "Consider: const results = items.map(item => item.value)"
    }
  ],
  "qualityScore": 82,
  "summary": "Good code overall with minor improvements possible. Consider removing unused variables and optimizing array operations for better performance.",
  "stats": {
    "originalTokens": 1250,
    "compressedTokens": 425,
    "savingsPercentage": 66,
    "costSavings": 0.00825
  }
}
```

**Error Responses**

**400 Bad Request**

```json
{
  "error": "Code is required"
}
```

**500 Internal Server Error**

```json
{
  "error": "GEMINI_API_KEY is not configured"
}
```

**503 Service Unavailable**

```json
{
  "error": "AI service temporarily unavailable"
}
```

## Language Configurations

### Supported Languages

Each language has specialized analysis focus areas:

#### JavaScript

```typescript
{
  "language": "javascript",
  "focus": [
    "ES6+ best practices",
    "Async/await usage",
    "Memory leaks",
    "Code readability",
    "XSS vulnerabilities"
  ]
}
```

#### TypeScript

```typescript
{
  "language": "typescript",
  "focus": [
    "Type safety",
    "Interface vs Type usage",
    "Generics",
    "Null handling",
    "React/Next.js patterns"
  ]
}
```

#### Python

```typescript
{
  "language": "python",
  "focus": [
    "PEP 8 compliance",
    "List comprehensions",
    "Exception handling",
    "Type hinting",
    "Security"
  ]
}
```

#### Java

```typescript
{
  "language": "java",
  "focus": [
    "OOP principles",
    "Stream API",
    "Memory management",
    "Concurrency",
    "Spring Boot patterns"
  ]
}
```

#### C++

```typescript
{
  "language": "cpp",
  "focus": [
    "Memory management (RAII)",
    "Smart pointers",
    "STL usage",
    "Move semantics",
    "Const correctness"
  ]
}
```

#### Go

```typescript
{
  "language": "go",
  "focus": [
    "Goroutines and Channels",
    "Error handling",
    "Interfaces",
    "Slice/Map usage",
    "Go idioms"
  ]
}
```

#### Rust

```typescript
{
  "language": "rust",
  "focus": [
    "Ownership and Borrowing",
    "Lifetime annotations",
    "Result/Option handling",
    "Unsafe code",
    "Idiomatic Rust"
  ]
}
```

## Review Depth Modes

### Quick Scan

```typescript
{
  "depth": "quick",
  "description": "Focus on critical bugs and major syntax errors only",
  "avgTime": "5-10 seconds",
  "bestFor": "Rapid feedback, pre-commit checks"
}
```

### Standard Review (Recommended)

```typescript
{
  "depth": "standard",
  "description": "Balanced review covering bugs, style, best practices, and performance",
  "avgTime": "10-20 seconds",
  "bestFor": "Regular development workflow"
}
```

### Thorough Analysis

```typescript
{
  "depth": "thorough",
  "description": "Deep dive into architecture, security, performance, and edge cases",
  "avgTime": "20-40 seconds",
  "bestFor": "Production code, security audits"
}
```

## Rate Limits

> **Important**: Implement rate limiting in production to prevent abuse and control costs.

**Recommended Limits**:

- Anonymous users: 10 requests per hour
- Authenticated users: 100 requests per hour
- Enterprise: Unlimited

**Rate Limit Headers** (to be implemented):

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Error Codes

| HTTP Code | Error Type            | Description                       | Solution              |
| --------- | --------------------- | --------------------------------- | --------------------- |
| 400       | Bad Request           | Invalid input parameters          | Check request format  |
| 401       | Unauthorized          | Missing API key (if auth enabled) | Provide valid API key |
| 429       | Too Many Requests     | Rate limit exceeded               | Wait and retry        |
| 500       | Internal Server Error | Server-side error                 | Contact support       |
| 503       | Service Unavailable   | External service down             | Retry later           |

## Code Examples

### JavaScript/TypeScript

```typescript
// Using fetch
async function reviewCode(code: string, language: string) {
  const response = await fetch("/api/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      language,
      depth: "standard",
      useCompression: true,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
}

// Usage
try {
  const result = await reviewCode(myCode, "javascript");
  console.log("Quality Score:", result.qualityScore);
  console.log("Issues:", result.issues);
} catch (error) {
  console.error("Review failed:", error.message);
}
```

### Python

```python
import requests
import json

def review_code(code: str, language: str) -> dict:
    """
    Submit code for review

    Args:
        code: Source code to analyze
        language: Programming language

    Returns:
        Review results dictionary
    """
    url = 'http://localhost:3000/api/review'

    payload = {
        'code': code,
        'language': language,
        'depth': 'standard',
        'useCompression': True
    }

    response = requests.post(url, json=payload)
    response.raise_for_status()

    return response.json()

# Usage
try:
    result = review_code(my_code, 'python')
    print(f"Quality Score: {result['qualityScore']}")
    print(f"Issues Found: {len(result['issues'])}")
except requests.exceptions.RequestException as e:
    print(f"Review failed: {e}")
```

### cURL

```bash
# Basic review
curl -X POST http://localhost:3000/api/review \
  -H "Content-Type: application/json" \
  -d '{
    "code": "def greet(name):\n    print(f\"Hello {name}\")",
    "language": "python",
    "depth": "standard",
    "useCompression": true
  }'

# Quick scan without compression
curl -X POST http://localhost:3000/api/review \
  -H "Content-Type: application/json" \
  -d '{
    "code": "const x = 5;",
    "language": "javascript",
    "depth": "quick",
    "useCompression": false
  }'

# Thorough analysis
curl -X POST http://localhost:3000/api/review \
  -H "Content-Type: application/json" \
  -d @code.json
```

## Best Practices

### 1. Request Optimization

```typescript
// ✅ Good: Reasonable code size
const code = "function add(a, b) { return a + b; }";

// ❌ Bad: Extremely large files
const code = fs.readFileSync("massive-file.js", "utf8"); // 10MB+
```

### 2. Error Handling

```typescript
try {
  const result = await fetch("/api/review", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    const error = await result.json();
    // Handle specific error cases
    switch (result.status) {
      case 400:
        console.error("Invalid request:", error.error);
        break;
      case 429:
        console.error("Rate limit exceeded");
        break;
      default:
        console.error("Unexpected error:", error);
    }
  }
} catch (error) {
  // Handle network errors
  console.error("Network error:", error);
}
```

### 3. Compression Usage

```typescript
// Enable compression for large code
const useCompression = code.length > 1000;

// Disable for quick scans
const useCompression = depth !== "quick";
```

### 4. Timeout Handling

```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 60000); // 60s

try {
  const response = await fetch("/api/review", {
    signal: controller.signal,
    method: "POST",
    body: JSON.stringify(payload),
  });
} catch (error) {
  if (error.name === "AbortError") {
    console.error("Request timeout");
  }
} finally {
  clearTimeout(timeout);
}
```

## Webhooks (Coming Soon)

Future webhook support for async processing:

```typescript
POST /api/review/webhook
{
  "code": "...",
  "language": "javascript",
  "depth": "thorough",
  "useCompression": true,
  "callbackUrl": "https://yoursite.com/webhook"
}

// Response
{
  "reviewId": "rev_123abc",
  "status": "processing",
  "estimatedTime": 30
}

// Later, webhook callback
POST https://yoursite.com/webhook
{
  "reviewId": "rev_123abc",
  "status": "completed",
  "result": { /* full review result */ }
}
```

## SDK Support (Planned)

Future official SDKs:

- **JavaScript/TypeScript**: `@code-review-agent/sdk`
- **Python**: `code-review-agent`
- **Go**: `github.com/yourorg/code-review-agent-go`
- **Ruby**: `code-review-agent`

## OpenAPI Specification

```yaml
openapi: 3.0.0
info:
  title: Code Review Agent API
  version: 1.0.0
  description: AI-powered code analysis API

paths:
  /api/review:
    post:
      summary: Review code
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                code:
                  type: string
                language:
                  type: string
                  enum: [javascript, typescript, python, java, cpp, go, rust]
                depth:
                  type: string
                  enum: [quick, standard, thorough]
                useCompression:
                  type: boolean
      responses:
        "200":
          description: Successful review
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ReviewResponse"
```

---

For more information, see the [User Guide](./user-guide.md) or [Architecture](./architecture.md).
