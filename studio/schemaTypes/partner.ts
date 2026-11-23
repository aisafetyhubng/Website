import {defineField, defineType} from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Partners',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'shortName', title: 'Short name for the homepage strip (optional)', type: 'string'}),
    defineField({name: 'role', title: 'How we work together', type: 'string', description: 'For example "Event co-host" or "Seminar speaker".'}),
    defineField({name: 'website', type: 'url'}),
    defineField({
      name: 'logo',
      type: 'image',
      description: 'Use a logo with a white or transparent background. It shows in grey and turns to colour on hover.',
    }),
    defineField({
      name: 'logoHeight',
      title: 'Logo height (pixels)',
      type: 'number',
      initialValue: 36,
      description: 'Make very wide logos smaller (around 20) and square ones bigger (around 50) so they look balanced.',
      validation: (r) => r.min(14).max(70),
    }),
    defineField({name: 'order', type: 'number', initialValue: 10}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role'}},
})
