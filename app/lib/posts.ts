import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadingTime } from './readingTime';

// Directory where blog posts are stored
const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  tags: string[];
  published: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: number;
}

/**
 * Get all blog post slugs
 * @returns Array of post slugs (filenames without .md/.mdx extension)
 */
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.(md|mdx)$/, ''));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

/**
 * Get a single post by slug
 * @param slug - The post slug (filename without .md/.mdx)
 * @returns Post object with frontmatter and content
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    // Try .mdx first, then .md for backwards compatibility
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter and content
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all published posts, sorted by date (newest first)
 * @returns Array of posts with frontmatter and content
 */
export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .filter((post) => post.frontmatter.published)
    .sort((a, b) => {
      // Sort by date, newest first
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });

  return posts;
}

/**
 * Format date for display
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "October 22, 2025")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
