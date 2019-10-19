<template>
  <ry-main :query="getQuery()"></ry-main>
</template>

<script>
import RyMain from '../../common/jiduoduo/ryMain/ryMain'
import Utils from '../common/utils'

export default {
  name: 'Ry-Main',

  mounted () {},

  mixins: [Utils],

  components: {
    RyMain,
  },
}
</script>
