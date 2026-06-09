import Link from 'next/link';
import { Post, formatDate } from '../lib/posts';
import { withBasePath } from '../lib/basePath';
import ReadingTimeBadge from './ReadingTimeBadge';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <Link href={withBasePath(`/posts/${slug}`)} className="post-card">
      {/* Category badge */}
      <div className="category-badge">{frontmatter.category}</div>

      {/* Title */}
      <h3 className="post-title">{frontmatter.title}</h3>

      {/* Excerpt */}
      <p className="post-excerpt">{frontmatter.excerpt}</p>

      {/* Date, author, and reading time */}
      <div className="post-meta">
        <span>
          {formatDate(frontmatter.date)} by <span className="author">{frontmatter.author}</span>
        </span>
        <ReadingTimeBadge minutes={readingTime} />
      </div>

      {/* Tags */}
      <div className="post-tags">
        {frontmatter.tags.map((tag) => (
          <span key={tag} className="tag-badge">{tag}</span>
        ))}
      </div>
    </Link>
  );
}
