<template>
  <div class="vss-app">

    <transition name="fade">
      <router-view></router-view>
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
      feedUid: getQueryString('feedUid'),
      feedId: getQueryString('feedId'),
      shareSign: getQueryString('shareSign'),
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
    }),
  },

  async created () {
    await this.getUserInfo()
  },

  async mounted () {
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
    ]),
    // async getUserInfo () {
    //   const userMsg = await sdk.getLoginMsg()

    //   alert(JSON.stringify(userMsg))

    //   const positionMsg = sdk.position()

    //   alert(JSON.stringify(positionMsg))
    // },
  },
}

const getQueryString = (name, url) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const u = url ? new URL(url) : window.location
  const r = u.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])

  return null
}
</script>
