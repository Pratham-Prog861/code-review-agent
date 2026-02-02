# Getting Started

This guide will help you set up and run the Code Review Agent on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Git** for version control
- A **Google Gemini API key** ([Get one here](https://ai.google.dev/))
- A **ScaleDown API key** (optional but recommended) ([Get one here](https://scaledown.ai/getapikey))

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/code-review-agent.git
cd code-review-agent
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your API keys to `.env.local`:

```env
# Required: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional but recommended: ScaleDown API Key for token compression
SCALEDOWN_API_KEY=your_scaledown_api_key_here
```

### 4. Run the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔑 Getting API Keys

### Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the API key and add it to your `.env.local` file

### ScaleDown API Key

1. Visit [ScaleDown](https://scaledown.xyz/)
2. Sign up for an account
3. Navigate to the API section
4. Generate a new API key
5. Copy the key and add it to your `.env.local` file

> **Note**: The application will work without the ScaleDown API key, but compression features will be disabled.

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
npm run start
```

This will:

1. Build the application for production
2. Optimize all assets
3. Start the production server on port 3000

## ✅ Verify Installation

After starting the development server, you should see:

1. ✅ The landing page at `http://localhost:3000`
2. ✅ Code editor with syntax highlighting
3. ✅ Settings panel with language and depth options
4. ✅ Working "Review Code" button

### Test the Application

1. Paste some sample code into the editor
2. Select a language (e.g., JavaScript)
3. Choose a review depth (e.g., Standard Review)
4. Click "Review Code"
5. You should see a comprehensive code review with:
   - Quality score
   - List of issues with severity levels
   - Suggestions for improvement
   - Token usage statistics

## 📚 Next Steps

- Read the [User Guide](./user-guide.md) to learn how to use the application
- Check out the [Features](./features.md) documentation for detailed feature information
- Explore the [API Reference](./api-reference.md) for API usage
- Review [Configuration](./configuration.md) for advanced settings

---

**Happy Coding!** 🎉
