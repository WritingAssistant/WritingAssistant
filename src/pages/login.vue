<template>
 <div>
   <div class="login">
     {{msg}}
     <div>
    <input type="text" v-model="login.username" placeholder="用户名"/>
    <input type="text" v-model="login.password" placeholder="密码"/>
    </div>
    </div>
    <button @click="login()">登录</button>
    <button @click="register()">注册</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"login",
     data(){
        return{
            msg: "Let's use your imagination to make great works!",
            username:"",
            password:"",
            nameId: "",
            data:{}
        }
        },
    methods:{
        login(){
            let params={
                username:this.username,
                password:this.password
            }
        axios.get('http://localhost:3000/index',params).then((res)=>{
            
            console.log(res)
            if(res.data.status == 3000){
                   this.nameId = res.data.data[0].id
                }else{
                    alert(res.data.message)
                }
        }).catch((err)=>{
            console.log(err);
        });
    }}
    }
</script>

<style scoped>

</style>