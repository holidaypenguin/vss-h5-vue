import {mapState} from 'vuex'

export default {
  name: 'RyHead',

  data () {
    return {
      firstRouteName: '',

      /**
       * 需要在router.afterEach中指定
       *
       * router.afterEach((to, from) => {
       *   elive.$children[0].$children[0].$data.currentRouteName = to.name
       * })
       */
      currentRouteName: '',
    }
  },

  computed: {
    ...mapState({
      title: state => state.title,
    }),
    isHomePage () {
      return '_list_my_'.indexOf(this.currentRouteName || this.firstRouteName) > 0
    },
    isShare () {
      return (this.currentRouteName || this.firstRouteName) === 'list'
    },
  },

  mounted () {
    this.firstRouteName = this.$route.name
  },

  methods: {
    _backHandler () {
      this.backHandler && this.backHandler()
    },
    _shareHandler () {
      this.shareHandler && this.shareHandler()
    },
  },
}
