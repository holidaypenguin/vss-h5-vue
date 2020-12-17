import {
  SET_LOGIN,
  SET_LOADING,
  SET_TOKEN,
  SET_LOADING_NEXT,
  SET_TITLE,
  SET_USERINFO,
  SET_COINNUM,
  SET_PID,
  SET_OID,
} from './mutations-type'
export default {
  [SET_LOGIN] (state, isLogin) {
    state.login = isLogin
  },
  [SET_LOADING] (state, isLoading) {
    state.loading = isLoading
  },
  [SET_TOKEN] (state, tokenId) {
    state.tokenId = tokenId
    localStorage.setItem('tokenId', tokenId)
  },
  [SET_LOADING_NEXT] (state, isLoadingNext) {
    state.loadingNext = isLoadingNext
  },
  [SET_TITLE] (state, title) {
    state.title = title
  },
  [SET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [SET_COINNUM] (state, coinNum) {
    state.coinNum = coinNum || 0
  },
  [SET_PID] (state, pid) {
    state.pid = pid
  },
  [SET_OID] (state, oid) {
    state.oid = oid
  },
}
