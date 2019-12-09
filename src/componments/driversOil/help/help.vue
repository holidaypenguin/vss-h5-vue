<template>
  <div class="p-help">

    <Nav :title="title" type="help"
      @back="backHandler"></Nav>

    <div class="p-help-content">
      <div class="p-help-head">商务合作</div>
      <div class="p-help-title">如何开取加油发票？</div>
      <div class="p-help-msg">具体可到加油站咨询工作人员，工作人员会给出具体的操作步骤哦</div>
      <div class="p-help-title">如何使用加油优惠？</div>
      <div class="p-help-msg">当您到加油站的时候，选择油号油抢进行支付，支付完成即可使用加油优惠哦</div>
    </div>

  </div>
</template>

<script>
import Utils from '@/module/driversOil/utils'
import Nav from '../nav/nav.vue'
export default {
  name: 'Help',

  mixins: [Utils],

  components: {
    Nav,
  },

  data () {
    return {
      title: '帮助',
    }
  },

  computed: {
  },

  async created () {
  },

  async mounted () {

  },

  methods: {
    backHandler () {
      // this.$router.go(-1)
      this.nativeBack()
    },
  },
}
</script>

<style lang="postcss">
@n p{
  @b help{
    overflow: auto;

    @e content{
      margin-top: 89px;
    }
    @e head{
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #666666;
      line-height: 32px;
      padding-top: 32px;
      padding-bottom: 16px;
      padding-left: 32px;
      border-bottom: 1px solid #D9D9D9; /* no */
    }
    @e title{
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #1A1A1A;
      line-height: 32px;
      padding-top: 32px;
      padding-bottom: 16px;
      padding-left: 32px;
    }
    @e msg{
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #1A1A1A;
      line-height: 42px;
      padding: 0 32px 32px 32px;
      border-bottom: 1px solid #D9D9D9; /* no */
    }
  }
}
</style>
