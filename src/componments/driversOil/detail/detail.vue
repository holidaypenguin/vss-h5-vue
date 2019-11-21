<template>
  <div class="p-detail">

    <Nav :title="title" type="help"
      @back="backHandler"></Nav>

  </div>
</template>

<script>
import Utils from '@/module/driversOil/utils'
import Nav from '../nav/nav.vue'
export default {
  name: 'Detail',

  mixins: [Utils],

  components: {
    Nav,
  },

  data () {
    return {
      title: '加油优惠',
    }
  },

  computed: {
  },

  async created () {
  },

  async mounted () {

  },

  methods: {
    backHandler () {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="postcss">
@n p{
  @b detail{
    overflow: auto;

  }
}
</style>
