# AWS Branding Assets

This directory contains AWS-themed assets for the blog.

## Required Assets (Workshop Instructors)

Before distributing to students, ensure these assets are present:

### 1. AWS Logo
- **File**: `aws-logo.svg` or `aws-logo.png`
- **Source**: AWS official brand guidelines
- **Usage**: Header, hero section
- **License**: Must comply with AWS trademark guidelines

### 2. Placeholder Blog Images
- **Files**: `blog-placeholder-1.jpg`, `blog-placeholder-2.jpg`, etc.
- **Dimensions**: 1200x630px (OG image ratio)
- **Theme**: AWS/cloud/technology related
- **License**: Free to use or properly licensed

### 3. Favicon
- **File**: Replace `app/favicon.ico` with AWS-themed icon
- **Dimensions**: 32x32px and 16x16px
- **Format**: ICO or PNG

## Creating Placeholder Assets (Alternative)

If official AWS assets cannot be included, students can:

1. **Generate Placeholders**: Use Claude Code to create simple SVG placeholders
2. **Use Public Assets**: Link to publicly available AWS resources
3. **Create Simple Graphics**: Use CSS-only solutions for demonstrations

## Usage in Code

```tsx
import Image from 'next/image'

<Image
  src="/images/aws-logo.svg"
  alt="AWS Logo"
  width={120}
  height={40}
/>
```

## Copyright Notice

All AWS trademarks, logos, and brand elements are property of Amazon.com, Inc. or its affiliates. This workshop uses AWS branding for educational purposes only. Please ensure compliance with AWS trademark guidelines when distributing workshop materials.
