import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllPostSlugs, getPostBySlug, formatDate } from '../../lib/posts';
import ReadingTimeBadge from '../../components/ReadingTimeBadge';

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        {/* Category badge */}
        <div className="category-badge mb-4">{post.frontmatter.category}</div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>

        {/* Metadata */}
        <div className="post-meta mb-4">
          <span>
            {formatDate(post.frontmatter.date)} by <span className="author">{post.frontmatter.author}</span>
          </span>
          <ReadingTimeBadge minutes={post.readingTime} />
        </div>

        {/* Tags */}
        <div className="post-tags mb-8">
          {post.frontmatter.tags.map((tag) => (
            <span key={tag} className="tag-badge">{tag}</span>
          ))}
        </div>

        {/* Content */}
        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
