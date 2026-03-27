import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'

export type PostMeta = {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  coverImage: string | null
  seoTitle: string
  seoDescription: string
  published: boolean
}

const reader = createReader(process.cwd(), keystaticConfig)

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await reader.collections.posts.list()

  const settled = await Promise.all(
    slugs.map(async (slug): Promise<PostMeta | null> => {
      const entry = await reader.collections.posts.read(slug)
      if (!entry || !entry.published) return null
      return {
        slug,
        title: entry.title,
        excerpt: entry.excerpt,
        date: entry.date ?? '',
        author: entry.author,
        category: entry.category,
        coverImage: entry.coverImage ?? null,
        seoTitle: entry.seoTitle || entry.title,
        seoDescription: entry.seoDescription || entry.excerpt,
        published: entry.published,
      }
    })
  )

  return (settled.filter(Boolean) as PostMeta[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getPostBySlug(slug: string) {
  const entry = await reader.collections.posts.read(slug)
  if (!entry || !entry.published) return null

  return {
    slug,
    title: entry.title,
    excerpt: entry.excerpt,
    date: entry.date ?? '',
    author: entry.author,
    category: entry.category,
    coverImage: entry.coverImage ?? null,
    seoTitle: entry.seoTitle || entry.title,
    seoDescription: entry.seoDescription || entry.excerpt,
    published: entry.published,
    content: await entry.content().catch(() => []),
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  return reader.collections.posts.list()
}

export const CATEGORY_LABELS: Record<string, string> = {
  weddings: 'Weddings',
  planning: 'Planning',
  'transportation-tips': 'Transportation Tips',
  'miami-venues': 'Miami Venues',
}
