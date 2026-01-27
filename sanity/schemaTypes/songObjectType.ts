import {defineField, defineType} from 'sanity'

export const songObjectType = defineType({
  name: 'song',
  title: 'Song',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: r => r.required(),
    }),

    defineField({
      name: 'coverOverride',
      title: 'Album cover override (optional)',
      description: 'Leave empty to use the album cover',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'lyrics',
      title: 'Lyrics',
      type: 'text',
    }),

    defineField({
      name: 'credits',
      title: 'Credits',
      description: 'Plaintext; band decides format',
      type: 'string',
    }),
  ],

  preview: {
    select: {title: 'title'},
  },
})
