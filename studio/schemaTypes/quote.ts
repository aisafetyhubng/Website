import {defineField, defineType} from 'sanity'

export const quote = defineType({
  name: 'quote',
  title: 'Quotes',
  type: 'document',
  fields: [
    defineField({name: 'text', title: 'Quote', type: 'text', rows: 3, validation: (r) => r.required()}),
    defineField({name: 'name', title: 'Who said it', type: 'string'}),
    defineField({name: 'role', title: 'Their role', type: 'string'}),
    defineField({name: 'photo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'order', type: 'number', initialValue: 10}),
  ],
  preview: {select: {title: 'name', subtitle: 'text', media: 'photo'}},
})
