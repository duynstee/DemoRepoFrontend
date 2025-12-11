import { createRouter, createWebHistory } from 'vue-router'
import AgendaPage from '../views/AgendaPage.vue'
import CreateAppointmentPage from '../views/CreateAppointmentPage.vue'

const routes = [
  { path: '/', component: AgendaPage },
  { path: '/create-appointment', component: CreateAppointmentPage }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
