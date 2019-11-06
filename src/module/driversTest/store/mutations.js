import {
  SET_LOGIN,
  SET_LOADING,
  SET_TOKEN,
  SET_LOADING_NEXT,
  SET_TITLE,
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
}
