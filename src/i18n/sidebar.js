import { navigationRoutes } from '../components/admin/app-sidebar/NavigationRoutes'
import Vue from 'vue'
import vueResource from 'vue-resource'
Vue.use(vueResource)

export var sidebar = function () {
  var role = Vue.$cookies.get('roles')
  var navigation_routes = []
  navigation_routes = navigationRoutes.routes_copy
  var user_role = role
  var routes_data_by_role = []
  for (var i = 0; i < navigation_routes.length; i++) {
    var prop = navigation_routes[i]
    var item = prop.meta
    if (item.authorize.includes(user_role)) {
        routes_data_by_role.push(prop)
    }
  }
  return navigationRoutes.routes = routes_data_by_role
}
