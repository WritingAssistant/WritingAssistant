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
   this.$axios({
      method:"post",
      url:"http://127.0.0.1:3000/api/user/mytopic",
    }).then((res)=>{
       console.log(res.data)
       var c = res.data
       var that= this
       for(let i=0;i<c.length;i++){
           that.comments.push(c[i].comment)
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