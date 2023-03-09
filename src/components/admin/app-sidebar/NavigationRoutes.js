import Vue from 'vue'
import vueResource from 'vue-resource'

Vue.use(vueResource)
var routes_data = [
  {
    name: 'dashboard',
    displayName: 'Dashboard',
    meta: {
      iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      authorize: ['ADMIN', 'RESELLER', 'OPERATOR', 'CMS_MANAGER', 'FINANCE', 'SALES', 'SUPPORT', 'ADVANCED_SUPPORT'],
      flag: [],
    },
  },
  {
    name: 'user',
    displayName: 'User',
    meta: {
      iconClass: 'fa fa-users',
      authorize: ['ADMIN', 'RESELLER', 'OPERATOR', 'CMS_MANAGER', 'FINANCE', 'SALES', 'SUPPORT', 'ADVANCED_SUPPORT'],
      flag: [],
    },
  },
  {
    name: 'inventory',
    displayName: 'Inventory',
    meta: {
      iconClass: 'fa fa-briefcase',
      authorize: ['ADMIN', 'RESELLER', 'OPERATOR', 'CMS_MANAGER', 'FINANCE', 'SALES', 'SUPPORT', 'ADVANCED_SUPPORT'],
      flag: [],
    },
  },
  {
    name: 'transactions',
    displayName: 'Transactions',
    meta: {
      iconClass:'fa fa-exchange',
      authorize: ['ADMIN', 'RESELLER', 'OPERATOR', 'CMS_MANAGER', 'FINANCE', 'SALES', 'SUPPORT', 'ADVANCED_SUPPORT'],
      flag: [],
    },
  },
  // {
  //   name: 'quotations',
  //   displayName: 'Quotations',
  //   meta: {
  //     iconClass: 'fa fa-users',
  //     authorize: ['ADMIN', 'RESELLER', 'OPERATOR', 'CMS_MANAGER', 'FINANCE', 'SALES', 'SUPPORT', 'ADVANCED_SUPPORT'],
  //     flag: [],
  //   },
  // },
  // {
  //   name: 'all_documents',
  //   displayName: 'All Documents',
  //   meta: {
  //     iconClass: 'fa fa-users',
  //     authorize: ['ADMIN', 'RESELLER', 'OPERATOR', 'CMS_MANAGER', 'FINANCE', 'SALES', 'SUPPORT', 'ADVANCED_SUPPORT'],
  //     flag: [],
  //   },
  // },
  {
    name: 'payments',
    displayName: 'Payments',
    meta: {
      iconClass: 'fa fa-inr',
      authorize: ['ADMIN', 'RESELLER', 'OPERATOR', 'CMS_MANAGER', 'FINANCE', 'SALES', 'SUPPORT', 'ADVANCED_SUPPORT'],
      flag: [],
    },
  },
  // {
  //   name: 'buy_and_suppliers',
  //   displayName: 'Buys & Suppliers ',
  //   meta: {
  //     iconClass: 'fa fa-users',
  //     authorize: ['ADMIN', 'RESELLER', 'OPERATOR', 'CMS_MANAGER', 'FINANCE', 'SALES', 'SUPPORT', 'ADVANCED_SUPPORT'],
  //     flag: [],
  //   },
  // },
  // {
  //   name: 'business_intelligence',
  //   displayName: 'Business Intelligence',
  //   meta: {
  //     iconClass: 'fa fa-user-o',
  //     authorize: ['ADMIN', 'RESELLER', 'OPERATOR', 'CMS_MANAGER', 'FINANCE', 'SALES', 'SUPPORT', 'ADVANCED_SUPPORT'],
  //     flag: [],
  //   },
  // },
  {
    name: 'reports',
    displayName: 'Reports',
    meta: {
      iconClass: 'fa fa-users',
      authorize: ['ADMIN', 'RESELLER', 'OPERATOR', 'CMS_MANAGER', 'FINANCE', 'SALES', 'SUPPORT', 'ADVANCED_SUPPORT'],
      flag: [],
    },
  },
  // {
  //   name: 'settings',
  //   displayName: 'Settings',
  //   meta: {
  //     iconClass: 'fa fa-cog',
  //     authorize: ['ADMIN', 'RESELLER', 'OPERATOR', 'CMS_MANAGER', 'FINANCE', 'SALES', 'SUPPORT', 'ADVANCED_SUPPORT'],
  //     flag: [],
  //   },
  // }

]

export const getNavigationRoutes = () => {
  return routes_data
}

var navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: getNavigationRoutes(),
  routes_copy: routes_data,
}

export { navigationRoutes }
