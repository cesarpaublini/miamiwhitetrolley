import { getPostBySlug, getAllPostSlugs, CATEGORY_LABELS } from '@/lib/blog'
import { Container } from '@/components/layout/Container'
import { DocumentRenderer } from '@keystatic/core/renderer'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

const BASE = 'https://miamiwhitetrolley.com'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: `${BASE}/blog/${slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `${BASE}/blog/${slug}`,
      siteName: 'Miami White Trolley',
      type: 'article',
      publishedTime: post.date,
      ...(post.coverImage && { images: [{ url: `${BASE}${post.coverImage}`, width: 1200, height: 630, alt: post.title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.seoDescription,
      ...(post.coverImage && { images: [`${BASE}${post.coverImage}`] }),
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Miami White Trolley', url: BASE },
    publisher: { '@type': 'Organization', name: 'Miami White Trolley', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/icon.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${slug}` },
    ...(post.coverImage && { image: `${BASE}${post.coverImage}` }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE}/blog/${slug}` },
    ],
  }

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article>

        {/* Header */}
        <section className="pb-10 pt-16 sm:pt-20">
          <Container>
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Link
                  href="/blog"
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  ← Blog
                </Link>
                <span className="text-zinc-200">|</span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  {CATEGORY_LABELS[post.category] ?? post.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-4xl mb-4">
                {post.title}
              </h1>

              <p className="text-base leading-7 text-zinc-600 mb-6">{post.excerpt}</p>

              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <span>{post.author}</span>
                <span>·</span>
                <time dateTime={post.date}>
                  {new Date(post.date + 'T12:00:00').toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </Container>
        </section>

        {/* Cover image */}
        {post.coverImage && (
          <section className="border-t border-[#EBEBEB] py-8">
            <Container>
              <div className="overflow-hidden rounded-2xl aspect-[16/7] bg-zinc-100">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={1200}
                  height={525}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </Container>
          </section>
        )}

        {/* Content */}
        <section className="border-t border-[#EBEBEB] py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-2xl prose prose-zinc prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-zinc-900 prose-a:underline prose-a:underline-offset-2 prose-img:rounded-2xl">
              <DocumentRenderer
                document={post.content}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                renderers={{ inline: { paragraph: ({ children }: any) => <>{children}</> } } as any}
              />
            </div>
          </Container>
        </section>

      </article>

      {/* Back link */}
      <section className="border-t border-[#EBEBEB] py-10">
        <Container>
          <Link
            href="/blog"
            className="text-sm font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
          >
            ← Back to all posts
          </Link>
        </Container>
      </section>
    </div>
  )
}
