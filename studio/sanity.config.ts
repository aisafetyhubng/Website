import {defineConfig} from 'sanity'
import {structureTool, type StructureBuilder} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {projectId, dataset} from './env'
import {brand} from '../brand.config.mjs'

const singletons = new Set(['siteSettings', 'aboutPage'])

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Website content')
    .items([
      S.listItem().title('Homepage and site settings').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem().title('About page text').id('aboutPage').child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.divider(),
      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('programme').title('Programmes'),
      S.documentTypeListItem('teamMember').title('Team'),
      S.documentTypeListItem('partner').title('Partners'),
      S.documentTypeListItem('quote').title('Quotes'),
      S.documentTypeListItem('timelineEntry').title('Timeline (About page)'),
    ])

export default defineConfig({
  name: 'default',
  title: brand.name,
  projectId,
  dataset,
  plugins: [structureTool({structure}), visionTool()],
  schema: {
    types: schemaTypes,
    // Settings pages are single documents: hide them from "create new".
    templates: (templates) => templates.filter(({schemaType}) => !singletons.has(schemaType)),
  },
  document: {
    actions: (actions, {schemaType}) =>
      singletons.has(schemaType) ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action)) : actions,
  },
})
