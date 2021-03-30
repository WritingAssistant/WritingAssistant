<template>
    <div class="main">
      <div class="left">
        <div class="avatarPa" @click="upload()">
          <img :src="imageUrl" class="avatar"/>
        </div>
        <input type="file" id="fileRef" @change="handleChange" style="display:none"/>
        <div>
            <div v-if="!edit" @click.stop="editName()" class="name">
              {{name}}
            </div>
            <div v-if="edit" class="editArea">
              <input v-model="name" class="nameEdit"/>
              <span @click="showName()">√</span>
            </div>
        </div>
        <div class="routeArea">          
          <a @click="redirect('Themes')"><img src="../../icon/icon1.png"/>我的主题</a>
          <a @click="redirect('Reply')"><img src="../../icon/icon2.png"/>我的回复</a>
          <a @click="redirect('Comments')"><img src="../../icon/icon3.png"/>我的评论</a>

        </div>

      </div>
      <div class="right">      
        <div class="title">
          {{Breadcrumb}}
        </div>  
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
const url = require("../../icon/1.png");
export default {
  mounted() {
   this.$axios({
      method:"post",
      url:"http://127.0.0.1:3000/api/user/mytopic",
    }).then((res)=>{
       console.log(res.data)
       this.name=res.data[0].username
       ;
    })
  },
  data(){
    return{
        name:"Simon Edwin",
        edit:false,
        Breadcrumb:"Themes",
        imageUrl: url
    }
  },
  methods:{
    editName(){
        this.edit = true;
    },
    showName(){
        this.edit = false;
    },
    redirect(param){
        this.Breadcrumb = param;
        this.$router.push("/me/" + param);
    },
    upload(){
        document.getElementById("fileRef").click();
    },
    handleChange(info){
        var _that = this;
        var file = info.target.files[0];  
        // 确认选择的文件是图片                
        if(file.type.indexOf("image") == 0) {
            var reader = new FileReader();
            reader.readAsDataURL(file);                    
            reader.onload = function() {
              _that.imageUrl = this.result;
            };
        }
    }
  }
}
</script>

<style scoped>
  .main{
    width: 80%;
    background-color: #BFF1F050;
    border-radius: 16px;
    display: inline-flex;
    height: 90%;
  }

  .main .left{
    border-radius: 16px;
    width: 360px;
    background-color: #EAFAFA;
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .main .left .name{
    color: #7DA3CF;
    font-size: 16px;
    text-align: center;
  }

  .editArea{
    display: flex;
    align-items: center;
  }

  .editArea>span{
    margin-left: 4px;
    cursor: pointer;
  }

  .routeArea{
    width: 70%;
    flex: 1;
    margin-top: 80px;
  }

  .routeArea>a{
    color: #7DA3CF;
    font-size: 20px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .routeArea>a img{
    margin-right: 20px;
  }

  .main .right{
    width: 1px;
    flex: 1;
    padding: 40px;    
    display: flex;
    flex-direction: column;
  }

  .main .right .title{    
    color: #7DA3CF;
    font-size: 32px;
    margin-bottom: 20px;
    text-align: left;
  }

  .nameEdit{
    outline: none;
    border: 1px solid #d9d9d9;
    padding: 0 8px;
    border-radius: 8px;
    line-height: 32px;
    width: 100%;
  }

  .avatar{
    width: 120px;
    height: 120px;
  }

  .avatarPa{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 10px;
    cursor: pointer;
  }
</style>
