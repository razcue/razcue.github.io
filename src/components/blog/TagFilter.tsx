import { useEffect, useState } from 'react';

interface Props {
  tags: string[];
  locale: 'en' | 'es';
  currentTag?: string | null;
  currentSort?: string | null;
  currentDir?: string | null;
}

export default function TagFilter({
  tags,
  locale,
  currentTag = null,
  currentSort = null,
  currentDir = null,
}: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(currentTag);
  const blogBasePath = locale === 'es' ? '/es/blog' : '/blog';
  const allPostsText = locale === 'es' ? 'Todos los Artículos' : 'All Posts';

  useEffect(() => {
    // Update selected tag from prop (for client-side hydration)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setSelectedTag(params.get('tag'));
    }
  }, []);

  const buildTagUrl = (tag: string | null) => {
    const params = new URLSearchParams();

    // Add tag if provided
    if (tag) {
      params.set('tag', tag);
    }

    // Preserve sort parameters
    if (currentSort) {
      params.set('sort', currentSort);
    }
    if (currentDir) {
      params.set('dir', currentDir);
    }

    const queryString = params.toString();
    return queryString ? `${blogBasePath}?${queryString}` : blogBasePath;
  };

  const handleTagClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tag: string | null
  ) => {
    // Prevent navigation if clicking the already selected tag
    if (selectedTag === tag) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
        {locale === 'es' ? 'Filtrar por Etiqueta' : 'Filter by Tag'}
      </h2>
      <div className="flex flex-wrap gap-2">
        <a
          href={buildTagUrl(null)}
          onClick={(e) => handleTagClick(e, null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !selectedTag
              ? 'bg-accent text-dark'
              : 'bg-surface text-text-secondary hover:bg-accent/20 hover:text-accent'
          }`}
        >
          {allPostsText}
        </a>
        {tags.map((tag) => (
          <a
            key={tag}
            href={buildTagUrl(tag)}
            onClick={(e) => handleTagClick(e, tag)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTag === tag
                ? 'bg-accent text-dark'
                : 'bg-surface text-text-secondary hover:bg-accent/20 hover:text-accent'
            }`}
          >
            #{tag}
          </a>
        ))}
      </div>
    </div>
  );
}
