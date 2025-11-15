import { type ReactNode } from 'react';

interface PortfolioLayoutProps {
  hero: ReactNode;
  navigation: ReactNode;
  content: ReactNode;
  sidebar: ReactNode;
}

export default function PortfolioLayout({
  hero,
  navigation,
  content,
  sidebar,
}: PortfolioLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-12 gap-0">
      {/* Column 1: Hero & Navigation */}
      {/* Large Desktop (>1536px): 5/12 */}
      {/* Standard Desktop (1024px-1536px): 5/12 */}
      {/* Large Tablets & Big Phones (640px-1023px): 2/12 */}
      {/* Small Phones (<640px): 12/12 (full width) */}
      <div className="col-span-12 md:col-span-2 lg:col-span-5 bg-[var(--surface)] border-r border-[var(--surface)]">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <div className="p-6 lg:p-8">
            {hero}
            {navigation}
          </div>
        </div>
      </div>

      {/* Column 2: Main Content */}
      {/* All breakpoints: 6/12 (when three-column), 12/12 (when single column) */}
      <div className="col-span-12 md:col-span-6">
        <div className="h-screen overflow-y-auto">{content}</div>
      </div>

      {/* Column 3: Sidebar */}
      {/* Large Desktop (>1536px): 1/12 */}
      {/* Standard Desktop (1024px-1536px): 1/12 */}
      {/* Large Tablets & Big Phones (640px-1023px): 2/12 */}
      {/* Small Phones (<640px): hidden */}
      <div className="hidden md:col-span-2 lg:col-span-1 bg-[var(--surface)] border-l border-[var(--surface)]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center p-4">
          {sidebar}
        </div>
      </div>
    </div>
  );
}
