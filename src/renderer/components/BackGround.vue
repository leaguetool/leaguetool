<template>
  <div class="skin-video">
    <video autoplay="" loop="" muted="" src="static/video/home.webm">
      <source src="" type="video/mp4" />
    </video>
  </div>
</template>

<style>
.skin-video {
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
  transform: translate3d(-10%, 0, 0);
  /* width: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0); */
}
</style>
