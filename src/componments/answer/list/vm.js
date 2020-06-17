
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
      list: [],
      // listLength: 0,
      // list1: mockData,
      params: [],
      currentIndex: 0,
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
    }),
    listLength () {
      return this.list.length
    },
    isFirst () {
      return this.currentIndex === 0
    },
    isEnd () {
      return this.listLength === (this.currentIndex + 1)
    },
  },

  async created () {
    // await this.search()
  },

  async mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.list = mockData
        // this.listLength = mockData.length
        this.params = this.getParams(this.list)
      }, 2000)
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
      return list.map((item, index) => {
        return {
          checked: '',
          checkList: [],
          text: '',
          fromIndex: undefined, // 从哪个题跳转过来
          isReply: index === 0, // 是否作答，第一天默认作答
        }
      })
    },
    // 上一题
    prepareHandler () {
      if (this.isFirst) return

      const param = this.params[this.currentIndex]
      if (param.fromIndex !== undefined) {
        this.currentIndex = param.fromIndex
      } else {
        this.currentIndex--
      }
      param.isReply = false
    },

    // 下一题
    nextHandler () {
      if (this.isEnd) return

      const item = this.list[this.currentIndex]
      const param = this.params[this.currentIndex]

      let option

      switch (item.kind) {
        case 1:
        case 3:
          option = item.optoins.find(i => i.id === param.checked)
          break
        case 2:
          if (param.checkList.length === 1) {
            option = item.optoins.find(i => i.id === param.checkList[0])
          }
          break
        default:
      }

      if (option && option.jump) {
        const index = this.list.findIndex(i => i.order === option.jump)

        if (index > -1) {
          this.params[index].fromIndex = this.currentIndex
          this.params[index].isReply = true
          this.currentIndex = index
        }
      } else {
        this.currentIndex++
        this.params[this.currentIndex].fromIndex = undefined
        this.params[this.currentIndex].isReply = true
      }
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
      const item = this.list[index]
      const param = this.params[index]

      return item.max <= 0
        ? false
        : param.checkList.length < item.max
          ? false
          : param.checkList.indexOf(id) < 0
    },
    // 选项操作ID
    optionHandler ({id}, index) {
      this.optionId = id
      // const item = this.list[index]
      // const param = this.params[index]

      // if (!(item.max > 0 && param.checkList.length >= item.max)) return

      // param.checkList = [id]
      // // this.$set(param, 'checkList', [id])
    },

    // 多选改变
    changeHandler (index) {
      const item = this.list[index]
      const param = this.params[index]

      if (param.checkList.findIndex(id => id === this.optionId) < 1) return

      const firstOption = item.optoins.find(option => option.id === param.checkList[0])
      const lastOption = item.optoins.find(option => option.id === this.optionId)
      if (firstOption.mute !== lastOption.mute) {
        param.checkList = [this.optionId]
      }
    },

    getIndex ({id}, index) {
      const checkList = this.params[index].checkList

      return checkList.findIndex(item => item === id)
    },

    commitHandler () {

    },
  },
}
