import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',

  fields: [
    defineField({
      name: 'featuredProject',
      title: 'Featured project',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'spotifyLink',
          title: 'Spotify link',
          type: 'url',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          description: 'Manual upload; can later automate from Spotify',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),

    defineField({
      name: 'bandBio',
      title: 'Band bio',
      type: 'text',
    }),

    defineField({
      name: 'bandPhoto',
      title: 'Band photo',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'featuredVideos',
      title: 'Featured videos',
      description: 'Decide later; placeholder',
      type: 'array',
      of: [{type: 'url'}],
    }),
  ],

  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
