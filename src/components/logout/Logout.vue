<template>

</template>

<script>
import config from '../../i18n/en'
import Vue from 'vue'
import vueResource from 'vue-resource'
Vue.use(vueResource)

export default {
  name: 'logout',
  created () {
    this.$router.push({ name: 'login' })
    this.$router.go({ name: 'login' })
  },
  data () {
    return {
      from: null,
    }
  },
}
</script>
