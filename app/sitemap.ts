import type { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/blog'
import { getAllVehicleSlugs } from '@/lib/fleet-vehicles'

const BASE = 'https://miamiwhitetrolley.com'

const SERVICE_AREA_SLUGS = [
  'miami', 'coral-gables', 'fort-lauderdale', 'coconut-grove', 'brickell',
  'wynwood', 'downtown-miami', 'west-palm-beach', 'naples', 'islamorada',
  'tampa', 'clearwater',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, vehicleSlugs] = await Promise.all([
    getAllPostSlugs(),
    Promise.resolve(getAllVehicleSlugs()),
  ])

  const static_pages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/fleet`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/service-areas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE}/book`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
  ]

  const fleet_pages: MetadataRoute.Sitemap = vehicleSlugs.map((slug) => ({
    url: `${BASE}/fleet/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const area_pages: MetadataRoute.Sitemap = SERVICE_AREA_SLUGS.map((slug) => ({
    url: `${BASE}/service-areas/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const blog_pages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.65,
  }))

  return [...static_pages, ...fleet_pages, ...area_pages, ...blog_pages]
}
