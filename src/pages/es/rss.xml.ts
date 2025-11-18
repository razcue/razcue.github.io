import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog', ({ data }) => {
    return data.locale === 'es' && !data.draft;
  });

  const sortedPosts = blog.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Rayko Azcue - Blog',
    description:
      'Artículos técnicos sobre desarrollo web, rendimiento y frameworks modernos',
    site: context.site || 'https://razcue.github.io',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/es/blog/${post.slug.replace(/^es\//, '')}/`,
      categories: post.data.tags,
      author: 'Rayko Azcue',
    })),
    customData: `<language>es-es</language>`,
  });
}
