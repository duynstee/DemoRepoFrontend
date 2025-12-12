import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import AgendaPage from '../views/AgendaPage.vue';
import { isLoggedIn } from '../services/authService';
import CreateAppointmentPage from '../views/CreateAppointmentPage.vue';
import PatientPage from '../views/PatientPage.vue';

const routes = [
  { path: '/login', name: 'Login', component: LoginPage },

  { 
    path: '/agenda', 
    name: 'Agenda', 
    component: AgendaPage,
    meta: { requiresAuth: true, role: 'Doctor' }
  },

  {
    path: '/appointment/new',
    name: 'NewAppointment',
    component: CreateAppointmentPage,
    meta: { requiresAuth: true, role: 'Doctor' }
  },

  {
    path: '/patient',
    name: 'PatientPortaal',
    component: PatientPage,
    meta: { requiresAuth: true, role: 'User' }
  },

  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Global route guard
router.beforeEach((to, from, next) => {
  const token = isLoggedIn();
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
