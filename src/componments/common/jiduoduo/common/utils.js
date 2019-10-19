/* eslint-disable no-console */
import setTitle from '../../../../public/utils/setTitle'
import {
  SET_LOADING,
  SET_LOADING_NEXT,
  SET_TITLE,
} from './mutations-type'

const ModalHelper = (function (bodyCls) {
  let scrollTop

  return {
    afterOpen () {
      scrollTop = document.scrollingElement.scrollTop
      document.body.classList.add(bodyCls)
      document.body.style.top = `${-scrollTop}px`
    },
    beforeClose () {
      document.body.classList.remove(bodyCls)
      document.scrollingElement.scrollTop = scrollTop
    },
  }
})('modal-open')

export default {
  // beforeRouteEnter (to, from, next) {
  //   // console.log('-----------------beforeRouteEnter------------------')
  //   setTitle((to.meta && to.meta.title) || '积多多福利社')
  //   next()
  // },
  data () {
    return {
      ModalHelper,
      title: '积多多福利社',
    }
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

      return (currentRoute.meta && currentRoute.meta.title) || '积多多福利社'
    },
  },
}
