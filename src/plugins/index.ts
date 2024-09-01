import { App } from 'vue'
import { registerVuetify } from './vuetify'

export function registerPlugins(app: App) {
    registerVuetify(app)
}