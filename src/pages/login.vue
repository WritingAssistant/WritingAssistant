<template>
  <div class="login-register">
    <div class="contain">
      <div class="big-box" :class="{ active: isLogin }">
        <div class="big-contain" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <div class="bform">
            <input type="email" placeholder="邮箱" v-model="form.useremail" />
            <span class="errTips" v-if="emailError">* 邮箱填写错误 *</span>
            <input type="password" placeholder="密码" v-model="form.userpwd" />
            <span class="errTips" v-if="emailError">* 密码填写错误 *</span>
          </div>
          <button class="bbutton" @click="login">登录</button>
        </div>
        <div class="big-contain" v-else>
          <div class="btitle">创建账户</div>
          <div class="bform">
            <input type="text" placeholder="用户名" v-model="form.username" />
            <span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
            <input type="email" placeholder="邮箱" v-model="form.useremail" />
            <input type="password" placeholder="密码" v-model="form.userpwd" />
          </div>
          <button class="bbutton" @click="register">注册</button>
        </div>
      </div>
      <div class="overlay">
        <div class="small-box" :class="{ active: isLogin }">
          <div class="small-contain left" v-if="isLogin">
            <div class="stitle">Dear English learner:</div>
            <p class="scontent">拥有属于自己的账号，和我们一起进步吧！</p>
            <button class="sbutton" @click="changeType">注册</button>
          </div>
          <div class="small-contain right" v-else>
            <div class="stitle">Dear English learner:</div>
            <p class="scontent">保持一颗向上的心，我们都会有更多的收获！</p>
            <button class="sbutton" @click="changeType">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-register",
  data() {
    return {
      isLogin: false,
      emailError: false,
      passwordError: false,
      existed: false,
      form: {
        username: "",
        useremail: "",
        userpwd: "",
      },
    };
  },

  methods: {
    changeType() {
      this.isLogin = !this.isLogin;
      this.form.username = "";
      this.form.useremail = "";
      this.form.userpwd = "";
    },
    login() {
      const self = this;
      if (self.form.useremail != "" && self.form.userpwd != "") {
        self
          .$axios({
            method: "post",
            url: "http://127.0.0.1:3000/api/user/login",
            data: {
              email: self.form.useremail,
              password: self.form.userpwd,
              username: self.form.username,
            },
          })
          .then((res) => {
            switch (res.data) {
              case -1:
                this.emailError = true;
                break;
              case 1:
                this.passwordError = true;
                break;
              default:
                alert("登陆成功，快来看看有什么新话题吧！");
                localStorage.setItem("email", res.data);
                setTimeout(() => {
                  this.$router.push("/homepage");
                }, 1000);
                
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("填写不能为空！");
      }
    },
    register() {
      const self = this;
      if (
        self.form.username != "" &&
        self.form.useremail != "" &&
        self.form.userpwd != ""
      ) {
        self
          .$axios({
            method: "post",
            url: "http://127.0.0.1:3000/api/user/add",
            data: {
              username: self.form.username,
              email: self.form.useremail,
              password: self.form.userpwd,
            },
          })
          .then((res) => {
            switch (res.data) {
              case 0:
                alert("注册成功！点击登录试试吧！");
                this.login();
                break;
              case -1:
                this.existed = true;
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("好像没有接收到你的信息呢！");
      }
    },
  },
};
</script>

<style>
:root {
  --white: #e9e9e9;
  --gray: #333;
  --blue: #0367a6;
  --lightblue: #008997;
}

.login-register {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
.contain {
  width: 60%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: radial-gradient(dimgrey 20%, transparent 16%),
    radial-gradient(dimgrey 15%, transparent 16%);
  border-radius: 20px;
  box-shadow: 0 0 3px #008997, 0 0 6px #f0f0f0;
}
.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain {
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btitle {
  font-size: 1.8em;
  padding-bottom: 1em;
  font-weight: bold;
  color: whitesmoke;
}
.bform {
  width: 100%;
  height: 40%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}
.bform input {
  width: 50%;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-top: 5px;
  padding-left: 2em;
  background-color: #f0f0f0;
}
.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: var(--white);

  border: 1px solid var(--blue);
  color: var(--blue);
  font-size: 0.9em;
  cursor: pointer;
}
.small-box {
  width: 30%;
  height: 100%;

  position: relative;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 0.6s;
  background: linear-gradient(80deg, rgb(57, 167, 176), rgb(56, 96, 183));
  position: absolute;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stitle {
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;
}
.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}
.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  transform: translateX(-100%);
  transition: all 0.6s;
}
</style>
