<template>
  <div class="ry-confirm" v-if="visiable">
    <div class="ry-confirm-inner">
      <div class="ry-confirm-title">{{content}}</div>
      <div class="ry-confirm-options">
        <div class="ry-confirm-button"
          @click="cancelHandler">{{cancelText}}</div>
        <div class="ry-confirm-button ry-confirm-button--ok"
          @click="confirmHandler">{{confirmText}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  name: 'RyConfirm',

  components: {
  },

  props: {
    content: {
      default: undefined,
      type: String,
    },
    visiable: {
      default: false,
      type: Boolean,
    },
    cancelText: {
      default: '取消',
      type: String,
    },
    confirmText: {
      default: '确定',
      type: String,
    },
  },

  computed: {
  },

  methods: {
    cancelHandler () {
      this.$emit('cancel')
    },
    confirmHandler () {
      this.$emit('confirm')
    },
  },
}
</script>

<style lang="postcss">
@n ry{
  @b confirm{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(37,38,45,0.60);
    z-index: 1000;

    @e inner{
      margin-top: 325px;
      margin-left: auto;
      margin-right: auto;
      width: 606px;
      background: #FFFFFF;
      border-radius: 16px;
      overflow: hidden;
    }
    @e title{
      box-sizing: border-box;
      padding: 50px 28px 50px 28px;
      line-height: 60px;
      font-size: 40px;
      color: #111A34;
      letter-spacing: -0.96px;
      text-align: center;
      border-bottom: 2px solid rgba(0,0,0,0.10);
    }
    @e options{
      display: flex;
    }
    @e button{
      flex: 1;
      line-height: 100px;
      font-size: 36px;
      color: #666F83;
      font-family: PingFangSC-Medium;
      text-align: center;
      @m ok{
        border-left: 2px solid  #E2E4EA;
        color: #FF5B60;
      }
    }
  }
}
</style>
