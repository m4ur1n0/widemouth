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
        })
  ],
  preview: {
    prepare: () => ({title: 'Press item'}),
  },
})
