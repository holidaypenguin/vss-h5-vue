<template>
  <div class="ry-buy">
    <div :class="['ry-buy-top', couponCode ? 'ry-buy-top--shadow' : '']"
      @touchmove.prevent @touchstart.prevent @touchend.prevent @click.prevent>
      <img class="ry-buy-image" :src="detail.iconUrl" alt="">
      <div class="ry-buy-main">
        <div class="ry-buy-title nowrap2"
          style="-webkit-box-orient: vertical;">{{detail.name}}</div>
        <template v-if="(setting && setting.moduleName === 'douli')
            && (detail.currentPrice < detail.originPrice)">
          <div class="ry-buy-only ry-tag-only">兜礼专享</div>
          <div class="ry-buy-only">
            <div class="ry-buy-only-title">兜礼专享价¥{{detail.currentPrice}}</div>
            <div class="ry-buy-only-money">
              立省{{parseFloat((detail.originPrice - detail.currentPrice).toFixed(2))}}元
            </div>
          </div>
        </template>
        <div class="ry-buy-money">￥{{detail.currentPrice}}</div>
        <div class="ry-buy-old"
          v-if="detail.currentPrice < detail.originPrice">原价￥{{detail.originPrice}}</div>
      </div>
    </div>

    <div :class="['ry-buy-num', !couponCode ? 'ry-buy-num--shadow' : '']" v-if="!couponCode"
      @touchmove.prevent>
      <div class="ry-buy-num-inner">
        <div class="ry-buy-num-title">购买数量</div>
        <div class="ry-buy-num-wrap">
          <div :class="['ry-buy-num-mini', isMin && 'ry-buy-num-mini--disabled']"
            @click="miniHandler">-</div>
          <div class="ry-buy-num-el">{{numIn ? params.num : 0}}</div>
          <div :class="['ry-buy-num-add', isMax && 'ry-buy-num-add--disabled']"
            @click="addHandler">+</div>
        </div>
      </div>
    </div>

    <div :class="[
      'ry-buy-other',
      couponCode ? 'ry-buy-other--detail' : 'ry-buy-other--edite',
    ]">
      <div class="ry-buy-other-title">优惠说明</div>
      <div class="ry-buy-other-line">
        <div class="ry-buy-other-left">使用须知</div>
        <div class="ry-buy-other-right">
          <div v-html="detail.goodsDesc"></div>
        </div>
      </div>
      <div class="ry-buy-other-line" v-if="shopList && shopList.length > 0">
        <div class="ry-buy-other-left">适用门店</div>
        <div class="ry-buy-other-right">
          <div class="ry-buy-other-shop" @click="transShop">查看适用门店</div>
        </div>
      </div>
    </div>

    <div class="ry-buy-other" v-if="couponCode">
      <div class="ry-buy-other-title">订单详情</div>

      <!--无上家转赠信息显示支付信息-->
      <div class="ry-buy-other-line"
        v-if="!(detail.couponStatus==7 && detail.sendFrom)
          && !(detail.couponStatus!=7 && detail.givingBy)">

        <div class="ry-buy-other-left">
          订单号：<br>
          支付时间：<br>
        </div>

        <div class="ry-buy-other-right">
          {{detail.orderNo}}<br>
          {{detail.payTimeSrc}}<br>
        </div>
      </div>

      <!--转赠状态-->
      <div
        v-if="detail.couponStatus===7">
        <!--上家转赠信息-->
        <div class="ry-buy-other-line" v-if="detail.sendFrom">
          <div class="ry-buy-other-left">
            <!--上家转赠信息-->
            <template v-if="detail.sendFrom">
              赠送人：<br>
              赠送时间：<br>
            </template>
          </div>
          <div class="ry-buy-other-right">
            <!--上家转赠信息-->
            <template v-if="detail.sendFrom">
              {{detail.sendFrom}}<br>
              {{detail.payTimeSrc}}<br>
            </template>
          </div>
        </div>

        <!--下家转赠信息-->
        <div class="ry-buy-other-line" v-if="detail.givingBy">
          <div class="ry-buy-other-left">
            <!--下家转赠信息-->
            <template v-if="detail.givingBy">
              被赠人：<br>
              被赠时间：<br>
            </template>
          </div>
          <div class="ry-buy-other-right">
            <!--下家转赠信息-->
            <template v-if="detail.givingBy">
              {{detail.givingBy}}<br>
              {{detail.tradeTimeSrc}}<br>
            </template>
          </div>
        </div>
      </div>

      <!--非转赠状态-->
      <div class="ry-buy-other-line"
        v-if="detail.couponStatus!==7">

        <div class="ry-buy-other-left">
          <!--上家信息-->
          <template v-if="detail.givingBy">
            赠送人：<br>
            赠送时间：<br>
          </template>
          <!--记录时间-->
          <template v-if="detail.couponStatus > 2">
            {{couponStatusOpts[detail.couponStatus]}}时间：<br>
          </template>
        </div>

        <div class="ry-buy-other-right">
          <!--上家信息-->
          <template v-if="detail.givingBy">
            {{detail.givingBy}}<br>
            {{detail.payTimeSrc}}<br>
          </template>
          <!--记录时间-->
          <template v-if="detail.couponStatus > 2">
            {{detail.tradeTimeSrc}}<br>
          </template>
        </div>
      </div>
    </div>

    <div class="ry-buy-bottom" v-if="!couponCode"
      >
      <div class="ry-buy-bottom-left"
        @touchmove.prevent @touchstart.prevent @touchend.prevent @click.prevent>
        <span>合计：</span>
        <span class="ry-buy-bottom-left--money">¥{{count}}</span>
      </div>
      <div :class="[
        'ry-buy-bottom-right',
        'ry-button-main',
        canBuy || 'ry-button-main--disabled']"
        @touchmove.prevent
        @touchstart="toBuy">{{buyStr}}</div>
    </div>

    <div :class="['ry-buy-shop', showShop ? 'ry-buy-shop--show' : '']"
      @wheel="handleWheel">
      <div :class="['ry-buy-shop-wrap', showShop ? 'ry-buy-shop-wrap--show' : '']">
        <div class="ry-buy-shop-head">
          适用门店
          <div class="ry-buy-shop-close scale25" @click="transShop"></div>
        </div>
        <div class="ry-buy-shop-list">
          <div class="ry-buy-shop-item"
            v-for="(item, index) in shopList"
            :key="index">
            <div class="ry-buy-shop-name">{{item.shopName}}</div>
            <div class="ry-buy-shop-addr">{{item.address}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./vm.js"></script>

<style lang="postcss">
  @import './ryBuy.postcss';
  @import './ryBuy2.postcss';
</style>
