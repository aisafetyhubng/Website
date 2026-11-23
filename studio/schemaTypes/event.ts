import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (r) => r.required(),
      description: 'Events with a date in the future show under "Next up". Past events move down automatically.',
    }),
    defineField({
      name: 'monthOnly',
      title: 'Exact day not decided yet',
      type: 'boolean',
      initialValue: false,
      description: 'Shows only the month and year, for example "Nov 2026".',
    }),
    defineField({name: 'details', title: 'Details line', type: 'string', description: 'For example "Online · 90 minutes · free".'}),
    defineField({name: 'link', title: 'Registration or recap link', type: 'url'}),
    defineField({
      name: 'youtubeUrl',
      title: 'Recording on YouTube',
      type: 'url',
      description: 'Paste the YouTube link of the recording (any form: youtube.com/watch?v=…, youtu.be/…, /live/…). It then plays on the Events page under "Recordings".',
      validation: (r) =>
        r.custom((v?: string) =>
          !v || /(?:youtu\.be\/|[?&]v=|\/(?:live|shorts|embed)\/)[\w-]{11}/.test(v) ? true : 'This does not look like a YouTube video link.',
        ),
    }),
    defineField({
      name: 'image',
      title: 'Flyer or photo',
      type: 'image',
      options: {hotspot: true},
      description: 'Past events with an image appear as cards with a picture. Use the hotspot to choose what stays in view.',
      fields: [defineField({name: 'alt', title: 'Describe the image', type: 'string'})],
    }),
    defineField({name: 'cardTitle', title: 'Card title (optional)', type: 'string', description: 'A longer title for the picture card, for example including the speaker.'}),
    defineField({name: 'cardLabel', title: 'Card label (optional)', type: 'string', description: 'For example "APEx seminar" or "Online".'}),
    defineField({name: 'showOnHomepage', title: 'Show on the homepage after it has passed', type: 'boolean', initialValue: false}),
    defineField({
      name: 'featured',
      title: 'Feature this past event',
      type: 'object',
      description: 'Optional. Shows a highlight box with key facts and two photos.',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({name: 'enabled', title: 'Feature it', type: 'boolean', initialValue: false}),
        defineField({name: 'kicker', title: 'Small line above the title', type: 'string'}),
        defineField({
          name: 'facts',
          type: 'array',
          of: [{type: 'object', name: 'fact', fields: [
            defineField({name: 'label', type: 'string'}),
            defineField({name: 'big', title: 'Big number (optional)', type: 'string'}),
            defineField({name: 'text', type: 'string'}),
          ], preview: {select: {title: 'label', subtitle: 'text'}}}],
        }),
        defineField({name: 'photos', type: 'array', of: [{type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', type: 'string'})]}], validation: (r) => r.max(2)}),
      ],
    }),
  ],
  orderings: [{title: 'Date, newest first', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {select: {title: 'title', date: 'date', media: 'image'}, prepare: ({title, date, media}) => ({title, subtitle: date, media})},
})
