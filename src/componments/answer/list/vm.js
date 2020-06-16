
import {
  mapState,
  mapMutations,
} from 'vuex'

import {
  SET_LOADING,
} from 'module/answer/store/mutations-type'

import {
  GETLIST,
} from 'module/answer/interface'

import mockData from './mock'

export default {
  name: 'List',

  mixins: [],

  components: {

  },

  data () {
    return {
      result: ['a'],
      // list: [],
      list: mockData,
      params: [],
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
    }),
  },

  async created () {
    this.params = this.getParams(this.list)
    // await this.search()
  },

  async mounted () {
    this.$nextTick(() => {
    })
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
    ]),
    async search () {
      if (this.getting) return

      this.getting = true

      this[SET_LOADING](true)
      const {data: {gasList}} = await this.$axios.get(
        GETLIST,
        // params,
        {
          params: this.params,
          headers: {
            token: this.tokenId,
          },
        },
      ).finally((e) => {
        this.getting = false
        this[SET_LOADING](false)
      })

      this.list = this.list.concat(gasList)
    },
    getParams (list = []) {
      return list.map(item => {
        return {
          checked: '',
          checkList: [],
          text: '',
        }
      })
    },
    // 单选-值
    // singleValue ({id}, index) {
    //   const param = this.params[index]

    //   return id === param.checked
    // },
    // singleOptionClick ({id}, index) {
    //   const param = this.params[index]

    //   param.checked = id
    // },
    // 多选控制
    disabledOption ({id}, index) {
      // const item = this.list[index]
      // const param = this.params[index]

      // return item.max <= 0
      //   ? false
      //   : param.checked.length < item.max
      //     ? false
      //     : param.checked.indexOf(id) < 0
    },
    optionHandler ({id}, index) {
      // const item = this.list[index]
      // const param = this.params[index]

      // if (!(item.max > 0 && param.checked.length >= item.max)) return

      // param.checked = [id]
      // // this.$set(param, 'checked', [id])
    },

    getIndex ({id}, index) {
      const checkList = this.params[index].checkList

      return checkList.findIndex(item => item === id)
    },
  },
}
