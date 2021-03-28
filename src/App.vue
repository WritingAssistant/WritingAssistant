<template>
  <div id="app">
    <NavigationBar v-show="$route.meta.showNavigation"></NavigationBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'


export default {
  name: 'App',
  components: {
    NavigationBar
  }
}
</script>

<style>
  #app{
    position:relative;
    padding:25px;
    width: 100%;
    height: 100%;
    text-align: center;
  }
</style>
