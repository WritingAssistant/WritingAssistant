<template>
  <div>
    <main>
      <div class="glass">
        <div class="dashboard">
          <div class="user">
            <img alt="暂无头像" :src="this.avatar" />
          </div>

          <div class="selfranks">
            <h4>个人记录：</h4>
            <div class="rank">
              <img src="../../assets/topic.png" alt="" />
              <h5>我续写过的话题数量：{{ topicnum }}</h5>
            </div>
            <div class="rank">
              <img src="../../assets/like.png" alt="" />
              <h5>我点赞了：{{ likes }}</h5>
            </div>
            <div class="rank">
              <img src="../../assets/likeothers.png" alt="" />
              <h5>我被点赞：{{ likesgot }}</h5>
            </div>
            <div class="rank">
              <img src="../../assets/broadcast.png" alt="" />
              <h5>发布过的话题：{{ formertime }}</h5>
            </div>
            <div class="more">
              <h4>查看详情：</h4>
              <a href="/me/Themes"> <img src="../../assets/rankpic1.png" alt="" /></a>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="status">
            <h3>最新作品集：</h3>
          </div>
          <div class="cards">
            <div class="cardinfo">
              <img src="../../assets/gold.png" alt="配图" />
              <h3 class="cinfo">{{ rank1 }}</h3>
              <h2 class="ranknum">1</h2>
            </div>
            <div class="cardinfo">
              <img src="../../assets/sliver.png" alt="配图" />
              <h3 class="cinfo">{{ rank2 }}</h3>
              <h2 class="ranknum">2</h2>
            </div>
            <div class="cardinfo">
              <img src="../../assets/bronze.png" alt="配图" />
              <h3 class="cinfo">{{ rank3 }}</h3>
              <h2 class="ranknum">3</h2>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev rankprev" @click="prev()"></div>
        <div class="swiper-button-next ranknext" @click="next()"></div>
      </div>
    </main>
    <div class="circle-1"></div>
    <div class="circle-2"></div>
  </div>
</template>

<script>

import "swiper/swiper-bundle.min.css";
export default {
  data() {
    return {
      likesgot: "",
      topicnum: "3",
      likes: "",
      formertime: "",
      pic: "",
      rank1: "",
      rank2: "",
      rank3: "",
      avatar: "",
    };
  },
  mounted() {
    var rank1 = rank1;
    var rank2 = rank2;
    var rank3 = rank3;
    var rank = rank;
    this.$axios({
      method: "post",
      url: "http://127.0.0.1:3000/api/user/newestwriting",
      data: {
        rank: this.content,
      },
    }).then((res) => {
      console.log(res.data);
      this.rank1 = res.data[0].content;
      this.rank2 = res.data[1].content;
      this.rank3 = res.data[2].content;
    }),
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:3000/api/user/mepost",
      }).then((res) => {
        var loginuser = this.$userMsg;
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          if (loginuser == res.data[i].email) {
            this.topicnum = res.data[i].new;
          }
          console.log(this.topicnum);
        }
      }),
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:3000/api/user/mytopic",
      }).then((res) => {
        var loginuser = this.$userMsg;
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          if (loginuser == res.data[i].email) {
            this.likes += parseInt(res.data[i].likes);
            this.likesgot += parseInt(res.data[i].likes_got);
            this.formertime += res.data[i].topic;
          }
          console.log(this.likes);
          console.log(this.likesgot);
          console.log(this.formertime);
        }
      }),
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:3000/api/user/meavatar",
      }).then((res) => {
        var loginuser = this.$userMsg;
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          if (loginuser == res.data[i].email) {
            this.avatar = res.data[i].Avatar;
          }
          console.log(this.avatar);
        }
      });
  },
  
    methods: {
      prev() {
        this.$router.replace("/rank1");
      },
      next() {
        this.$router.replace("/rank");
      },
    },
  
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
main {
  min-height: 100vh;
  background: linear-gradient(to right top, #5669da, #6cdb);
  display: flex;
  align-items: center;
  justify-content: center;
}
.glass {
  background: white;
  min-height: 80vh;
  width: 70%;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 20px;
  z-index: 2;
  backdrop-filter: blur(2rem);
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -38%);
  margin-top: 40px;
}
.circle-1,
.circle-2 {
  background: white;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.3)
  );
  height: 150px;
  width: 150px;
  position: absolute;
  border-radius: 50%;
}
.circle-1 {
  right: 8%;
  top: 18%;
}
.circle-2 {
  left: 8%;
  bottom: -17%;
}
.dashboard {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 20px;
}
.rank {
  display: flex;
  margin: 20px 0;
  padding: 10px 50px;
  align-items: center;
}
.selfrank h4 {
  color: rgb(68, 83, 219);
  font-weight: 600;
}
.rank img{
  width:20px;
  height:20px
}
.rank h5 {
  padding: 0 20px;
  color: rgb(68, 83, 219);
  font-weight: 600;
  font-size: 12px;
}
.more {
  background: linear-gradient(to right top, #5669da, #6cdb);
  border-radius: 20px;
  padding: 10px;
  color: whitesmoke;
  display: flex;
  margin: 10px;
  font-family: fantasy;
}
.info {
  flex: 2;
}
.rankprev{
  position: fixed;
  left: 20em !important
}
.ranknext {
  right: 0px !important;
}
.more img {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 78%;
  left: 20%;
}
.status {
  margin-bottom: 10px;
  padding-bottom: -20px;
}

.cards {
  display: flex;
  flex-direction: column;
  margin: 40px;
  justify-content: space-evenly;
}
.cardinfo {
  display: flex;
  background: linear-gradient(
    to left top,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.9)
  );
  margin: 20px 0px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 10px 10px 20px rgba(122, 122, 122, 0.2);
  justify-content: space-between;
}

.ranknum {
  font-weight: 300;
  background: linear-gradient(to right top, #5669da, #6cdb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.cardinfo img {
  width: 50px;
  height: 50px;
}
</style>