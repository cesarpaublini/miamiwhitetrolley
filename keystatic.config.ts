import { config, fields, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: { name: 'Miami White Trolley' },
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: {
            label: 'Slug',
            description: 'Auto-generated from title. This becomes the post URL.',
          },
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
          description: 'Short summary shown on the blog index and in search results.',
          validation: { length: { min: 1 } },
        }),
        date: fields.date({
          label: 'Publish Date',
          validation: { isRequired: true },
        }),
        author: fields.text({
          label: 'Author',
          defaultValue: 'Miami White Trolley',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Weddings', value: 'weddings' },
            { label: 'Planning', value: 'planning' },
            { label: 'Transportation Tips', value: 'transportation-tips' },
            { label: 'Miami Venues', value: 'miami-venues' },
          ],
          defaultValue: 'weddings',
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
          description: 'Featured image shown at the top of the post and on the blog index.',
        }),
        seoTitle: fields.text({
          label: 'SEO Title',
          description: 'Overrides the post title in Google search results. Leave empty to use the post title.',
        }),
        seoDescription: fields.text({
          label: 'SEO Description',
          multiline: true,
          description: 'Overrides the excerpt in Google search results. Leave empty to use the excerpt.',
        }),
        published: fields.checkbox({
          label: 'Published',
          defaultValue: false,
          description: 'Only published posts appear on the live site.',
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/blog',
            publicPath: '/images/blog/',
          },
        }),
      },
    }),
  },
})
