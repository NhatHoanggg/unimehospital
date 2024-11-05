import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import SignIn from '@/components/SignIn.vue';
import SendOTP from '@/components/SendOTP.vue';
import VerifyOTP from '@/components/VerifyOTP.vue';
import SignUp from '@/components/SignUp.vue';
import ForgotPassword from '@/components/ForgotPassword.vue'; 
import AboutUs from '@/components/AboutUs.vue';
import BookingPage from '@/components/BookingPage.vue';
import BookDoctor from '@/components/BookDoctor.vue';
import BookDoctorPage from '@/components/BookDoctorPage.vue';
import BookService from '@/components/BookService.vue';

import UserProfile from '@/components/UserProfile.vue';
import DoctorDetail from '@/components/DoctorDetail.vue';
import BookingSuccessPage from '@/components/BookingSuccessPage.vue';

import AdminDashboard from '@/components/admin/AdminDashboard.vue';
import UserManagement from '@/components/admin/UserManagement.vue';
import DepartmentManagement from '@/components/admin/DepartmentManagement.vue';
import ServiceManagement from '@/components/admin/ServiceManagement.vue';

import EmployeeDashboard from '@/components/employee/EmployeeDashboard.vue';

import NotFound from '@/components/NotFound.vue';

import { useAuthStore } from '@/stores/auth';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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
    path: '/booking', 
    name: 'Booking',
    component:  BookingPage,
    children: [
      {
        path: 'doctors',
        component: BookDoctor,
      },
      {
        path: 'services',
        component: BookService,
      },
    ],
  },

  {
    path: '/booking/doctors/:id', 
    name: 'DoctorDetail',
    component: DoctorDetail,
    props: true,
  },

  {
    path: '/booking/doctors/:id/booking-appointment', 
    name: 'BookDoctorPage',
    component: BookDoctorPage,
    props: true,
  },

  {
    path: '/booking-success',
    name: 'BookingSuccess',
    component: BookingSuccessPage,
    props: true,
    meta: { requiresAuth: true },
  },

  { 
    path: '/profile',
    name: 'Profile',
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  { 
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    redirect: '/admin/user-management',
    children: [
      {
        path: 'user-management',
        component: UserManagement,
        meta: { requiresAuth: true },
      },
      {
        path: 'department-management',
        component: DepartmentManagement,
        meta: { requiresAuth: true },
      },
      {
        path: 'service-management',
        component: ServiceManagement,
        meta: { requiresAuth: true },
      },
    ],
    meta: { requiresAuth: true },
  },
  
  { 
    path: '/employee/employee-dashboard',
    name: 'EmployeeDashboard',
    component: EmployeeDashboard,
    meta: { requiresAuth: true },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },

];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

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

router.afterEach((to, from) => {
  if (to.name === 'SignIn' && from.name === 'BookDoctorPage') {
    toast.warning('Yêu cầu đăng nhập để thực hiện', {
      rtl: false,
      limit: 3,
      position: toast.POSITION.TOP_RIGHT,
    });
  }
});

router.afterEach((to, from) => {
  if (to.name === 'Home' && from.name === 'SignIn') {
    toast('Đăng nhập thành công');
  }
});

router.afterEach((to, from) => {
  if (to.name === 'BookingSuccess' && from.name === 'BookDoctorPage') {
    toast.success('Đặt lịch hẹn thành công!', {
      rtl: false,
      limit: 3,
      position: toast.POSITION.TOP_RIGHT,
    });
  }
});

export default router;