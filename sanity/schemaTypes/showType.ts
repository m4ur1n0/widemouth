import {defineField, defineType} from 'sanity'

export const showType = defineType({
  name: 'show',
  title: 'Show / Tour date',
  type: 'document',

  fields: [
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: r => r.required(),
    }),

    defineField({
      name: 'datetime',
      title: 'Date & time',
      type: 'datetime',
      validation: r => r.required(),
    }),

    defineField({
      name: 'ticketLink',
      title: 'Ticket link',
      type: 'url',
    }),

    defineField({
      name: 'headliner',
      title: 'Headliner',
      type: 'string',
    }),

    defineField({
      name: 'opener',
      title: 'Opener',
      type: 'string',
    }),

    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
    }),
  ],

  preview: {
    select: {
      location: 'location',
      datetime: 'datetime',
    },
    prepare({location, datetime}) {
      return {
        title: location,
        subtitle: datetime
          ? new Date(datetime).toLocaleString()
          : undefined,
      }
    },
  },
})
