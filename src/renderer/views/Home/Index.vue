<template>
  <div class="page-home-index">
    <div class="home-carousel">
      <div class="home-carousel-title">
        <!-- League of Legends -->
        {{ indexData.carousel.title }}
      </div>
      <div class="home-carousel-desc">
        {{ indexData.carousel.desc }}
      </div>
      <div class="carousel-dots">
        <div
          v-for="(current, i) in indexData.count"
          :class="{ active: i == indexData.currentPoster }"
          :key="i"
          @click="goCarousel(i)"
        ></div>
      </div>
    </div>
    <div class="home-game-box">
      <div
        class="home-game-box-item"
        v-for="item in indexData.gameBox"
        :key="item"
      >
        <div class="item-img">
          <img :src="skinsConverter(item.skin)" />
          <div class="item-start-btn">
            <span>{{ item.title }}</span>
          </div>
        </div>
        <div class="item-title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import mitt from "@/common/mitt";
import { reactive } from "vue";
export default {
  setup() {
    let indexData = reactive({
      currentPoster: 0,
      carousel: {
        title: "",
        desc: "",
      },
      count: 0,
      gameBox: [
        {
          skin: 87000,
          title: "嚎哭深渊",
          images: "static/images/skins/85000.jpg",
        },
        {
          skin: 88000,
          title: "自定义房",
          images: "static/images/skins/85000.jpg",
        },
        {
          skin: 89000,
          title: "自定义房",
          images: "static/images/skins/85000.jpg",
        },
        {
          skin: 90000,
          title: "自定义房",
          images: "static/images/skins/85000.jpg",
        },
        {
          skin: 91000,
          title: "自定义房",
          images: "static/images/skins/85000.jpg",
        },
        {
          skin: 86000,
          title: "自定义房",
          images: "static/images/skins/85000.jpg",
        },
      ],
    });
    mitt.emit("get-skin-background", ({ carousel, current, count }) => {
      indexData.carousel = carousel;
      indexData.currentPoster = current;
      indexData.count = count;
    });
    let goCarousel = (current) => {
      //跳转到指定的
      mitt.emit("skin-background-goto", current);
    };
    mitt.on("skin-background-change", ({ current, carousel }) => {
      indexData.currentPoster = current;
      indexData.carousel = carousel;
    });

    function skinsConverter(skin) {
      return `static/images/skins/${skin}.jpg`;
    }
    return { indexData, goCarousel, skinsConverter };
  },
};
</script>
<style>
.home-game-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: calc(60vh - 52px);
}
.home-game-box-item {
  flex: 1;
  width: 30%;
  min-width: 30%;
  max-width: 30%;
  padding: 10px 0px;
}
.carousel-dots {
  position: absolute;
  bottom: 15px;
  left: 0;
  display: flex;
}
.carousel-dots div {
  cursor: pointer;
  width: 7px;
  height: 7px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: aliceblue;
}
.carousel-dots div.active {
  background-color: #f9cc16;
}

.item-img {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  transition: all 1s;
}
.item-img img {
  /* background-color: red; */
  width: 222px;
  height: 140px;
  border-radius: 5px;
  /* transition: all 1s; */
}
.item-start-btn span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: 600;
}

.item-title {
  color: #a2a2a2;
}

.item-img:hover {
  transform: scale(1.05);
}
.item-img:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  /* background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0, rgba(0, 0, 0, 0.6)),
    color-stop(45%, rgba(0, 0, 0, 0.2)),
    color-stop(85%, transparent),
    to(transparent)
  );
  background: -webkit-linear-gradient(
    bottom,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.2) 45%,
    transparent 85%,
    transparent
  );
  background: -o-linear-gradient(
    bottom,
    rgba(0, 0, 0, 0.6) 0,
    rgba(0, 0, 0, 0.2) 45%,
    transparent 85%,
    transparent 100%
  );
  background: linear-gradient(
    0deg,
    rgb(0 0 0 / 77%),
    rgb(0 0 0 / 59%) 42%,
    #00000026 85%,
    transparent
  ); */
  opacity: 1;
  z-index: 0;
}
#components-grid-demo-flex :deep(.ant-row) {
  background: rgba(128, 128, 128, 0.08);
}
.page-home-index {
  padding: 0 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.home-carousel {
  width: calc(60%);
  height: calc(40vh);
  padding-top: 50px;
  position: relative;
}
.home-carousel .home-carousel-title {
  font-weight: 800;
  font-size: 35px;
}

.home-carousel .home-carousel-desc {
  padding-top: 5px;
  font-size: 14px;
  line-height: 22px;
}
</style>
