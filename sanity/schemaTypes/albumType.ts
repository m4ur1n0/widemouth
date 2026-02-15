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
      name: 'orderIndex',
      title: 'Order Index',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 1, 2, 3). Use this to control the exact order of albums.',
      validation: r => r.required().min(0),
    }),

    defineField({
      name: 'month',
      title: 'Release month',
      type: 'string',
      description: 'Month name (e.g., January, February, March)',
      validation: r => r.required(),
      options: {
        list: [
          {title: 'January', value: 'January'},
          {title: 'February', value: 'February'},
          {title: 'March', value: 'March'},
          {title: 'April', value: 'April'},
          {title: 'May', value: 'May'},
          {title: 'June', value: 'June'},
          {title: 'July', value: 'July'},
          {title: 'August', value: 'August'},
          {title: 'September', value: 'September'},
          {title: 'October', value: 'October'},
          {title: 'November', value: 'November'},
          {title: 'December', value: 'December'},
        ],
      },
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
      name: 'bandcampLink',
      title: 'Bandcamp link',
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
      month: 'month',
      year: 'year',
    },
    prepare({title, month, year, media}) {
      const releaseDate = month && year ? `${month} ${year}` : year ? String(year) : undefined
      return {
        title,
        subtitle: releaseDate,
        media,
      }
    },
  },
})
