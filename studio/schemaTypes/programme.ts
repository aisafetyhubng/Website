import {defineField, defineType} from 'sanity'

export const programme = defineType({
  name: 'programme',
  title: 'Programmes',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required(), description: 'For example "APEx" or "Talks and seminars".'}),
    defineField({name: 'nameItalic', title: 'Word in italics after the name', type: 'string', description: 'Optional, for example "Fellowship".'}),
    defineField({
      name: 'colour',
      title: 'Colour',
      type: 'string',
      options: {
        list: [
          {title: 'Deep teal', value: 'apex'},
          {title: 'Lime', value: 'read'},
          {title: 'Aqua', value: 'events'},
          {title: 'Sand', value: 'watch'},
        ],
        layout: 'radio',
      },
      initialValue: 'events',
    }),
    defineField({name: 'order', title: 'Order on the page', type: 'number', initialValue: 10}),
    defineField({name: 'tileText', title: 'Homepage tile text', type: 'text', rows: 3, validation: (r) => r.max(160)}),
    defineField({name: 'rowText', title: 'Programmes page description', type: 'text', rows: 2}),
    defineField({name: 'aboutText', title: 'About page description', type: 'text', rows: 2}),
    defineField({name: 'status', title: 'Status (bold)', type: 'string', description: 'For example "Applications open". Leave empty if none.'}),
    defineField({name: 'statusDetail', title: 'Status detail', type: 'string', description: 'For example "Starts November 2026".'}),
    defineField({name: 'menuStatus', title: 'Status in the header menu', type: 'string'}),
    defineField({name: 'aboutStatus', title: 'Status on the About page', type: 'string'}),
    defineField({name: 'link', title: 'Link', type: 'string', description: 'A full web address, or a page on this site like /events.'}),
    defineField({name: 'linkLabel', title: 'Link text', type: 'string', initialValue: 'Find out more →'}),
  ],
  orderings: [{title: 'Page order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', italic: 'nameItalic', subtitle: 'status'}, prepare: ({title, italic, subtitle}) => ({title: italic ? `${title} ${italic}` : title, subtitle})},
})
