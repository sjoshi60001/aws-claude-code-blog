# AWS Claude Code Blog

A modern blog application built with Next.js 15, showcasing AWS branding and demonstrating the power of Claude Code for AI-assisted development.

## Workshop Context

This project is the foundation for the **AWS Claude Code Workshop**. You'll progressively build this blog through a series of hands-on exercises that teach you how to use Claude Code effectively for modern web development.

### What You'll Build

- ✅ AWS-themed hero section with responsive design
- ✅ Blog post list with markdown support
- ✅ Navigation system with routing
- ✅ Dark mode toggle with visual testing
- ✅ Comment system with GitHub integration
- ✅ Automated workflows with hooks
- ✅ RSS feed generation with Claude Code SDK

## Prerequisites

- **Node.js**: Version 18+ ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **Claude Code**: Installed and configured ([Setup Guide](https://claude.com/code))
- **Git**: For version control
- **Code Editor**: VS Code recommended (or Claude Code's VS Code server in AWS Workshop)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- Next.js 16 (latest)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Markdown processing libraries (gray-matter, react-markdown, remark-gfm)
- Development tools (prettier, eslint)

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Local Development**: `http://localhost:3000`
- **AWS Workshop**: `https://{your-cloudfront-url}/proxy/3000/`

(CloudFront URL provided in workshop setup instructions)

### 3. Initialize Claude Code

Open Claude Code in this directory and run:

```
/init
```

This analyzes your project and generates useful context in `CLAUDE.md`.

## Project Structure

```
claude-code-aws-blog/
├── app/
│   ├── layout.tsx          # Root layout with AWS branding
│   ├── page.tsx            # Home page (hero + post list)
│   └── globals.css         # AWS theme variables & styles
├── content/
│   └── posts/              # Blog post markdown files (you'll create these)
├── public/
│   └── images/             # AWS branding assets
├── CLAUDE.md               # Claude Code project context
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## AWS Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **AWS Orange** | `#FF9900` | Primary buttons, accents, hover states |
| **AWS Dark** | `#232F3E` | Headers, primary text, dark backgrounds |
| **AWS Blue** | `#146EB4` | Links, secondary accents, info elements |
| **AWS Light Gray** | `#F2F3F3` | Light backgrounds, borders, dividers |
| **AWS Dark Gray** | `#545B64` | Secondary text, muted elements |

### Using Theme Colors in Tailwind

```tsx
// Background colors
<div className="bg-aws-orange">Orange background</div>
<div className="bg-aws-dark">Dark background</div>

// Text colors
<h1 className="text-aws-dark">Dark text</h1>
<p className="text-aws-dark-gray">Muted text</p>

// Example: AWS-themed button
<button className="bg-aws-orange hover:bg-aws-blue text-white px-6 py-3 rounded-lg transition-colors">
  Get Started
</button>
```

### Responsive Breakpoints

- **Mobile**: < 768px (stack vertically, larger touch targets)
- **Tablet**: 768px - 1024px (2-column layouts)
- **Desktop**: > 1024px (3-column layouts, wider content)

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## Workshop Exercises

You'll build this blog progressively through these exercises:

### Exercise 004: Adding Context
- Use `/init` to analyze the project
- Add memory mode instructions
- Import files with `@` mentions

### Exercise 005: Making Changes
- Build AWS hero section with screenshot references
- Use Plan Mode for complex changes
- Create git commits with Claude

### Exercise 006: Controlling Context
- Build post list and navigation
- Use ESC to interrupt Claude
- Use `/compact` and `/clear` for context management

### Exercise 007: Custom Commands
- Create `/new-aws-post` command
- Generate blog posts with consistent structure
- Automate repetitive tasks

### Exercise 008: Extending Claude Code
- Set up Playwright MCP server
- Implement dark mode with visual verification
- Configure permission auto-approval

### Exercise 009: GitHub Integration
- Build comment system
- Create pull requests with Claude
- Use `@Claude` for code reviews

### Exercise 010-012: Hooks
- Post-tool hooks: Auto-format markdown
- Pre-tool hooks: Protect published posts
- Validation hooks: Check frontmatter

### Exercise 013: Useful Hooks
- Compose multiple hooks
- Generate OG images automatically
- Run type checking before saves

### Exercise 014: Claude Code SDK
- Generate RSS feed programmatically
- Use SDK for automation
- Schedule updates with cron

## Blog Post Format

Create blog posts in `content/posts/` with this frontmatter:

```markdown
---
title: "Getting Started with AWS Bedrock"
date: "2025-10-22"
author: "Your Name"
excerpt: "Learn how to use Claude through AWS Bedrock for production AI applications"
category: "AWS"
tags: ["AWS", "Bedrock", "Claude", "AI"]
published: false
---

Your markdown content here...
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found Errors

```bash
# Clear Next.js cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
```

### Tailwind Classes Not Working

1. Ensure `globals.css` is imported in `layout.tsx`
2. Check that classes use correct AWS theme names (e.g., `bg-aws-orange`)
3. Restart dev server after CSS changes

### Claude Code Can't Find Files

- Use `/init` to refresh project context
- Add important files to `CLAUDE.md` under "Key Files"
- Use `@` mentions to explicitly reference files

## Learning Resources

- **Next.js 15 Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Claude Code Documentation**: [claude.com/code/docs](https://docs.claude.com/code)
- **AWS Design Guidelines**: [aws.amazon.com/architecture/icons](https://aws.amazon.com/architecture/icons/)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **TypeScript**: [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)

## Support

- **Workshop Issues**: Ask your instructor or TA
- **Claude Code Issues**: [github.com/anthropics/claude-code/issues](https://github.com/anthropics/claude-code/issues)
- **Technical Questions**: Refer to exercise instructions

## License

This project is created for educational purposes as part of the AWS Claude Code Workshop.

---

**Ready to start building?** Head to Exercise 004 in the workshop content and let Claude Code help you build this blog!
