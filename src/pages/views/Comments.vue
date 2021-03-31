<template>
  <div class="content">
      
      <div
            v-for="(comment, index) in comments"
            :key="index"
            class="item"
          >
          {{comment}}
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
              if(loginuser==res.data[i].email)
                 that.comments.push(res.data[i].comment)
            }
    })
  },

data(){
    return{
        comments:[]
    }
 }
}
</script>