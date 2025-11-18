import type { CollectionEntry } from 'astro:content';
import { getTranslation } from '../../utils/i18n';

interface Props {
  post: CollectionEntry<'blog'>;
  view?: 'grid' | 'list';
}

export default function BlogCard({ post, view = 'grid' }: Props) {
  const {
    title,
    description,
    pubDate,
    heroImage,
    tags,
    readingTime,
    liveUrl,
    githubUrl,
    locale,
  } = post.data;
  const t = getTranslation(locale);
  // Remove locale prefix from slug (en/post-name -> post-name)
  const cleanSlug = post.slug.replace(/^(en|es)\//, '');
  const postUrl =
    locale === 'es' ? `/es/blog/${cleanSlug}` : `/blog/${cleanSlug}`;
  const blogBasePath = locale === 'es' ? '/es/blog' : '/blog';

  const formattedDate = new Intl.DateTimeFormat(post.data.locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(pubDate);

  if (view === 'list') {
    return (
      <article className="flex flex-col md:flex-row gap-0 bg-surface rounded-lg border border-surface hover:border-accent/30 transition-all overflow-hidden">
        {heroImage && (
          <a href={postUrl} className="md:w-2/5 flex-shrink-0">
            <img
              src={heroImage}
              alt={title}
              className="w-full h-auto aspect-[1200/630] object-cover"
            />
          </a>
        )}
        <div className="flex-1 p-6 flex flex-col justify-center">
          <a href={postUrl}>
            <h3 className="text-2xl font-bold text-text hover:text-accent transition-colors mb-2">
              {title}
            </h3>
          </a>
          <p className="text-text-secondary mb-4 line-clamp-2">{description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
            <time dateTime={pubDate.toISOString()}>📅 {formattedDate}</time>
            <span>
              ⏱️ {readingTime} {t.blog.minRead}
            </span>
            {tags.slice(0, 3).map((tag) => (
              <a
                key={tag}
                href={`${blogBasePath}?tag=${tag}`}
                className="text-accent hover:underline"
              >
                #{tag}
              </a>
            ))}
          </div>
          {(liveUrl || githubUrl) && (
            <div className="flex gap-3 mt-4">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors"
                >
                  🌐 Live Demo
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1 bg-surface border border-accent/20 text-accent rounded-lg hover:bg-accent/10 transition-colors"
                >
                  💻 Code
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col bg-surface rounded-lg border border-surface hover:border-accent/30 transition-all overflow-hidden h-full">
      {heroImage && (
        <a href={postUrl} className="block">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-auto aspect-[1200/630] object-cover"
          />
        </a>
      )}
      <div className="p-6 flex flex-col flex-1">
        <a href={postUrl}>
          <h3 className="text-xl font-bold text-text hover:text-accent transition-colors mb-2">
            {title}
          </h3>
        </a>
        <p className="text-text-secondary mb-4 flex-1">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <a
              key={tag}
              href={`${blogBasePath}?tag=${tag}`}
              className="text-xs px-2 py-1 bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors"
            >
              #{tag}
            </a>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-text-secondary pt-4 border-t border-surface">
          <time dateTime={pubDate.toISOString()}>📅 {formattedDate}</time>
          <span>
            ⏱️ {readingTime} {t.blog.minRead}
          </span>
        </div>
        {(liveUrl || githubUrl) && (
          <div className="flex gap-2 mt-4">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-xs text-center px-3 py-2 bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors"
              >
                🌐 Live
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-xs text-center px-3 py-2 bg-surface border border-accent/20 text-accent rounded hover:bg-accent/10 transition-colors"
              >
                💻 Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
