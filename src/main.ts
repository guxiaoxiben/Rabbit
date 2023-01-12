import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'normalize.css'
import '@/assets/styles/common.less'
import router from '@/router'
import XtxUI from './components'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(XtxUI)
app.mount('#app')
