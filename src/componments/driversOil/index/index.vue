<template>
  <div class="p-index">

    <Nav :title="title" type="index1"></Nav>

  </div>
</template>

<script>
import {
  mapState,
} from 'vuex'

import Utils from '@/module/driversOil/utils'
import Nav from '../nav/nav.vue'
export default {
  name: 'Index',

  mixins: [Utils],

  components: {
    Nav,
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
    }),
  },

  async created () {
  },

  async mounted () {
  },
}
</script>
