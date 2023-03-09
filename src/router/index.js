import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../components/auth/AuthLayout'
import AppLayout from '../components/admin/AppLayout'
import Login from '../components/auth/login/Login.vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Router)
Vue.use(require('vue-cookies'))
//
const EmptyParentComponent = {
  template: '<router-view></router-view>',
}

function loginAuthGuard (to, from, next) {
  var accessToken = Vue.$cookies.get('x-access-token')
  if (accessToken) {
    Vue.$cookies.keys().forEach(cookie => Vue.$cookies.remove(cookie))
  }
  var isAuthenticated = localStorage.getItem('LoggedInUser')
  if (to.meta.isLoggedInCheck) {
    if (isAuthenticated) {
      next('/')
      return
    }
  }

  next()
}

function loginAuthcode (to, from, next) {
  next()
}

export default new Router({
  routes: [
    {
      path: '*',
      redirect: { name: 'login' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          meta: {
            isLoggedInCheck: true,
          },
          beforeEnter: loginAuthGuard,
          component: Login,
        },
        {
          name: 'signup',
          path: 'signup',
          meta: {
            isLoggedInCheck: true,
          },
          beforeEnter: loginAuthGuard,
          component: () => import('../components/auth/signup/Signup.vue'),
        },
        {
          name: 'recover-password',
          path: 'recover-password',
          meta: {
            isLoggedInCheck: true,
          },
          beforeEnter: loginAuthGuard,
          component: () => import('../components/auth/recover-password/RecoverPassword.vue'),
        },
        {
          path: '',
          redirect: { name: 'login' },
        },
      ],
    },
    {
      path: '/404',
      component: EmptyParentComponent,
      children: [],
    },
    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../components/dashboard/Dashboard.vue'),
          default: true,
        },
        {
          name: 'user',
          path: 'user',
          component: () => import('../components/user/User.vue'),
          children: [],
        },
        {
          name: 'inventory',
          path: 'inventory',
          component: () => import('../components/inventory/Inventory.vue'),
          children: [],
        },
        {
          name: 'transactions',
          path: 'Transactions',
          component: () => import('../components/transactions/Transaction.vue'),
          children: [],
        },
        {
          name: 'quotations',
          path: 'quotations',
          component: () => import('../components/quotations/Quotations.vue'),
          children: [],
        },
        {
          name: 'payments',
          path: 'payments',
          component: () => import('../components/payments/Payments.vue'),
          children: [],
        },
        {
          name: 'all_documents',
          path: 'all_documents',
          component: () => import('../components/all_documents/All_documents.vue'),
          children: [],
        },
        {
          name: 'buyers_and_suppliers',
          path: 'buyers_and_suppliers',
          component: () => import('../components/buyers_and_suppliers/Buyers_and_suppliers.vue'),
          children: [],
        },
        {
          name: 'business_intelligence',
          path: 'business_intelligence',
          component: () => import('../components/business_intelligence/Business_intelligence.vue'),
          children: [],
        },
        {
          name: 'settings',
          path: 'settings',
          component: () => import('../components/settings/Settings.vue'),
          children: [],
        },
        {
          name: 'logout',
          path: 'logout',
          props: true,
          component: () => import('../components/logout/Logout.vue'),
          children: [],
        },
      ],
    },
  ],
})
