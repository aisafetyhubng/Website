import {defineField, defineType} from 'sanity'

export const timelineEntry = defineType({
  name: 'timelineEntry',
  title: 'Timeline (About page)',
  type: 'document',
  fields: [
    defineField({name: 'date', title: 'Date (for ordering)', type: 'date', validation: (r) => r.required()}),
    defineField({name: 'short', title: 'Label on the line', type: 'string', description: 'For example "Mar" or "Dec 2025".'}),
    defineField({name: 'label', title: 'Small caption on the line', type: 'string'}),
    defineField({name: 'when', title: 'Date shown on the card', type: 'string', description: 'For example "March 2026".'}),
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'text', type: 'text', rows: 3}),
  ],
  orderings: [{title: 'Date', name: 'date', by: [{field: 'date', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'when'}},
})
