<template>
  <div>
    <main>
      <div class="glass">
        <div class="dashboard"></div>
        <div class="info"></div>
        <div class="status">
          <h1>{{ ranktitle }}</h1>
          <input type="text" />
        </div>
        <div class="cards">
          <img src="" alt="" />
          <div class="classinfo"></div>
        </div>
      </div>
    </main>
    <div class="circle-1"></div>
    <div class="circle-2"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
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
</style>