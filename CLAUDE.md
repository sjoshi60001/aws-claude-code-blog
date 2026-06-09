# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a blog about using Claude Code with AWS Bedrock. The blog teaches developers how to use Claude Code for AWS development, with posts about:

- **Bedrock Integration**: Connecting Claude Code to AWS Bedrock for production AI applications
- **MCP Servers**: Using Model Context Protocol servers to extend Claude Code capabilities
- **CI/CD**: Implementing continuous integration and deployment workflows with Claude Code
- **Best Practices**: AWS development patterns, security, and optimization techniques

The blog itself is built with Next.js 14 during the AWS Claude Code workshop and demonstrates practical examples of using Claude Code to build modern web applications with AWS branding.

## Design Requirements

### Color Palette

- **Primary Color**: AWS Orange `#FF9900` - Buttons, CTAs, links, highlights
- **Secondary Color**: AWS Dark `#232F3E` - Headers, primary text, dark backgrounds
- **Supporting Colors**:
  - AWS Blue `#146EB4` - Links, secondary accents, information
  - AWS Light Gray `#F2F3F3` - Light backgrounds, borders, dividers
  - AWS Dark Gray `#545B64` - Secondary text, muted elements

### Aesthetic Guidelines

- **Professional, technical aesthetic** inspired by AWS documentation
- Clean, minimalist layouts with clear visual hierarchy
- Use ample whitespace for readability
- Typography should be functional and legible
- Components should feel like AWS console and documentation

### Typography

- **Body Text**: System sans-serif fonts, 16px base size
- **Code**: Fira Code or monospace fallback
- **Line Height**: 1.6 for body text, 1.2 for headings

### Responsive Design (Mobile-First)

- **Mobile**: < 768px (single column, stack elements)
- **Tablet**: 768px - 1024px (2-column layouts where appropriate)
- **Desktop**: > 1024px (full layouts, wider content areas)
- Design mobile layouts first, then enhance for larger screens

### Rendering Strategy

- **Server-side rendering only** - Use React Server Components exclusively
- **No client JavaScript** - Do NOT add "use client" directives unless absolutely necessary
- All components should be server components by default
- No interactive features that require client-side JavaScript (no onClick, useState, useEffect, etc.)
- Static, fast-loading pages optimized for SEO and performance

## Architecture

This is a Next.js 14 App Router application with the following architecture:

- **Rendering Strategy**: React Server Components by default, client components only when needed
- **Styling**: Tailwind CSS 4 with AWS custom theme colors defined in `globals.css`
- **Content Management**: Markdown files in `content/posts/` with frontmatter metadata
- **Markdown Processing**: gray-matter for frontmatter, react-markdown with remark-gfm for rendering
- **Deployment**: Designed for CloudFront proxy with path-stripping rewrites
- **Type Safety**: TypeScript with strict mode enabled

### Inline Styles Approach

The `app/layout.tsx` uses inline styles in a `<style>` tag instead of relying solely on `globals.css`. This is intentional to bypass MIME type issues when serving CSS through the CloudFront proxy in the workshop environment.

## Key Files

### Configuration Files

@package.json - Defines project dependencies, scripts, and metadata. Includes Next.js 14, React 18, Tailwind CSS 4, markdown processing libraries (gray-matter, react-markdown, remark-gfm), and development tools (TypeScript, ESLint, Prettier).

@next.config.js - CloudFront proxy configuration with path-stripping rewrites. Maps `/proxy/3000/:path*` to `/:path*` for the AWS workshop environment. Also includes security headers (X-Frame-Options, X-Content-Type-Options).

@app/layout.tsx - Root layout component with inline CSS styles and metadata. Uses inline `<style>` tag to bypass MIME type issues with CloudFront proxy. Defines AWS theme variables, base styles, and includes footer with AWS branding.

### Core Application

- `app/page.tsx` - Home page with hero section and post list
- `app/globals.css` - Global styles and AWS theme variables (Tailwind CSS 4)
- `app/components/ReadingTimeBadge.tsx` - AWS-themed badge component for reading time
- `app/lib/readingTime.ts` - Utilities for calculating and formatting reading time

### Blog Posts

- `content/posts/` - Blog post markdown files with frontmatter
- Blog posts use gray-matter for frontmatter parsing and react-markdown with remark-gfm for rendering

## Development Workflow

### Running the Application

```bash
npm install        # Install dependencies
npm run dev        # Start development server (binds to 0.0.0.0:3000 for CloudFront access)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

### Important Notes

- Dev server binds to `0.0.0.0` to allow CloudFront proxy access in AWS workshop environment
- Local access: `http://localhost:3000`
- Workshop access: `https://{cloudfront-url}/proxy/3000/`

### Code Style

- Use TypeScript for type safety
- Follow React Server Components pattern (Next.js 14 App Router)
- Use Tailwind CSS 4 utility classes with AWS theme colors
- Keep components small and focused
- Add comments for complex logic
- Prettier for code formatting with Tailwind plugin

## AWS Theme Usage

When building components, always reference the AWS color palette:

```typescript
// Example: AWS-themed button
<button className="bg-aws-orange hover:bg-aws-blue text-white px-6 py-3 rounded">
  Call to Action
</button>

// Example: AWS-themed heading
<h1 className="text-aws-dark font-bold text-4xl">
  Heading Text
</h1>
```

## CloudFront Proxy Architecture

### CRITICAL: How the Proxy Works

This project runs behind a CloudFront proxy with specific path-stripping behavior that affects navigation:

**Public URL Structure:**

```
https://{cloudfront-url}/proxy/3000/
```

**Path Stripping Behavior:**

- User visits: `https://{cloudfront-url}/proxy/3000/posts/slug`
- CloudFront strips prefix and forwards to Next.js as: `/posts/slug`
- Next.js receives requests WITHOUT the `/proxy/3000/` prefix
- Next.js routes are defined without the prefix (e.g., `app/posts/[slug]/page.tsx`)

**Navigation Requirements:**

- ALL `Link` components must output full paths: `/proxy/3000/posts/slug`
- Create a `withBasePath()` helper in `app/lib/basePath.ts` when building navigation
- Example: `<Link href={withBasePath('/posts/slug')}>`
- The helper should add `/proxy/3000/` to all internal navigation URLs

**Configuration Approach:**

- ✅ DO use `next.config.js` rewrites for server-side routing
- ✅ DO use `withBasePath()` helper for all Link hrefs
- ❌ DO NOT use `basePath` in `next.config.js` (won't work with path stripping)
- ❌ DO NOT hardcode proxy path in route files

**Why This Approach:**
CloudFront strips the prefix before Next.js sees the request, so `basePath` doesn't work. Instead:

1. Server-side: Next.js routes handle requests at `/` and `/posts/[slug]`
2. Client-side: Links must include `/proxy/3000/` so browsers navigate to correct URLs
3. The `withBasePath()` helper bridges this gap

## CloudFront Proxy Setup

**Environment Details:**

- Local development: `http://localhost:3000`
- Workshop access: `https://{your-cloudfront-url}/proxy/3000/`
- Dev server binds to `0.0.0.0` for network accessibility
- Proxy rewrites configured in `next.config.js`
- Inline styles in layout bypass MIME type issues

## Blog Post Structure

Blog posts should use frontmatter with the following structure:

```markdown
---
title: "Post Title"
date: "2025-10-22"
author: "Author Name"
excerpt: "Brief description of the post"
category: "Category Name"
tags: ["tag1", "tag2"]
published: false
---

Post content here...
```

## Workshop Context

This project is built progressively through workshop exercises:

- **Exercise 004**: Context management with `/init` and memory mode
- **Exercise 005**: Visual development with screenshots and Plan Mode
- **Exercise 006**: Conversation control and component building
- **Exercise 007**: Custom commands for blog post generation
- **Exercise 008**: MCP servers for visual testing
- **Exercise 009**: GitHub integration and collaboration
- **Exercise 010-012**: Hooks for automation
- **Exercise 013**: Multiple hooks composition
- **Exercise 014**: Claude Code SDK integration

## Common Tasks

### Adding a New Blog Post

<!-- Students will create a custom command for this in Exercise 007 -->

### Testing Visual Changes

<!-- Students will use Playwright MCP server for this in Exercise 008 -->

### Git Workflow

- Make frequent commits with descriptive messages
- Use branches for features
- Let Claude help with commit messages

## Hooks Implementation

### Critical Details for Creating Hooks

**JSON Structure Received by Hooks:**
Hooks receive JSON via stdin with this structure:

```json
{
  "session_id": "...",
  "tool_name": "Read",
  "tool_input": {
    "file_path": "/path/to/file"
  },
  "hook_event_name": "PreToolUse",
  "cwd": "/project/path"
}
```

**Key Implementation Details:**

- **Extract file path**: Use `.tool_input.file_path` when parsing the JSON
- **Read input**: Use `cat` to read JSON from stdin in bash scripts
- **Exit codes**:
  - Exit code `0` = Allow operation to proceed
  - Exit code `2` = Block operation (stderr message shown to Claude)
  - Other codes = Show error to user but continue
- **Configuration file**: Place hooks configuration in `.claude/settings.json`
- **Script location**: Place hook scripts in the `hooks/` directory
- **Matcher patterns**: Use `"Read|Grep"` to match both Read and Grep tools
- **Command format**: Simple format works best: `"bash hooks/script_name.sh"`
- **Make executable**: Remember to `chmod +x` hook scripts

**Example Configuration Structure:**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|Grep",
        "hooks": [
          {
            "type": "command",
            "command": "bash hooks/your_hook_script.sh"
          }
        ]
      }
    ]
  }
}
```

**Node.js Hooks:**
For JavaScript/Node.js hooks, use one of these approaches:

- Add shebang `#!/usr/bin/env node` to script and make executable: `chmod +x hooks/script.js`
- Or use: `"command": "node hooks/script.js"`

**PostToolUse Hooks:**

- Run AFTER Write/Edit operations complete
- File is already saved to disk
- Can read file using Node.js `fs.readFileSync(filePath, 'utf8')`
- File path comes from `tool_input.file_path` in the JSON
- Use exit code 2 to show errors to Claude (Claude will see stderr and can fix issues)
- Use exit code 0 if validation passes

**Available Libraries:**
This project includes these npm packages useful for hooks:

- `gray-matter` - Parse YAML frontmatter from markdown files
- `fs` (built-in) - Read files from disk

**Example PostToolUse Hook Structure:**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node hooks/your_validation_script.js"
          }
        ]
      }
    ]
  }
}
```

## Notes for Claude

When working on this project:

- **Critical**: Server-side rendering only - Do NOT add "use client" directives or client-side JavaScript
- Always maintain the AWS color scheme (use `bg-aws-orange`, `text-aws-dark`, etc.)
- Follow mobile-first responsive design (mobile < 768px, tablet 768-1024px, desktop > 1024px)
- Maintain professional, technical aesthetic inspired by AWS documentation
- Use semantic HTML elements for accessibility
- Layout uses inline styles to bypass MIME type issues with CloudFront proxy
- Add comments for complex logic
- Follow Next.js 14 App Router conventions with React Server Components
- Remember the CloudFront proxy when building navigation (use `withBasePath()` helper)
- Optimize for SEO and fast loading times

## Memory Mode Instructions

<!-- Students will add custom instructions here in Exercise 004 -->
<!-- Example: "Always use AWS orange (#FF9900) for primary buttons" -->

- When creating blog components, always use TypeScript with strict types, Tailwind CSS for styling, and follow the AWS color scheme defined in CLAUDE.md. All blog posts should be stored as MDX files in the /content/posts directory.
