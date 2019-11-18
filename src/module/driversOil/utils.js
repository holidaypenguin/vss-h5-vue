
import {mapState} from 'vuex'

import setTitle from 'utils/setTitle'
import ModalHelper from 'common/modalHelper'

import {
  SET_LOADING,
  SET_LOADING_NEXT,
  SET_TITLE,
} from './store/mutations-type'

export default {
  // beforeRouteEnter (to, from, next) {
  //   // console.log('-----------------beforeRouteEnter------------------')
  //   setTitle((to.meta && to.meta.title) || '积多多福利社')
  //   next()
  // },
  data () {
    return {
      ModalHelper,
      title: '',
    }
  },
  computed: {
    ...mapState({
      source: state => state.source,
    }),
  },
  created () {
    this.$store.commit(SET_LOADING_NEXT, false)
    this.$store.commit(SET_LOADING, false)
    this.title = this.getTitle()
    this.setTitle()
  },
  mounted () {
  },
  activated () {
    this.title && this.setTitle()
  },
  methods: {
    setTitle () {
      this.$store.commit(SET_TITLE, this.title)
      setTitle(this.title)
    },
    getTitle () {
      const currentRoute = this.$router.currentRoute

      return (currentRoute.meta && currentRoute.meta.title) || this.defaultTitle || ''
    },
  },
}
