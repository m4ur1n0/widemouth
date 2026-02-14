import {defineField, defineType} from 'sanity'

export const pressItemType = defineType({
  name: 'pressItem',
  title: 'Press item',
  type: 'document',
  fields: [
    defineField({
          name: 'link',
          title: 'Link',
          type: 'url',
          validation: r => r.required(),
        }),
    defineField({
          name: 'title',
          title: 'Title',
          type: 'text',
          validation: r => r.required(),
        }),
    defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: r => r.required(),
        }),
    defineField({
        name: "pageOrder",
        title: "Page Order Rank [0-indexed, but doesn't actually matter that much",
        type: 'number',
        validation: r => r.required(),
    })

  ],
  preview: {
    prepare: () => ({title: 'Press item'}),
  },
})
