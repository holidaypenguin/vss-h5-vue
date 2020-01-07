import VanDropdownMenu from 'vant/lib/dropdown-menu'
import 'vant/lib/dropdown-menu/style'
import VanDropdownItem from 'vant/lib/dropdown-item'
import 'vant/lib/dropdown-item/style'

export default {
  name: 'IndexTop',

  components: {
    VanDropdownMenu,
    VanDropdownItem,
  },

  data () {
    return {
      sortOpts: [
        {text: '距离优先', value: 1},
        {text: '价格优先', value: 2},
      ],
      oilNoOpts: [
        {text: '92号汽油', value: 92},
        {text: '95号汽油', value: 95},
        {text: '98号汽油', value: 98},
        {text: '0号柴油', value: 0},
      ],
      params: {
        sort: 1,
        oilNo: 92,
      },
    }
  },

  computed: {
  },

  async created () {
  },

  methods: {
    async sortChangeHandler () {
      // await this.search()
      this.$emit('sort-change', this.params.sort)
    },
    async oilNoChangeHandler () {
      // await this.search()
      this.$emit('oilNo-change', this.params.oilNo)
    },
  },
}
