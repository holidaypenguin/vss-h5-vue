
// import {
//   SET_LOADING,
// } from '../../../module/douli/store/mutations-type'

import Masonry from 'masonry-layout'
import RyListCommon from '../../common/jiduoduo/ryList/ryList2.vue'
import Utils from '../common/utils'

export default {

  mixins: [RyListCommon, Utils],

  components: {
  },

  data () {
    return {
      code: '',
      msnryEl: undefined,
    }
  },

  mounted () {

  },
  methods: {

    afterMethods () {
      this.$nextTick(() => {
        this.setMasonryLayout()
      })
    },

    setMasonryLayout () {
      // console.log('--setMasonryLayout--')
      // if (this.msnry) {
      //   this.msnry.needsResizeLayout()
      // } else {
      window.msnry = this.msnry = new Masonry('.ry-list', {
        itemSelector: '.ry-item-wrap',
        columnWidth: parseInt(this.$refs.list.clientWidth / 2, 10), // 当有宽度有小数位时，会自动进一位，因此减去1
        resize: false,
        // resizeContainer: false,
      })
      // console.log(this.msnry)
      // }
    },
  },
  destroyed () {
  },
}
