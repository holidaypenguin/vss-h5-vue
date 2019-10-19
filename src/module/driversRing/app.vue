<template>
  <div class="vss-app">
    esefse
  </div>
</template>
<script>

export default {
  name: 'VssApp',

  components: {
  },

  data () {
    return {
      msgError: false,
      loginError: false,
    }
  },

  computed: {
  },

  mounted () {
  },

  methods: {

  },

  /**
   * 监听子组件错误
   */
  errorCaptured (err, vm, info) {
    if (err && Object.prototype.toString.call(err.request) === '[object XMLHttpRequest]') {
      if (err.request.status === 200) {
        if (err.data && err.data.meta) {
          if (parseInt(err.data.meta.errno, 10) !== 0) {
            // err.data.meta.msg && this.$toast(err.data.meta.msg)
          }
        }
      } else {
        // this.$toast('请求失败')
      }
    }
    // eslint-disable-next-line no-console
    console.warn(err)
    if (err) {
      // this.$store.commit(SET_LOADING, false)
    }

    return false
  },
}
</script>

<style lang="postcss">
@n vss{
  @b app{
  }
}
</style>
