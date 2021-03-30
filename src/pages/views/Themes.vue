<template>
  <div class="content">
      <div
            v-for="(theme, index) in theme"
            :key="index"
            class="item"
          >
          {{theme}}
      </div>
  </div>
</template>

<script>
export default {
 mounted() {
   this.$axios({
      method:"post",
      url:"http://127.0.0.1:3000/api/user/mytopic",
    }).then((res)=>{
       console.log(res.data)
       var c = res.data
       var that= this
       for(let i=0;i<c.length;i++){
           that.theme.push(c[i].topic)
       }
       
    })
  },

data(){
    return{
        theme:[]
    }
 }
}
</script>

<style scoped>
</style>