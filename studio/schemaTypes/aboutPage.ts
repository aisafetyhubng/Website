import {defineArrayMember, defineField, defineType} from 'sanity'

const paragraphs = (name: string, title: string, description?: string) =>
  defineField({name, title, description, type: 'array', of: [defineArrayMember({type: 'text', rows: 4})]})

/** One document: the long-form text on the About page. */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page text',
  type: 'document',
  fields: [
    defineField({name: 'intro', title: 'Intro under "About us"', type: 'text', rows: 3}),
    paragraphs('why', 'Why AI safety in Nigeria', 'Each item is one paragraph.'),
    defineField({
      name: 'pillars',
      title: 'Our approach (three pillars)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pillar',
          fields: [
            defineField({name: 'label', title: 'Small label', type: 'string'}),
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'text', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'label'}},
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({name: 'vision', title: 'Our vision', type: 'text', rows: 3}),
    paragraphs('story', 'How we started', 'Each item is one paragraph.'),
    defineField({name: 'support', title: 'Support our work', type: 'text', rows: 4}),
  ],
  preview: {prepare: () => ({title: 'About page text'})},
})
