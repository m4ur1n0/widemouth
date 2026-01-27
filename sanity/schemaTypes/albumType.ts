import {defineArrayMember, defineField, defineType} from 'sanity'

export const albumType = defineType({
  name: 'album',
  title: 'Album',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Album title',
      type: 'string',
      validation: r => r.required(),
    }),

    defineField({
      name: 'year',
      title: 'Release year',
      type: 'number',
      validation: r => r.required().min(1900),
    }),

    defineField({
      name: 'spotifyLink',
      title: 'Spotify link',
      type: 'url',
    }),

    defineField({
      name: 'coverFront',
      title: 'Album cover (front)',
      type: 'image',
      options: {hotspot: true},
      validation: r => r.required(),
    }),

    defineField({
      name: 'coverBack',
      title: 'Album cover (back)',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'songs',
      title: 'Songs',
      type: 'array',
      of: [defineArrayMember({type: 'song'})],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverFront',
      year: 'year',
    },
    prepare({title, year, media}) {
      return {
        title,
        subtitle: year ? String(year) : undefined,
        media,
      }
    },
  },
})
