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
      iconClass: 'fa fa-users',
      authorize: ['ADMIN', 'RESELLER', 'OPERATOR', 'CMS_MANAGER', 'FINANCE', 'SALES', 'SUPPORT', 'ADVANCED_SUPPORT'],
      flag: [],
    },
  }
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
