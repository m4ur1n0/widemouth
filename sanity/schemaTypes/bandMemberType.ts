import {defineField, defineType} from 'sanity'

export const bandMemberType = defineType({
  name: 'bandMember',
  title: 'Band member',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: r => r.required(),
    }),

    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),

    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
  ],

  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],

  preview: {
    select: {title: 'name'},
  },
})
