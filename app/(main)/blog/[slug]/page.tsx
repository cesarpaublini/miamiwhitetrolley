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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: 'article',
      publishedTime: post.date,
      ...(post.coverImage && { images: [{ url: post.coverImage }] }),
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="bg-white">
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
