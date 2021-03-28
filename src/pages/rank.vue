<template>
  <div>
    <main>
      <div class="glass">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="dashboard">
          <div class="user">
            <img src="{{}}" alt="">
          </div>
          
          <div class="selfranks">
            <h4>个人记录：</h4>
            <div class="rank">
              <img src="" alt="">
                <h5>我续写过的话题数量：</h5>
            </div>
            <div class="rank">
              <img src="" alt="">
                <h5>点赞数：</h5>
            </div>
            <div class="rank">
              <img src="" alt="">
                <h5>被点赞数：</h5>
            </div>
            <div class="rank">
              <img src="" alt="">
                <h5>最早发布的时间：</h5>
            </div>
            <div class="more">
            <h4>查看详情：</h4>
           <a href="/me">  <img src="../../assets/rankpic1.png" alt=""></a>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="status">
            <h1>{{ ranktitle }}</h1>
            <input type="text" />
          </div>
          <div class="cards">
            <img src="" alt="配图" />
            <div class="classinfo">
              <h3>{{rank}}</h3>
              <h2 class="ranknum">{{ranknum}}</h2>
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
  watch: {
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
  },
};
</script>

<style >
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
  transform: translate(-50%, -50%);
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
  right: 10%;
  top: 8%;
}
.circle-2 {
  left: 10%;
  bottom: 5%;
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
.rank{
  display: flex;
  margin:20px 0;
  padding:10px 50px;
  align-items: center;

}
.selfrank h4{
  color: rgb(68, 83, 219);
  font-weight: 600;
  
}
.rank h5{
  padding:0 20px;
    color: rgb(68, 83, 219);
  font-weight: 600;
  font-size: 12px;
}
.more{
  background:linear-gradient(to right top, #5669da, #6cdb);
  border-radius: 20px;
  padding: 10px;
  color:whitesmoke;
  display: flex;
  margin: 10px;
  font-family: fantasy;
}
.info {
  flex: 2;

}
.swiper-button-prev {
  left: -5%;
}
.swiper-button-next {
  right: -5%;
}
.more img{
  width:100px;
  height: 100px;
 position: absolute;
 top:78%;
 left:20%

}
.status{
  margin-bottom: 20px;
}
.status input{
   background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.3)
  );
  border:none;
  padding:6px;
  width:60%;
  border-radius: 20px;
}
.cards{
  display: flex;
  flex-direction: column;
  margin:40px;
  justify-content: space-evenly;
}
.classinfo{
  display: flex;
}
</style>