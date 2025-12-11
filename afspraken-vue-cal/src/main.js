import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vue-cal/dist/vuecal.css' // CSS voor vue-cal

createApp(App)
  .use(router)
  .mount('#app')
