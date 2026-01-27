import {defineField, defineType} from 'sanity'

export const merchItemType = defineType({
  name: 'merchItem',
  title: 'Merch item',
  type: 'document',

  fields: [
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'image',
      options: {hotspot: true},
      validation: r => r.required(),
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: r => r.required().min(0),
    }),

    defineField({
      name: 'bandcampLink',
      title: 'Bandcamp merch page link',
      type: 'url',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      media: 'picture',
      price: 'price',
    },
    prepare({media, price}) {
      return {
        title: price != null ? `$${price}` : 'Merch item',
        media,
      }
    },
  },
})
