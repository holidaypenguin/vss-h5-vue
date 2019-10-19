<template>
  <div class="ry-qrcode-body">
    <div class="ry-qrcode">
      <div :class="[
        'ry-qrcode-wrap',
        `ry-qrcode-wrap--s${codeSource}${isUn ? 'un' : codeStatus}`]">
        <div :class="[
          'ry-qrcode-title',
          `ry-qrcode-title--sm${smType}`,
        ]">{{title}}</div>
        <div class="ry-qrcode-time">有效期：{{startAt}}-{{endAt}}</div>
        <div :class="[
            'ry-qrcode-detail',
            isUn ? 'ry-qrcode-detail--un' : '',
            `ry-qrcode-detail--sm${smType}`,
          ]"
          @click="goDetail">查看详情</div>
        <div :class="[
          'ry-qrcode-split',
          `ry-qrcode-split--sm${smType}`,
        ]"></div>
        <!-- 内部券 -->
        <template v-if="codeSource === 0">
          <div :class="[
            'ry-qrcode-code',
            `ry-qrcode-code--sm${smType}`,
          ]">券码：{{codeFormate}}</div>
          <img class="ry-qrcode-qrcode" :src="qrCodeUrl" alt=""/>
          <img class="ry-qrcode-bar" :src="barCodeUrl" alt/>
          <div class="ry-qrcode-tips">请向收银员展示卡券码用于核销</div>

          <div class="ry-button-main ry-qrcode-give-button"
            v-if="!isUn"
            @click="giveHandler">赠送</div>
        </template>
        <!-- 外部券 -->
        <template v-if="codeSource === 1">
          <div class="ry-qrcode-code ry-qrcode-code--mini">券码：{{codeFormate}}</div>
          <img
            :class="[
              'ry-qrcode-qrcode ry-qrcode-qrcode--mini',
            ]"
            :src="qrCodeUrl" alt=""/>
          <div class="ry-qrcode-tips ry-qrcode-tips--mini">请向收银员展示卡券码用于核销</div>
          <div
            :class="[
              'ry-qrcode-showmsg animated zoomIn',
              showMsg ? '' : 'ry-qrcode-showmsg--hidden'
            ]"
            v-if="!isUn">
            <div class="ry-qrcode-close scale25" @click="showMsg = false">+</div>
            卡券使用后，请点击此按钮，有关该卡券详情可在历史记录里查看哦~
          </div>
          <div class="ry-button-main ry-qrcode-button"
            v-if="!isUn"
            @click="toUseHandler">已使用</div>
        </template>
      </div>
      <div :class="['ry-qrcode-statu', `ry-qrcode-statu--s${codeStatus}`]"></div>
      <ry-confirm
        content="您确定将券码标记为“已使用”？"
        :visiable="confirmVisiable"
        @cancel="cancelHandler"
        @confirm="confirmHandler"></ry-confirm>
      <ry-give
        :visiable="giveVisiable"
        :id="id"
        :coupon-code="couponCode"
        @cancel="giveCancelHandler"
        @confirm="giveConfirmHandler"
        @blur="giveBlurHandler"></ry-give>
    </div>
  </div>
</template>

<script src="./vm.js"></script>

<style lang="postcss">
  @import 'ryQrcode.postcss';
</style>
