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
        defineField({
          name: 'timerEnd',
          title: 'Timer End',
          type: 'datetime',
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

    // defineField({
    //     name: "bandPhotos",
    //     title: "More Band Photos",
    //     description: "These photos appear on the /music page as you scroll down",
    //     type: 'array',
    //     of: [{type: 'image'}]
    // }),

    defineField({
        name: 'email',
        title: "Email for Contact Us",
        description: 'Email you want to receive messages when someone uses contact us form',
        type: 'string',
        validation: r => r.required(),

    }),

    defineField({
        name: 'substackLink',
        title: 'Substack Link',
        description: 'The link to your actual substack site.',
        type: 'url',
        validation: r => r.required(),

    }),

    defineField({
        name: 'substackSubscribeLink',
        title: 'Substack Subscribe Link',
        description: 'The endpoint we use to make people subscribe to your substack (let theo handle).',
        type: 'url',
        validation: r => r.required(),

    }),


  ],

  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
