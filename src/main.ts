import { createApp } from 'vue'
import './style.css'
import 'vuetify/styles'
import { registerPlugins } from './plugins'
import App from './App.vue'

const app = createApp(App)
registerPlugins(app)
app.mount('#app')