<template>
  <div>
    <main>
      <div class="glass">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="dashboard">
          <div class="user">
            <img src="{{}}" alt="" />
          </div>

          <div class="selfranks">
            <h4>个人记录：</h4>
            <div class="rank">
              <img src="" alt="" />
              <h5>我续写过的话题数量：{{ topicnum }}</h5>
            </div>
            <div class="rank">
              <img src="" alt="" />
              <h5>点赞数：{{ likes }}</h5>
            </div>
            <div class="rank">
              <img src="" alt="" />
              <h5>被点赞数：{{ likesgot }}</h5>
            </div>
            <div class="rank">
              <img src="" alt="" />
              <h5>最早发布的时间：{{ formertime }}</h5>
            </div>
            <div class="more">
              <h4>查看详情：</h4>
              <a href="/me"> <img src="../../assets/rankpic1.png" alt="" /></a>
            </div>
          </div>
        </div>
              <div class="info">
          <div class="status">
            <h3>续写小能手：</h3>
            
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
      </div>
    </main>
    <div class="circle-1"></div>
    <div class="circle-2"></div>
  </div>
</template>

<script>
import Swiper from "swiper/swiper-bundle.min.js";
import "swiper/swiper-bundle.min.css";
export default {
  data() {
    return {
      likesgot: "",
      topicnum: "3",
      likes: "",
      formertime: "",
      pic: "",
      rank1:"",
     rank2:"",
      rank3:"",
    };
  },
mounted() {
    var rank1=rank1
    var rank2=rank2
    var rank3=rank3
    var rank=rank
   this.$axios({
      method:"post",
      url:"http://127.0.0.1:3000/api/user/biggestauthor",
     data:{
        rank:this.author
      }
    }).then((res)=>{
       console.log(res.data);
        this.rank1=res.data[0].author
         this.rank2=res.data[1].author
          this.rank3=res.data[2].author
    })
  },
  watch: {
    $route: "fetchData",
    nextParas() {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
    methods: {
    }
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
.swiper-button-prev {
  position:absolute;
  left: 50%
}
.swiper-button-next {
  right: -5%;
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
.cardinfo img{
  width:50px;
  height:50px;
}
</style>