
import {
  mapState,
  mapMutations,
} from 'vuex'

import {
  SET_LOADING,
} from 'module/answer/store/mutations-type'

import {
  GETLIST,
  SUBMIT,
} from 'module/answer/interface'

import CInput from './cInput'

// import mockData from './mock'
import {realData1} from './mock'

import panel from '../panel'

export default {
  name: 'List',

  mixins: [],

  components: {
    CInput,
    panel,
  },

  props: {
    // pid: {
    //   default: '',
    //   type: String,
    // },
  },

  data () {
    return {
      list: [],
      // listLength: 0,
      // list1: mockData,
      params: [],
      currentIndex: 0,
      kindOpts: [
        {value: '1', label: '单选题'},
        {value: '2', label: '多选题'},
        {value: '3', label: '判断题'},
        {value: '4', label: '填空题'},
        {value: '5', label: '排序题'},
      ],
      msgOpts: [
        {value: '1', label: '仅限选择一项，请您认真请选择'},
        {value: '2', label: ''},
        {value: '3', label: '仅限选择一项，请您认真请选择'},
        {value: '4', label: '点击蓝色空白部分即可填写，请您认真填写'},
        {value: '5', label: ''},
      ],
      submiting: false,
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
      pid: state => state.pid,
      oid: state => state.oid,
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
    await this.search()
    // this.searchMock()
  },

  async mounted () {
    this.$nextTick(() => {
      // setTimeout(() => {
      //   this.list = mockData
      //   // this.listLength = mockData.length
      //   this.params = this.getParams(this.list)
      // }, 2000)
    })
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
    ]),
    // 获取题目
    async search () {
      if (this.getting) return

      this.getting = true

      this[SET_LOADING](true)
      const {data = []} = await this.$axios.post(
        GETLIST,
        {},
        {
          params: {
            pid: this.pid,
          },
          headers: {
            // token: this.tokenId,
          },
        },
      ).finally((e) => {
        this.getting = false
        this[SET_LOADING](false)
      })

      this.list = data
      this.params = this.getParams(this.list)
    },
    searchMock () {
      const {data = []} = realData1
      this.list = data
      this.params = this.getParams(this.list)
    },
    // 初始化答案
    getParams (list = []) {
      return list.map((item, index) => {
        return {
          checked: '',
          checkList: [],
          text: '',
          fromIndex: undefined, // 从哪个题跳转过来
          isReply: index === 0, // 是否作答，第一题默认作答
          error: '',
          id: item.id,
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
      // if (this.isEnd) return

      const item = this.list[this.currentIndex]
      const param = this.params[this.currentIndex]
      param.error = ''

      // 题目类型
      const kind = Number(item.kind)
      // 第一个选项
      let option
      // 最大值
      let max
      // 最小值
      let min
      // 选项填空类型
      let optionKind

      switch (kind) {
        case 1:
        case 3:
          option = item.options.find(i => i.id === param.checked)
          break
        case 2:
        case 5:
          if (param.checkList.length >= 1) {
            option = item.options.find(i => i.id === param.checkList[0])
          }
          break
        default:
      }

      switch (kind) {
        case 1:
        case 2:
        case 3:
        case 5:
          if (!option || (option.regulars && !param.text)) {
            this.$toast('请答题')

            return
          }
          min = option.regulars && option.regulars[0].minval
          max = option.regulars && option.regulars[0].maxval
          optionKind = Number(option.regulars && option.regulars[0].kind)

          if (option.regulars && min > 0) {
            this.validateText(optionKind, max, min, param, '选项')
          } else if (option.jump) {
            const index = this.list.findIndex(i => i.order === option.jump)

            if (index > -1) {
              this.params[index].fromIndex = this.currentIndex
              this.params[index].isReply = true
              this.currentIndex = index
            }
          } else if (
            option.mute === 2 &&
            item.min > 0 &&
            (Number(item.kind) === 2 || Number(item.kind) === 5) &&
            item.min > param.checkList.length) {
            // 非互斥、最小选项个数大于0,、多选，提示最少选择个数提示
            this.$toast(`当前题目至少选择${item.min}个选项`)
          } else {
            this.toNext()
          }
          break
        case 4:
          max = item.regulars && item.regulars[0].maxval
          min = item.regulars && item.regulars[0].minval
          optionKind = Number(item.regulars && item.regulars[0].kind)

          if (!param.text) {
            this.$toast('请答题')
          } else if (item.regulars && min > 0) {
            this.validateText(optionKind, max, min, param, '题目')
          } else {
            this.toNext()
          }
          break
        default:
      }
    },

    validateText (optionKind, max, min, param, msg = '') {
      // 1字符串2整数3浮点数4日期
      switch (optionKind) {
        case 1:
          if (min > param.text.length) {
            this.$toast(`当前${msg}请至少输入${min}个文字`)

            return
          }
          this.toNext()
          break
        case 2:
        case 3:
          if (Number(min) > Number(param.text)) {
            this.$toast(`当前${msg}请输入大于${min}的数`)

            return
          }
          if (Number(max) < Number(param.text)) {
            this.$toast(`当前${msg}请输入小于${max}的数`)

            return
          }
          this.toNext()
          break
        case 4:
        default:
          this.toNext()
      }
    },

    async toNext () {
      if (this.isEnd) {
        await this.commitHandler()

        return
      }
      this.currentIndex++
      this.params[this.currentIndex].fromIndex = undefined
      this.params[this.currentIndex].isReply = true

      this.$refs.wrap.scrollTo(0, 0)
    },
    // 单选改变
    singleChangeHandler (index) {
      this.params[index].text = ''
    },
    // 排序改变
    orderchangeHandler (index) {
      this.params[index].text = ''
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
    // 选项操作ID 选项点击事件比change事件晚
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
      this.params[index].text = ''

      // if (param.checkList.findIndex(id => id === this.optionId) < 1) return

      const firstOption = item.options.find(option => option.id === param.checkList[0])
      const lastOption = item.options
        .find(option => option.id === param.checkList[param.checkList.length - 1])

      if (firstOption.mute !== lastOption.mute) {
        param.checkList = [lastOption.id]
      }
    },
    // 获得排序序号
    getIndex ({id}, index) {
      const checkList = this.params[index].checkList

      return checkList.findIndex(item => item === id)
    },

    async commitHandler () {
      const params = this.params
        .filter(param => param.isReply)
        .map(param => {
          const item = this.list.find(item => item.id === param.id)
          const p = {}
          let options
          let option
          // console.log('操作', param, '题目', item)

          switch (item.kind) {
            case '1': // 单选
            case '3': // 判断
              option = item.options.find(oitem => oitem.id === param.checked)
              // console.log('单选选项', option)

              p.id = param.id
              p.order = param.order
              p.options = []
              p.options[0] = {
                order: option.order,
                content: option.regulars ? param.text : '',
              }

              break
            case '2': // 多选
            case '5': // 排序
              // options = item.options.filter(oitem => param.checkList.indexOf(oitem.id) >= 0)
              options = param.checkList
                .map(citem => item.options.filter(oitem => oitem.id === citem)[0])
              // console.log('多选选项', options)

              p.id = param.id
              p.order = param.order
              p.options = options.map(option => {
                return {
                  order: option.order,
                  content: option.regulars ? param.text : '',
                }
              })
              break
            case '4': // 填空
              p.id = param.id
              p.order = param.order
              p.options = [{
                content: param.text,
              }]
              break
            default:
          }

          return p
        })

      if (params.length < 1 || this.submiting) return

      this.submiting = true

      this[SET_LOADING](true)
      await this.$axios.post(
        SUBMIT,
        {
          paperid: this.pid,
          openid: this.oid,
          data: params,
        },
      ).finally((e) => {
        this.submiting = false
        this[SET_LOADING](false)
      })

      this.$router.replace({
        name: 'success',
      })
    },
  },
}
