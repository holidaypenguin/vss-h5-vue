
export default {
  name: 'DetailButton',

  components: {
  },

  props: {
    // gunNo: undefined,
  },

  data () {
    return {
      gunNo: undefined,
    }
  },

  computed: {
  },

  async created () {
    this.$on('gunNo', (gunNo) => {
      this.gunNo = gunNo
    })
  },

  methods: {
    async goPayHandler () {
      this.$emit('goPay')
    },
  },
}
