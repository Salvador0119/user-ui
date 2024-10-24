// // router/index.js

// import Vue from 'vue';
// import Router from 'vue-router';
// import AdminPage from '@/views/AdminPage.vue';
// import store from '@/store'; // Assuming you're using Vuex to store user state

// Vue.use(Router);

// const router = new Router({
//   routes: [
//     {
//       path: '/admin',
//       name: 'AdminPage',
//       component: AdminPage,
//       meta: { requiresAuth: true, role: 'admin' },
//     },
//     // Other routes...
//   ],
// });

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = store.getters['auth/isAuthenticated'];
//   const userRole = store.getters['auth/userRole'];

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next({ path: '/login' });
//     } else if (to.meta.role && to.meta.role !== userRole) {
//       next({ path: '/unauthorized' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

// export default router;











import Vue from 'vue';
import Router from 'vue-router';
import AdminDashboard from './views/AdminDashboard.vue';
import CashierPage from './views/CashierPage.vue';
import MechanicPage from './views/MechanicPage.vue';
import Login from './views/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, role: 'admin' },
    },
    {
      path: '/cashier-page',
      name: 'cashier-page',
      component: CashierPage,
      meta: { requiresAuth: true, role: 'cashier' },
    },
    {
      path: '/mechanic-page',
      name: 'mechanic-page',
      component: MechanicPage,
      meta: { requiresAuth: true, role: 'mechanic' },
    },
  ],
});

// Navigation guard to restrict access based on roles
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwt');
  const userRole = localStorage.getItem('role');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'login' });
    } else if (to.meta.role && to.meta.role !== userRole) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
