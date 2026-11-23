import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'role', type: 'string', initialValue: 'Co-founder'}),
    defineField({name: 'bio', title: 'Short bio', type: 'text', rows: 3, validation: (r) => r.max(220).warning('Keep it to one or two sentences.')}),
    defineField({name: 'photo', type: 'image', options: {hotspot: true}, description: 'A square headshot works best.'}),
    defineField({name: 'linkedin', title: 'LinkedIn link', type: 'url'}),
    defineField({name: 'order', title: 'Order on the page', type: 'number', initialValue: 10}),
  ],
  orderings: [{title: 'Page order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})
