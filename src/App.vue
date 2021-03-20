<template>
  <div id="app">
    <NavigationBar></NavigationBar>
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
  }
</style>
