<template>
  <div id="app">
    <NavBar bgcolor="#15ff95" color="#f00" center>
        <template #title><i class="iconfont icon-huanfu"></i> 个性装扮</template>
        <template #wbtn>
            <a class="wbtn" title="我的装扮"><i class="iconfont icon-tabbar3"></i></a>
        </template>
    </NavBar>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <CheckClientRuning title="请先打开LOL客户端" subTitle="您未启动游戏客户端，请先打开LOL客户端"></CheckClientRuning>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import CheckClientRuning from './components/CheckClientRuning.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    CheckClientRuning,
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
