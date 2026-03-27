#!/usr/bin/env node
/**
 * Wix Blog → Keystatic Migration Script
 *
 * What it does:
 *   1. Fetches the Wix RSS feed
 *   2. Creates a .mdoc stub file for each post (metadata pre-filled)
 *   3. Downloads cover images from Wix CDN into /public/images/blog/[slug]/
 *
 * What you do after:
 *   - Open each Wix post in Chrome
 *   - Use the bookmarklet in scripts/wix-bookmarklet.js to copy content as markdown
 *   - Paste it into the .mdoc file, replacing the TODO block
 *   - Set `published: true` when ready
 *
 * Run: node scripts/migrate-wix-blog.mjs
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const RSS_URL = 'https://www.miamiwhitetrolley.com/blog-feed.xml'

// Manual category assignments based on post topic
const CATEGORY_MAP = {
  'how-to-coordinate-wedding-day-transportation-for-large-parties-in-miami': 'weddings',
  'miami-wedding-planning-how-to-budget-for-your-wedding-transportation': 'planning',
  'wedding-transportation-miami-fl': 'weddings',
  'sprinter-van-rentals-in-miami-for-wedding-transportation': 'transportation-tips',
  'miami-shines-as-a-premier-wedding-destination-in-recent-wallethub-study': 'miami-venues',
  'elevate-your-miami-wedding-with-our-luxurious-36-passenger-white-coach-bus': 'weddings',
  'experience-elegance-on-your-special-day-with-our-1966-lincoln-continental-convertible-in-miami': 'weddings',
  'how-to-plan-the-best-itinerary-for-your-trolley-wedding-transportation': 'planning',
  'how-does-wedding-transportation-works': 'transportation-tips',
  'how-much-does-transportation-for-wedding-cost': 'planning',
  'what-is-the-best-time-to-get-married-in-miami-fl': 'miami-venues',
  'how-to-plan-your-wedding-transportation-succesfully': 'planning',
  'experience-elegance-and-history-with-miami-wedding-trolley-venues-and-churches-we-ve-worked-with': 'miami-venues',
  'wedding-transportation-can-be-a-tricky-aspect-to-plan-for-a-couple-getting-married': 'transportation-tips',
  'what-you-need-is-a-white-trolley-for-your-wedding-photoshoot': 'weddings',
}

// Slugs that already exist in /content/blog — skip these
const EXISTING_SLUGS = new Set([
  'how-to-choose-the-perfect-wedding-transportation-in-miami-fl',
])

// ─── XML Helpers ─────────────────────────────────────────────────────────────

function parseCDATA(xml, tag) {
  const re = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`)
  const m = xml.match(re)
  if (m) return m[1].trim()
  const plain = new RegExp(`<${tag}>([^<]*)<\\/${tag}>`)
  const p = xml.match(plain)
  return p ? p[1].trim() : ''
}

function parseItems(xml) {
  const items = []
  const re = /<item>([\s\S]*?)<\/item>/g
  let m
  while ((m = re.exec(xml)) !== null) {
    const raw = m[1]
    const link = raw.match(/<link>([^<]+)<\/link>/)?.[1]?.trim() ?? ''
    const slug = link.replace('https://www.miamiwhitetrolley.com/post/', '')
    const enclosure = raw.match(/<enclosure url="([^"]+)"/)?.[1] ?? ''
    items.push({
      title: parseCDATA(raw, 'title'),
      excerpt: parseCDATA(raw, 'description'),
      link,
      slug,
      pubDate: raw.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1]?.trim() ?? '',
      author: parseCDATA(raw, 'dc:creator') || 'Miami White Trolley',
      imageUrl: enclosure,
    })
  }
  return items
}

// ─── Date Formatting ─────────────────────────────────────────────────────────

function toISODate(pubDate) {
  return new Date(pubDate).toISOString().slice(0, 10)
}

// ─── Image Download ───────────────────────────────────────────────────────────

async function downloadImage(wixUrl, destDir) {
  if (!wixUrl) return null
  try {
    // Strip Wix transform params to get the original image
    // e.g. https://static.wixstatic.com/media/abc123.jpg/v1/fit/... → .../abc123.jpg
    const baseUrl = wixUrl.replace(/\/v1\/.+$/, '')
    const extMatch = baseUrl.match(/\.(jpg|jpeg|png|webp)$/i)
    const ext = extMatch ? extMatch[1].toLowerCase().replace('jpeg', 'jpg') : 'jpg'
    const filename = `coverImage.${ext}`
    const dest = join(destDir, filename)

    if (existsSync(dest)) {
      console.log(`    ↳ image already exists, skipping download`)
      return filename
    }

    const res = await fetch(baseUrl, { redirect: 'follow' })
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${baseUrl}`)
    const buf = await res.arrayBuffer()
    writeFileSync(dest, Buffer.from(buf))
    console.log(`    ↳ downloaded ${filename} (${Math.round(buf.byteLength / 1024)} KB)`)
    return filename
  } catch (err) {
    console.warn(`    ↳ image download failed: ${err.message}`)
    return null
  }
}

// ─── .mdoc File Generator ─────────────────────────────────────────────────────

/** Quote a string for YAML if it contains characters that break plain scalars */
function yamlStr(str) {
  // Needs quoting if it contains `: ` (colon-space), starts with special chars,
  // or contains characters that could confuse the YAML parser
  if (/[:\[\]{},#&*!|>'"%@`]/.test(str) || /^[-?]/.test(str)) {
    return `"${str.replace(/"/g, '\\"')}"`
  }
  return str
}

function generateMdoc({ title, excerpt, slug, pubDate, author, category, coverImageFile }) {
  const date = toISODate(pubDate)
  const coverLine = coverImageFile
    ? `coverImage: /images/blog/${slug}/${coverImageFile}`
    : ''

  // Wrap long lines in excerpt for YAML block scalar
  const excerptYaml = excerpt.replace(/(.{1,76})\s/g, '$1\n  ').trim()
  const seoDescYaml = excerpt.slice(0, 155).replace(/(.{1,76})\s/g, '$1\n  ').trim()
  const seoTitle = `${title} | Miami White Trolley`

  return `---
title: ${yamlStr(title)}
excerpt: >-
  ${excerptYaml}
date: ${date}
author: ${author}
category: ${category}
${coverLine}
seoTitle: ${yamlStr(seoTitle)}
seoDescription: >-
  ${seoDescYaml}
published: false
---

${excerpt}

> **TODO:** Paste the full article content below this line.
> Source: https://www.miamiwhitetrolley.com/post/${slug}
> Use the bookmarklet in scripts/wix-bookmarklet.js to copy it as Markdown.
`
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Fetching RSS feed...')
  const res = await fetch(RSS_URL)
  if (!res.ok) throw new Error(`Failed to fetch RSS: ${res.status}`)
  const xml = await res.text()
  const items = parseItems(xml)
  console.log(`Found ${items.length} posts in feed\n`)

  let created = 0
  let skipped = 0

  for (const item of items) {
    if (EXISTING_SLUGS.has(item.slug)) {
      console.log(`⏭  Skipping (already exists): ${item.slug}`)
      skipped++
      continue
    }

    console.log(`📄 ${item.slug}`)

    // Ensure image dir exists
    const imgDir = join(ROOT, 'public/images/blog', item.slug)
    mkdirSync(imgDir, { recursive: true })

    // Download cover image
    const coverImageFile = await downloadImage(item.imageUrl, imgDir)

    // Assign category
    const category = CATEGORY_MAP[item.slug] ?? 'weddings'

    // Write .mdoc stub
    const mdocPath = join(ROOT, 'content/blog', `${item.slug}.mdoc`)
    if (existsSync(mdocPath)) {
      console.log(`    ↳ .mdoc already exists, skipping`)
      skipped++
    } else {
      const content = generateMdoc({ ...item, category, coverImageFile })
      writeFileSync(mdocPath, content, 'utf8')
      console.log(`    ↳ created content/blog/${item.slug}.mdoc`)
      created++
    }
  }

  console.log(`
────────────────────────────────────────
✅ Done — ${created} files created, ${skipped} skipped

Next steps:
  1. Open each Wix post in Chrome (links in each .mdoc)
  2. Run the bookmarklet from scripts/wix-bookmarklet.js to copy content as Markdown
  3. Paste into the .mdoc file, replacing the TODO block
  4. Set published: true when the post is ready
────────────────────────────────────────`)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
