<template>
  <div id="give-wrap"
    v-if="visiable"
    @click.self="giveWrapClick">
    <div class="give-inner"
      @click.stop="giveInnerClick">
      <div class="header">此卡券将被赠送，请输入对方手机号</div>
      <div class="main">
        <div class="line line-phone">
          <div class="input">
            <div class="title">手机号</div>
            <div class="el-wrap">
              <input class="el" type="number" v-model="sendPhone" auto-focus
                @input='inputHandler'
                @blur="blurHandler"/>
            </div>
            <div class="close scale25"
              @click="cleanClick"></div>
          </div>
        </div>
        <div class="tipss">请仔细填写手机号，卡券一经赠送则不可撤销！</div>
        <div class="submit">
          <div :class="[
              'ry-button-main',
              'ry-qrcode-give-button',
              canSendPhone ? '' : 'ry-button-main--un',
            ]"
            :disabled="canSendPhone"
            @click.stop.self="giveSubmit">赠送</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {
  COUPON_GIFT,
} from '../common/interface'
import {
  SET_LOADING,
} from '../common/mutations-type'

export default {

  name: 'RyGive',

  components: {
  },

  data () {
    return {
      sendPhone: '',
    }
  },

  props: {
    visiable: {
      default: false,
      type: Boolean,
    },
    id: {
      default: '',
    },
    couponCode: {
      default: '',
    },
  },

  computed: {
    ...mapState({
      tokenId: state => state.tokenId,
      platform: state => state.platform,
    }),
    canSendPhone () {
      return this.sendPhone && this.sendPhone.length === 11
    },
  },

  methods: {
    giveWrapClick () {
      this.$emit('cancel')
    },
    giveInnerClick () {
    },
    inputHandler (e) {
      this.sendPhone = (e.target.value || '').toString().replace(/[^\d]/g, '')
        .replace(/^0(?=\d)/, '')
        .substr(0, 11)
    },
    blurHandler (e) {
      this.$emit('blur')
    },
    cleanClick () {
      this.sendPhone = ''
    },
    async giveSubmit () {
      if (!this.canSendPhone) return

      this.$store.commit(SET_LOADING, true)

      const params = {
        tokenId: this.tokenId,
        couponCode: this.couponCode,
        sendPhone: this.sendPhone,
      }
      await this.$axios.post(COUPON_GIFT, params)

      this.$store.commit(SET_LOADING, false)

      this.$emit('confirm')
    },
  },
}
</script>

<style lang="postcss" scoped>
@n ry{
  @b confirm{}
}
#give-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.5);
  z-index: 1000;
}

#give-wrap .give-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 620px;
  border-radius: 10px;
  background: #fff;
}

#give-wrap .give-inner .header {
  padding-top: 40px;
  line-height: 100px;
  font-size: 30px;
  text-align: center;
}

#give-wrap .give-inner .main {
  margin: 15px 35px 54px 35px;
}

#give-wrap .give-inner .main .line {
  width: 100%;
  margin-bottom: 30px;
  display: flex;
}

#give-wrap .give-inner .main .line .input {
  height: 130px;
  line-height: 130px;
  width: 660px;
  border-radius: 100px;
  box-shadow: 0px 5px 20px 0px rgba(0,0,0,.1);
  display: flex;
  background: #fff;
}

#give-wrap .give-inner .main .line .input .title {
  margin-left: 45px;
  font-size: 28px;
  color: #333;
}

#give-wrap .give-inner .main .line .input .el-wrap {
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-left: 30px;
}

#give-wrap .give-inner .main .line .input .el {
  font-size: 40px;
  width: 100%;
  height: 100%;
  color: #333;
  outline: 0;
  border: 0;
}

#give-wrap .give-inner .main .line .input .close {
  width: 30px;
  height: 30px;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-right: 70px;
}

#give-wrap .give-inner .main .tipss {
  line-height: 40px;
  font-size: 24px;
  color: #ff6161;
  text-align: center;
}

#give-wrap .give-inner .main .submit {
  margin-top: 100px;
  margin-left: 15px;
  margin-right: 15px;
}
</style>
