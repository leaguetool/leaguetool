<template>
  <div class="skin-background">
    <a-carousel
      ref="carouselRef"
      effect="fade"
      :autoplay="autoplay"
      :autoplaySpeed="autoplaySpeed"
      :before-change="onChange"
      :speed="speed"
      :dots="false"
    >
      <div v-for="carousel in carouselEle" :key="carousel.skin">
        <div
          class="background-image"
          v-bind:style="skinsConverter(carousel.skin)"
        ></div>
      </div>
    </a-carousel>
  </div>
</template>
<script>
import mitt from "@/common/mitt";
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";

export default {
  setup() {
    const carouselEle = [
      {
        skin: 88000,
        title: "至死不渝：瑞兹",
        desc: "英雄联盟至死不渝瑞兹是一款稀有的游戏皮肤，这款皮肤是奖励给S2时期没有使用BUG的玩家，献给那些即使饱受创伤，任然坚持正道的召唤师。",
      },
      {
        skin: 86000,
        title: "赛博潮流：阿克尚",
        desc: "阿克尚身上有许多故事。他是一名光明哨兵，持着一把强大的远古兵器，抓着绳索荡进战场。他坚信自己应该去做正确的事情，而且应该不计代价。另外他的笑容也很迷人。",
      },
      {
        skin: 89000,
        title: "光明哨兵：戴安娜",
        desc: "戴安娜永远都佩着她的月刃，她是皎月教派的武士，不过她的教派在巨神峰周围地区几乎已经销声匿迹。黛安娜身穿闪烁着冬夜寒雪之光的铠甲，是皎月神力的凡间化身。她在巨神峰之巅与星灵精魄相融，不再是单纯的凡人。现在的她努力抗争着，寻找着神的启示，以及自己的力量和存在对于这个世界的意义。",
      },
      {
        skin: 91000,
        title: "欲望之主：泽拉斯",
        desc: "泽拉斯是古代恕瑞玛的巫师 ，飞升以后的他变成了一种奥术能量体，在魔法石棺的碎片之中涌动。数千年来，他被囚禁在沙漠之下，但最近恕瑞玛的崛起却将他从远古的牢笼中解放出来。对权力的疯狂渴求驱使着他，想要夺回他认为属于自己的东西，并取代世界上这些自命不凡的文明，让自己成为唯一受膜拜的偶像，统一整个世界。",
      },
    ];

    const time = 1500;
    let carouselRef = ref(null);
    let speed = ref(time);
    let current = ref(0);
    let autoplay = ref(true);
    const onChange = (from, to) => {
      current.value = to;
      mitt.emit("skin-background-change", {
        carousel: carouselEle[to],
        current: to,
        count: carouselEle.length,
      });
    };
    mitt.on("get-skin-background", (callback) => {
      callback({
        carousel: carouselEle[current.value],
        current: current.value,
        count: carouselEle.length,
      });
    });
    onMounted(() => {
      mitt.on("skin-background-goto", (currentPoster) => {
        speed.value = 300;
        //跳转到指定的页
        carouselRef.value.goTo(currentPoster, true);
        //这里如果直接修改 会出现动画加载慢
        setTimeout(() => {
          current.value = currentPoster;
          speed.value = time;
        }, 1);
      });
    });
    // 获取路由器实例
    const route = useRoute();
    watch(
      () => route.path,
      () => {
        autoplay.value = route.meta.background || false;
        // console.log(autoplay);
      }
    );

    function skinsConverter(skin) {
      return `background:url(static/images/skins/${skin}.jpg) no-repeat left/ cover;background-size: 150%;`;
    }

    return {
      autoplay,
      autoplaySpeed: 10000,
      current,
      speed,
      carouselRef,
      onChange,
      skinsConverter,
      carouselEle,
    };
  },
};
</script>

<style scoped>
.skin-background {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100vh);
  width: calc(100%);
  overflow: hidden;
  /* filter: blur(5px); */
}
.background-image {
  height: calc(100vh);
  width: calc(100%);
}
.background-image::after {
  content: "";
  position: absolute;
  inset: 0 0 0 0;
  background: inherit;
  filter: blur(5px);
}

.skin-background:after {
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
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.2) 45%,
    transparent 85%,
    transparent
  ); */
  opacity: 1;
  z-index: 0;
}

/* .skin-video {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
.skin-video video {
  opacity: 0.8;
  z-index: 1;
  background-image: radial-gradient(
    circle,
    transparent 0%,
    rgb(45 216 255 / 0.4) 20%,
    transparent 35%
  );
} */
</style>
