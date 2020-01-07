
export default {
  name: 'DetailButton',

  components: {
  },

  props: {
    gasInfo: {},
  },

  data () {
    return {
    }
  },

  computed: {
  },

  async created () {
  },

  methods: {
    async goClick () {
      this.$emit('goClick')
    },
  },
}
