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
   var loginuser=this.$userMsg
   console.log(loginuser)
   this.$axios({
      method:"post",
      url:"http://127.0.0.1:3000/api/user/mytopic",
    }).then((res)=>{
            var that=this
            console.log(res.data)
            for(var i=0;i<res.data.length;i++){
              if(loginuser==res.data[i].email){
                 that.theme.push(res.data[i].topic)
                 that.email=res.data[i].email
                 console.log(that.email)
              }
               
            }
    })
  },

data(){
    return{
        theme:[],
        email:''
    }
 }
}
</script>

<style scoped>
</style>