import { load_settings_env } from '../settings'
import { deploy_source, deploy_destination } from '../deployer'
import * as path from 'path'

export default function () {
  let settings = load_settings_env(process.cwd())
  if (settings) {
    if (Array.isArray(settings)) {
      console.error('Error on lines: ')
      console.error(JSON.stringify(settings))
    } else {
      (async function () {
        if (settings.protocol.src_fn_name) {
          await deploy_source(path.join(process.cwd(), 'src'), false, '', settings.protocol.src_fn_name, settings.protocol.work_slug, settings.server.jwt_token)
          console.log('Deployed source ' + settings.protocol.src_fn_name)
        }
        if (settings.protocol.dest_fn_name) {
          await deploy_destination(path.join(process.cwd(), 'src'), false, '', settings.protocol.dest_fn_name, settings.protocol.work_slug, settings.server.jwt_token)
          console.log('Deployed destination ' + settings.protocol.dest_fn_name)
        }
      })()
    }
  }
}
