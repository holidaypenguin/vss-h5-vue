import Vue from 'vue'
import Router from 'vue-router'
import RyList from '../../../componments/elive/ryList/vm'
import RyMy from '../../../componments/elive/ryMy/ryMy'
import RyMain from '../../../componments/elive/ryMain/ryMain'
// import RyQrcode from '../../../componments/elive/ryQrcode/ryQrcode'
// import RyBuy from '../../../componments/elive/ryBuy/vm'
import RyResult from '../../../componments/elive/ryResult/ryResult'
import config from '../../../../config'
import setting from '../setting'

Vue.use(Router)

// console.log(process.env.RUN_ENV)

export default new Router({
  mode: 'history',
  base: `${config.produceName}/${config.moduleRootName}/${setting.moduleName}`,
  routes: [
    {
      name: 'main',
      path: '/main',
      component: RyMain,
      meta: {title: '积多多福利社'},
      redirect: {name: 'list'},
      children: [
        {
          name: 'list',
          path: 'list',
          component: RyList,
          meta: {title: '积多多福利社'},
        },
        {
          name: 'my',
          path: 'my',
          component: RyMy,
          meta: {title: '我的卡包'},
        },
      ],
    },
    {
      name: 'qrcode',
      path: '/qrcode/:id/:couponCode',

      /**
       * TODO
       * 因为多个模块的ryQrcode引用同一个组件，生产环境如果同时编译会导致不允许，使用异步组件就没有问题。
       */
      component: resolve => require(['../../../componments/elive/ryQrcode/ryQrcode'], resolve),
      props: true,
      meta: {title: '卡券二维码'},
    },
    {
      name: 'buy',
      path: '/buy/:id/:couponCode?',

      /**
       * TODO
       * 同上。
       */
      component: resolve => require(['../../../componments/elive/ryBuy/vm'], resolve),
      props: true,
      meta: {title: '卡券详情'},
    },
    {
      name: 'result',
      path: '/result',
      component: RyResult,
      meta: {title: '支付结果'},
    },
    {
      path: '*',
      redirect: {name: 'list'},
      component: Vue.extend({
        template: '<router-view transition="fade" transition-mode="out-in"></router-view>',
      }),
    },
  ],
})
