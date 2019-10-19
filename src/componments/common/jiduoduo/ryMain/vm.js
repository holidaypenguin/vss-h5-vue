import {mapState} from 'vuex'
import Loading from 'vue-loading-overlay'

export default {

  name: 'RyMain',

  components: {
    Loading,
  },

  props: {
    query: {},
  },

  computed: {
    ...mapState({
      loadingNext: state => state.loadingNext,
    }),
  },
}
