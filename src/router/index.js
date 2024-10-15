import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import SignIn from '@/components/SignIn.vue';
import SendOTP from '@/components/SendOTP.vue';
import VerifyOTP from '@/components/VerifyOTP.vue';
import SignUp from '@/components/SignUp.vue';
import ForgotPassword from '@/components/ForgotPassword.vue'; 
import AboutUs from '@/components/AboutUs.vue';
import BookAppointment from '@/components/BookAppointment.vue';
import UserProfile from '@/components/UserProfile.vue';

import AdminDashboard from '@/components/admin/AdminDashboard.vue';
import EmployeeDashboard from '@/components/employee/EmployeeDashboard.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/send-otp',
    name: 'SendOTP',
    component: SendOTP,
  },
  {
    path: '/verify-otp',
    name: 'VerifyOTP',
    component: VerifyOTP,
  },
  { 
    path: '/forgot-password', 
    name: 'ForgotPassword',
    component:  ForgotPassword,
  },
  { 
    path: '/about-us', 
    name: 'AboutUs',
    component: AboutUs 
  },
  { 
    path: '/appointment', 
    name: 'Appointment',
    component:  BookAppointment,
  },
  { 
    path: '/profile',
    name: 'Profile',
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  { 
    path: '/admin/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  
  { 
    path: '/employee/employee-dashboard',
    name: 'EmployeeDashboard',
    component: EmployeeDashboard,
    meta: { requiresAuth: true },
  },

];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Global Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn && localStorage.getItem('isLoggedIn') === 'true') {
    authStore.initialize();
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/sign-in');
  } else {
    next();
  }
});

export default router;