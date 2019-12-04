<template>
  <div class="vss-app">

    <transition name="fade">

      <router-view
        v-if="isNotNeedLogin"></router-view>
      <router-view
        v-if="!isNotNeedLogin && userInfo"></router-view>
    </transition>
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      color="#00BE06"
      loader="bars"
      :opacity="0.3"
      :z-index="99999"
    ></loading>

  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import {
  mapState,
  mapMutations,
} from 'vuex'

import {
  // SET_LOGIN,
  SET_LOADING,
  SET_USERINFO,
  // SET_TOKEN,
} from './store/mutations-type'

import utils from './utils'

export default {
  name: 'VssApp',

  mixins: [utils],

  components: {
    Loading,
  },

  data () {
    return {
      routerName: '',
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
    }),
    isNotNeedLogin () {
      return this.routerName === 'index' || this.routerName === 'help'
    },
  },

  async created () {
    await this.getUserToken()
    await this.getUserInfo()
  },

  async mounted () {
    this.routerChange()
    this.routerName = this.$router && this.$router.currentRoute.name
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
      SET_USERINFO,
    ]),
    routerChange () {
      if (!this.$router) return

      this.$router.afterEach((to, from) => {
        this.routerName = to.name
      })
    },
  },
}

// const getQueryString = (name, url) => {
//   const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
//   const u = url ? new URL(url) : window.location
//   const r = u.search.substr(1).match(reg)
//   if (r != null) return decodeURIComponent(r[2])

//   return null
// }
</script>
