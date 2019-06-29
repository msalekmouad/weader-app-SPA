<template>
  <div class="container-fluid  h-100">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
body ,html{
  height: 100%;
  width: 100%;
  content: ' ';
  background-image: url("assets/bg.png");
  background-size: cover;
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  body:before{
    content: ' ';
    background-image: linear-gradient(to right top, #398dcf, #4894d3, #559bd7, #61a3db, #6daadf);
    background-size: cover;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.5;
  }

}


</style>
