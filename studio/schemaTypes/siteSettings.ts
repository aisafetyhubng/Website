import {defineField, defineType} from 'sanity'

/** One document: the "Happening now" bar, the big number on the homepage and contact details. */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Homepage and site settings',
  type: 'document',
  groups: [
    {name: 'announcement', title: 'Happening now bar', default: true},
    {name: 'stat', title: 'Big number'},
    {name: 'contact', title: 'Contact and links'},
  ],
  fields: [
    defineField({
      name: 'announcementEnabled',
      title: 'Show the "Happening now" bar',
      type: 'boolean',
      initialValue: true,
      group: 'announcement',
    }),
    defineField({
      name: 'announcementTitle',
      title: 'Bold title',
      description: 'Short, for example "Reading group" or "APEx applications open".',
      type: 'string',
      group: 'announcement',
      validation: (r) => r.max(40),
    }),
    defineField({
      name: 'announcementText',
      title: 'Details',
      description: 'One line, for example "Six weeks, online · starts November 2026".',
      type: 'string',
      group: 'announcement',
      validation: (r) => r.max(110),
    }),
    defineField({name: 'announcementLinkLabel', title: 'Link text', type: 'string', initialValue: 'Apply to join →', group: 'announcement'}),
    defineField({name: 'announcementLink', title: 'Link', type: 'url', group: 'announcement'}),

    defineField({name: 'statNumber', title: 'Number', type: 'string', group: 'stat', description: 'For example "13".'}),
    defineField({name: 'statText', title: 'Sentence after the number', type: 'string', group: 'stat'}),
    defineField({name: 'statDetail', title: 'Small print', type: 'string', group: 'stat'}),
    defineField({name: 'statLinkLabel', title: 'Button text', type: 'string', group: 'stat'}),
    defineField({name: 'statLink', title: 'Button link', type: 'url', group: 'stat'}),

    defineField({name: 'email', title: 'Contact email', type: 'string', group: 'contact'}),
    defineField({name: 'location', title: 'Location line', type: 'string', group: 'contact', initialValue: 'Abuja and Lagos, Nigeria'}),
    defineField({name: 'apexLink', title: 'APEx programme page', type: 'url', group: 'contact'}),
    defineField({name: 'readingGroupLink', title: 'Reading group application link', type: 'url', group: 'contact'}),
    defineField({
      name: 'youtubeChannel',
      title: 'YouTube channel',
      type: 'url',
      group: 'contact',
      description: 'For example https://www.youtube.com/@yourchannel. Adds an "All recordings on YouTube" link and a YouTube link in the footer.',
    }),
  ],
  preview: {prepare: () => ({title: 'Homepage and site settings'})},
})
