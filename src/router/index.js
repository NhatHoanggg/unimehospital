import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import SignIn from '@/components/SignIn.vue';
import GioiThieu from '@/components/GioiThieu.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  { 
    path: '/gioi-thieu', 
    name: 'GioiThieu',
    component: GioiThieu },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;