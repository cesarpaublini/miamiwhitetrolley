import { getAllPosts, CATEGORY_LABELS } from '@/lib/blog'
import { Container } from '@/components/layout/Container'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Miami White Trolley',
  description:
    'Wedding transportation tips, planning guides, and Miami venue spotlights from the Miami White Trolley team.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="pb-16 pt-16 sm:pb-20 sm:pt-20">
        <Container>
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#222222]">
              Our Blog
            </p>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl">
              Wedding &amp; Event Transportation Tips
            </h1>
            <p className="text-base leading-7 text-zinc-600">
              Planning guides, venue spotlights, and expert advice for your Miami event transportation.
            </p>
          </div>
        </Container>
      </section>

      {/* Posts */}
      <section className="border-t border-[#EBEBEB] py-16 sm:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-sm text-zinc-400">No posts published yet. Check back soon.</p>
          ) : (
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.slug} className="group flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl bg-zinc-100 aspect-[16/9] mb-5">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={800}
                        height={450}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-zinc-100" />
                    )}
                  </Link>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                      {CATEGORY_LABELS[post.category] ?? post.category}
                    </span>
                    <span className="text-zinc-200">·</span>
                    <time className="text-xs text-zinc-400" dateTime={post.date}>
                      {new Date(post.date + 'T12:00:00').toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>

                  <h2 className="text-lg font-semibold tracking-tight text-zinc-900 mb-2 transition-colors group-hover:text-zinc-600">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-sm leading-6 text-zinc-500 flex-1 mb-4">{post.excerpt}</p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>

    </div>
  )
}
