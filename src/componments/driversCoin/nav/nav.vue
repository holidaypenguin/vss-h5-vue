<template>
  <div :class="[
      'p-nav',
      type === 'index' ? 'p-nav--index' : '',
    ]">

    <div class="p-nav-left">
      <div :class="[
          'p-nav-back scale25',
          type === 'detail' ? 'p-nav-back--white' : '',
        ]"
        @click="backHandler"></div>
    </div>

    <div class="p-nav-title">{{title}}</div>

    <div class="p-nav-right">
      <div class="p-nav-help scale25" v-if="type==='index'"
        @click="helpHandler"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Nav',

  mixins: [],

  props: {
    title: {
      default: '',
    },
    type: {
      default: '',
    },
  },

  mounted () {
    this.$nextTick(() => {
      // console.log(this.$el.clientHeight)
      this.$emit('height', this.$el.clientHeight)
    })
  },

  methods: {
    orderHandler () {
      this.$emit('order')
    },
    backHandler () {
      this.$emit('back')
    },
    helpHandler () {
      this.$emit('help')
    },
  },
}
</script>
<style lang="postcss">
@n p{
  @b nav{
    height: 88px;
    line-height: 88px;
    display: flex;
    overflow: hidden;
    background: #FFFFFF;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    border-bottom: 1px solid #D9D9D9; /* no */
    color: #1A1A1A;

    @m index{
      background: none;
      border-bottom: 0;
      color: #000000;
    }

    @e left{
      width: 100px;
    }
    @e back{
      width: 22px;
      height: 36px;
      margin: 26px 0 0 32px;
      background: url(../images/back@2x.png) no-repeat;
      background-size: 100% 100%;

      @m white{
        background: url(../images/back-white@2x.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    @e title{
      flex: 1;
      font-family: PingFangSC-Regular;
      font-size: 36px;
      text-align: center;
    }
    @e right{
      width: 100px;
    }
  }
}
</style>
