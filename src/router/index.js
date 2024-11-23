import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/base/HomePage.vue';
import SignIn from '@/components/login/SignIn.vue';
import SendOTP from '@/components/login/SendOTP.vue';
import VerifyOTP from '@/components/login/VerifyOTP.vue';
import SignUp from '@/components/login/SignUp.vue';
import ForgotPassword from '@/components/login/ForgotPassword.vue'; 
import AboutUs from '@/components/base/AboutUs.vue';
import BookingPage from '@/components/base/BookingPage.vue';
import BookDoctor from '@/components/BookDoctor.vue';
import BookDoctorPage from '@/components/BookDoctorPage.vue';
import BookService from '@/components/BookService.vue';

import UserProfile from '@/components/profile/UserProfile.vue';
import DoctorDetail from '@/components/DoctorDetail.vue';

import ChangePassword from '@/components/profile/ChangePassword.vue';
import HistoryBooking from '@/components/profile/HistoryBooking.vue';
import BookingSuccessPage from '@/components/BookingSuccessPage.vue';


import AdminDashboard from '@/components/admin/AdminDashboard.vue';
import PatientManagement from '@/components/admin/PatientManagement.vue';
import DoctorManagement from '@/components/admin/DoctorManagement.vue';
import EmployeeManagement from '@/components/admin/EmployeeManagement.vue';
import DepartmentManagement from '@/components/admin/DepartmentManagement.vue';
import ServiceManagement from '@/components/admin/ServiceManagement.vue';
import AddService from '@/components/admin/AddService.vue';
import AddDepartment from '@/components/admin/AddDepartment.vue';

import EmployeeDashboard from '@/components/employee/EmployeeDashboard.vue';
import AddDoctorService from '@/components/employee/AddDoctorService.vue';
import TimeOffManagement from '@/components/employee/TimeOffManagement.vue';
import TimeworkManagement from '@/components/employee/TimeworkManagement.vue';
import ListDoctorServices from '@/components/employee/ListDoctorServices.vue';

import DoctorDashboard from '@/components/doctor/DoctorDashboard.vue';
import ScheduleManagement from '@/components/doctor/ScheduleManagement.vue';
import NextAppointments from '@/components/doctor/NextAppointments.vue';
import BusyManagement from '@/components/doctor/BusyManagement.vue';
import AppointmentDetail from '@/components/doctor/AppointmentDetail.vue';

import NotFound from '@/components/tools/NotFound.vue';
import TestVue from '@/components/tools/TestVue.vue';
import TestUploadImage from '@/components/tools/TestUploadImage.vue';
import TestUploadMultipleImages from '@/components/tools/TestUploadMultipleImages.vue';

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
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: { requiresAuth: true },
  },
  {
    path: '/history-booking',
    name: 'HistoryBooking',
    component: HistoryBooking,
    meta: { requiresAuth: true },
  },
  { 
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    redirect: 'admin/user-management/patients',
    children: [
      {
        path: 'user-management/patients',
        component: PatientManagement,
        meta: { requiresAuth: true },
        // redirect: 'user-management/patients',
        
      },
      {
        path: 'user-management/doctors',
        component: DoctorManagement,
        meta: { requiresAuth: true },
        // redirect: 'user-management/doctors',',
        
      },
      {
        path: 'user-management/employees',
        component: EmployeeManagement,
        meta: { requiresAuth: true },
        // redirect: 'user-management/doctors',',
        
      },
      {
        path: 'department-management',
        component: DepartmentManagement,
        meta: { requiresAuth: true },
      },
      {
        path: 'add-department',
        component: AddDepartment,
        meta: { requiresAuth: true },
      },
      {
        path: 'service-management',
        component: ServiceManagement,
        meta: { requiresAuth: true },
      },
      {
        path: 'add-service',
        component: AddService,
        meta: { requiresAuth: true },
      },
    ],
    meta: { requiresAuth: true },
  },
  
  { 
    path: '/employee',
    name: 'EmployeeDashboard',
    component: EmployeeDashboard,
    redirect: '/employee/timework-management',
    children: [
      {
        path: 'time-off-management',
        component: TimeOffManagement,
        meta: { requiresAuth: true },
      },
      {
        path: 'timework-management',
        component: TimeworkManagement,
        meta: { requiresAuth: true },
      },
      {
        path: 'add-doctor-service',
        component: AddDoctorService,
        meta: { requiresAuth: true },
      },
      {
        path: 'list-services',
        component: ListDoctorServices,
        meta: { requiresAuth: true },
      },
    ]
    // meta: { requiresAuth: true },
  },

  { 
    path: '/doctor',
    name: 'DoctorDashboard',
    component: DoctorDashboard,
    redirect: '/doctor/next-appointments',
    children: [
      {
        path: 'next-appointments',
        component: NextAppointments,
        meta: { requiresAuth: true },
      },
      {
        path: 'next-appointments/:id',  
        name: 'AppointmentDetail',
        component: AppointmentDetail,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: 'schedule',
        component: ScheduleManagement,
        meta: { requiresAuth: true },
      },
      {
        path: 'busy',
        component: BusyManagement,
        meta: { requiresAuth: true },
      },
    ],
    // meta: { requiresAuth: true },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },

  {
    path: '/test',
    name: 'TestVue',
    component: TestVue,
  },

  {
    path: '/upload',
    name: 'TestUploadImage',
    component: TestUploadImage,
  },

  {
    path: '/multiple-upload',
    name: 'TestUploadMultipleImages',
    component: TestUploadMultipleImages,
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