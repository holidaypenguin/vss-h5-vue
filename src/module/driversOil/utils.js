
import {mapState} from 'vuex'

import setTitle from 'utils/setTitle'
import ModalHelper from 'common/modalHelper'

import Sdk from './sdk'

import {
  SET_LOADING,
  SET_LOADING_NEXT,
  SET_TITLE,
  SET_USERINFO,
  SET_TOKEN,
} from './store/mutations-type'

import {
  GETLOGIN,
} from './interface'

export default {
  // beforeRouteEnter (to, from, next) {
  //   // console.log('-----------------beforeRouteEnter------------------')
  //   setTitle((to.meta && to.meta.title) || '')
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
      tokenId: state => state.tokenId,
      source: state => state.source,
      userInfo: state => state.userInfo,
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
    async getUserToken () {
      const tokenMsg = await Sdk.getLoginParam()

      this.$store.commit(SET_TOKEN, tokenMsg)

      // alert(`用户token：${JSON.stringify(tokenMsg)}`)
    },

    async getUserInfo () {
      // eslint-disable-next-line no-console
      console.log('--getUserInfo--', this.tokenId)
      if (!this.tokenId) {
        // eslint-disable-next-line no-console
        console.log('--无有效token')

        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject()
      }

      // eslint-disable-next-line no-console
      console.log('获取登录信息~~start')
      const userInfoMsg = await this.$axiosForm.post(
        GETLOGIN,
        {},
        {
          headers: {
            token: this.tokenId,
          },
        },
      ).catch((e) => {
        // 请您绑定手机号
        if (e.data.code === 10029) {
          this.$store.commit(SET_USERINFO, false)

          return Promise.resolve(e.data.msg)
        }
        // 会话无效，请重新登录
        if (e.data.code === 10008) {
          this.$store.commit(SET_TOKEN, '')
          this.$store.commit(SET_USERINFO, false)

          return Promise.resolve(e.data.msg)
        }

        return Promise.reject(e)
      })

      if (typeof userInfoMsg === 'string') {
        return Promise.reject(userInfoMsg)
      }
      this.$store.commit(SET_USERINFO, userInfoMsg.data)
    },
    async toLogin () {
      const tokenMsg = await Sdk.toLogin()
      // alert(`中途登录token：${JSON.stringify(tokenMsg)}`)

      this.$store.commit(SET_TOKEN, tokenMsg)

      await this.getUserInfo()
      // alert(`中途登录信息：${JSON.stringify(tokenMsg)}`)
    },

    async toBind () {
      await Sdk.toBind()

      await this.getUserInfo()
    },

    async nativeBack () {
      await Sdk.nativeBack(this.$router)
    },
  },
}
