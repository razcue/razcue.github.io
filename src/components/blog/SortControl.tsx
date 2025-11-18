import { useEffect, useState } from 'react';

interface Props {
  locale: 'en' | 'es';
}

type SortBy = 'date' | 'readingTime';
type SortDirection = 'asc' | 'desc';

export default function SortControl({ locale }: Props) {
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const blogBasePath = locale === 'es' ? '/es/blog' : '/blog';

  const sortOptions = {
    date: locale === 'es' ? 'Fecha' : 'Date',
    readingTime: locale === 'es' ? 'Tiempo de lectura' : 'Reading time',
  };

  useEffect(() => {
    // Read sort from URL params
    const params = new URLSearchParams(window.location.search);
    const sortParam = params.get('sort') as SortBy | null;
    const directionParam = params.get('dir') as SortDirection | null;

    if (sortParam === 'date' || sortParam === 'readingTime') {
      setSortBy(sortParam);
    }

    if (directionParam === 'asc' || directionParam === 'desc') {
      setSortDirection(directionParam);
    } else {
      // Default directions
      setSortDirection(sortParam === 'readingTime' ? 'asc' : 'desc');
    }
  }, []);

  const handleSortChange = (newSort: SortBy) => {
    const params = new URLSearchParams(window.location.search);

    let newDirection: SortDirection;

    if (newSort === sortBy) {
      // Toggle direction if clicking the same sort
      newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Default direction for new sort
      newDirection = newSort === 'date' ? 'desc' : 'asc';
    }

    // Set sort parameter (date is default, can be omitted)
    if (newSort === 'date' && newDirection === 'desc') {
      params.delete('sort');
      params.delete('dir');
    } else {
      params.set('sort', newSort);
      params.set('dir', newDirection);
    }

    const newUrl = params.toString()
      ? `${blogBasePath}?${params.toString()}`
      : blogBasePath;

    window.location.href = newUrl;
  };

  const getSortIcon = (sort: SortBy) => {
    if (sortBy !== sort) return null;

    return (
      <i
        className={`ml-1 w-4 h-4 ${sortDirection === 'asc' ? 'i-tabler-arrow-up' : 'i-tabler-arrow-down'}`}
      />
    );
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-sm text-text-secondary">
        {locale === 'es' ? 'Ordenar por:' : 'Sort by:'}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => handleSortChange('date')}
          className={`px-3 py-1 text-sm rounded-lg transition-colors cursor-pointer ${
            sortBy === 'date'
              ? 'bg-accent text-dark font-medium'
              : 'bg-surface text-text-secondary hover:bg-accent/20 hover:text-accent'
          }`}
        >
          {sortOptions.date}
          {getSortIcon('date')}
        </button>
        <button
          onClick={() => handleSortChange('readingTime')}
          className={`px-3 py-1 text-sm rounded-lg transition-colors cursor-pointer ${
            sortBy === 'readingTime'
              ? 'bg-accent text-dark font-medium'
              : 'bg-surface text-text-secondary hover:bg-accent/20 hover:text-accent'
          }`}
        >
          {sortOptions.readingTime}
          {getSortIcon('readingTime')}
        </button>
      </div>
    </div>
  );
}
