<template>
  <div id="app">
    <title-header></title-header>
    <router-view v-if='isRouterAlive'></router-view>
  </div>
</template>

<script>
import './assets/css/all.scss'
import titleHeader from './components/common/title'
// import './assets/font/iconfont.css'
import { mapState } from 'vuex'

export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  computed: {
    ...mapState(['title'])
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  components: {
    titleHeader
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

