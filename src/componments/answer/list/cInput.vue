<template>
  <div class="c-input">
  <van-field
    v-if="!disabled && realType"
    label=""
    v-model="testValue"
    :type="realType"
    :maxlength="realMax"
    :show-word-limit="realMax !== 99999"
    autosize
    @click.prevent.stop
    @input="inputHandler"
    />
    <van-field
      class="c-input-disabled"
      value=""
      v-else
      label=""
      disabled
      @click.prevent.stop
      :maxlength="realMax"
      :show-word-limit="realMax !== 99999"
      />
  </div>
</template>

<script>
export default {
  name: 'c-input',
  props: {
    value: {
      default: '',
      type: [Number, String],
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    // 1字符串2整数3浮点数4日期
    type: {
      default: 1,
      type: [Number, String],
    },
    max: {
      default: 0,
      type: [Number, String],
    },
    min: {
      default: 0,
      type: [Number, String],
    },
  },
  data () {
    return {
      testValue: '',
    }
  },
  computed: {
    realType () {
      switch (Number(this.type)) {
        case 1:
          return 'text'
        case 2:
          return 'digit'
        case 3:
          return 'number'
        case 4:
          return 'date'
        default:
          return ''
      }
    },
    realMax () {
      switch (Number(this.type)) {
        case 1:
          return Number(this.max || 99999)
        case 2:
        case 3:
        case 4:
        default:
          return 99999
      }
    },
    realMin () {
      return Number(this.min || 0)
    },
  },
  watch: {
    value (newVal) {
      this.testValue = newVal
    },
  },
  created () {
    this.testValue = this.value
  },
  methods: {
    inputHandler (value) {
      if (this.disabled) return

      switch (Number(this.type)) {
        case 1:
          break
        case 2:
        case 3:
          value = this.max > 0 && value ? Math.min(value, this.max || 0) : value
          break
        case 4:
        default:
      }
      this.testValue = value
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="postcss">
.c-input-disabled{

}
</style>
