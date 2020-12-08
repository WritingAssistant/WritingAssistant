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
export default {
    name:"login",
     data(){
        return{
            msg: "Let's use your imagination to make great works!",
            name:"",
            password:"",
            array:"",
            nameId: "",
        }
     },
      methods:{
        login(){
      let params = {
                name: this.name,
                password: this.password
            }
             this.$http.post('/login/login',params).then((res)=>{
                console.log(res)
                if(res.data.status == 1000){
                   this.nameId = res.data.data[0]._id
                }else{
                    alert(res.data.message)
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
         register(){
            let params = {
                name: this.name,
                password: this.password
            }
            this.$http.post('/login/register',params).then((res)=>{
                console.log(res)
                if(res.data.status == 1000){
                   alert(res.data.message)
                }else{
                    alert(res.data.message)
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        }
      }

</script>

<style scoped>

</style>