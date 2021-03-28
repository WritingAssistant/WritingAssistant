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
 body{
  background: url(../assets/login.jpg) no-repeat;
  align-items: center;
  background-color: var(--white);
  background-attachment: fixed;
  background-size: cover;
}
  #app{
    position:relative;

    padding:25px;
    width: 100%;
    height: 100%;


  }
</style>
