<template>
  <div>
     <div>{{Chosentest}}</div>
     <div> likes:{{this.likes}}</div>
     <button @click="addlike" >点赞</button>
     <textarea class="comment"
        v-model="comment"
        placeholder="Type your comment here."
        cols="100"
        rows="10"
      ></textarea>
      <button class="comBtn" @click="insertComment">Submit</button>
      <div class="font"  >评论留言：</div><hr>
      <div class="font"  v-for="(comment,index) in comments" :key="index">{{comment.comment}}                                  {{comment.date}}</div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      Chosentest:"",
      comment:"",
      comments:[""],
      nowTime:new Date().toLocaleString(),
      likes:0
      }
  },
  created(){
        this.getParams()
     },
   watch: {
      '$route': 'getParams'
     },
 methods:{
    getParams(){
         const routerParams = this.$route.query.Chosentest
         this.Chosentest = routerParams;

       },
    insertComment(){
      if(this.comment==""){
        alert("please type your comment")
      }
      else{this.comments.push({
        comment:this.comment,
        date:this.nowTime});
        this.comment = ""
     }
    },
    addlike(){
      this.likes = this.likes+=1
      console.log(this.likes)
    }
  }
  }

</script>
<style>
.comment{
  display: block;
  position: relative;
  margin-top: 2%
}
.comBtn{
  display: block
}
.font{
  color:white
}
</style>
