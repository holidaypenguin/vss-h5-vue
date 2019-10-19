<template>
  <div class="ry-buy">
    <div :class="['ry-buy-top ry-buy-top--shadow']"
      @touchmove.prevent @touchstart.prevent @touchend.prevent @click.prevent>
      <img class="ry-buy-image" :src="detail.iconUrl" alt="">
      <div class="ry-buy-main">
        <div class="ry-buy-title"
          style="-webkit-box-orient: vertical;">{{detail.name}}</div>
        <div class="ry-buy-money">￥{{detail.currentPrice}}</div>
        <div class="ry-buy-old"
          v-if="detail.currentPrice < detail.originPrice">原价￥{{detail.originPrice}}</div>
        <div class="ry-buy-num-wrap" v-if="!couponCode">
          <div :class="['ry-buy-num-mini', isMin && 'ry-buy-num-mini--disabled']"
            @touchstart.prevent="miniHandler">-</div>
          <div class="ry-buy-num-el">{{numIn ? params.num : 0}}</div>
          <div :class="['ry-buy-num-add', isMax && 'ry-buy-num-add--disabled']"
            @touchstart.prevent="addHandler">+</div>
        </div>
      </div>
    </div>

    <div  :class="[
      'ry-buy-other',
      couponCode ? 'ry-buy-other--detail' : 'ry-buy-other--detail',
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
      <div class="ry-buy-other-line">
        <div class="ry-buy-other-left">
          订单号：<br>
          支付时间：<br>
          <template v-if="couponStatusOpts[detail.couponStatus]">
            {{couponStatusOpts[detail.couponStatus]}}时间：<br>
          </template>
        </div>
        <div class="ry-buy-other-right">
            {{detail.orderNo}}<br>
            {{detail.payTimeSrc}}<br>
            <template v-if="couponStatusOpts[detail.couponStatus]">
              {{detail.tradeTimeSrc}}<br>
            </template>
        </div>
      </div>
    </div>

    <div class="ry-buy-bottom" v-if="!couponCode">
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
</style>
