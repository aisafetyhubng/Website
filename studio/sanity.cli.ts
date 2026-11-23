import {defineCliConfig} from 'sanity/cli'
import {projectId, dataset} from './env'

export default defineCliConfig({
  api: {projectId, dataset},
  // Studio address for the team: https://aisafetyhubng.sanity.studio
  studioHost: 'aisafetyhubng',
  deployment: {appId: 's06yk072036xkrj2ngxg3zeb', autoUpdates: true},
})
