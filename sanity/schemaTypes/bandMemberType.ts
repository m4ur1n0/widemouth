import {defineArrayMember, defineField, defineType} from 'sanity'

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
      validation: r => r.required(),
    }),

    defineField({
      name: 'order',
      title: 'Display order (config, leave as is)',
      type: 'number',
      initialValue: 0,
      validation: r => r.required(),
    }),

    defineField({
      name: 'instrument',
      title: 'Instrument',
      type: 'string',
      validation: r => r.required(),
    }),

    defineField({
      name: 'modelPath',
      title: 'Model Path (Theo will set)',
      type: 'string',
      validation: r => r.required(),
    }),

    defineField({
      name: 'websites',
      title: 'Socials / Websites',
      type: 'array',
      of: [
        defineArrayMember({
            type: "url"
        })
      ]
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
