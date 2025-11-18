import type { CollectionEntry } from 'astro:content';
import { getTranslation } from '../../utils/i18n';

interface Props {
  post: CollectionEntry<'blog'>;
}

export default function FeaturedPost({ post }: Props) {
  const { title, description, pubDate, heroImage, tags, readingTime, locale } =
    post.data;
  const t = getTranslation(locale);
  // Remove locale prefix from slug (en/post-name -> post-name)
  const cleanSlug = post.slug.replace(/^(en|es)\//, '');
  const postUrl =
    locale === 'es' ? `/es/blog/${cleanSlug}` : `/blog/${cleanSlug}`;
  const blogBasePath = locale === 'es' ? '/es/blog' : '/blog';

  const formattedDate = new Intl.DateTimeFormat(post.data.locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(pubDate);

  return (
    <article className="relative overflow-hidden rounded-lg bg-surface border border-surface">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Image Section - Maintains 1200:630 aspect ratio */}
        {heroImage && (
          <a href={postUrl} className="block lg:w-1/2 flex-shrink-0 lg:ml-4">
            <img
              src={heroImage}
              alt={title}
              className="w-full h-auto aspect-[1200/630] object-cover"
            />
          </a>
        )}

        {/* Content Section - Matches image height on desktop */}
        <div className="p-6 lg:p-8 flex flex-col justify-center lg:w-1/2">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
              {t.blog.featured}
            </span>
            <time
              className="text-sm text-text-secondary"
              dateTime={pubDate.toISOString()}
            >
              {formattedDate}
            </time>
          </div>

          <a href={postUrl}>
            <h2 className="text-3xl lg:text-4xl font-bold text-text hover:text-accent transition-colors mb-4">
              {title}
            </h2>
          </a>

          <p className="text-lg text-text-secondary mb-6">{description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <a
                key={tag}
                href={`${blogBasePath}?tag=${tag}`}
                className="text-sm px-3 py-1 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors"
              >
                #{tag}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={postUrl}
              className="px-6 py-3 bg-accent text-dark font-medium rounded-lg hover:bg-accent/90 transition-colors"
            >
              {t.blog.readArticle}
            </a>
            <span className="text-sm text-text-secondary">
              ⏱️ {readingTime} {t.blog.minRead}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
