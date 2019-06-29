<template>
  <div class="row h-100 align-items-center justify-content-center ">
    <div class="col-lg-9 h-100 p-6 appBox">

      <div class="row no-gutters h-100 shadow">
        <div class="col-lg-4">
          <button class="animated zoomIn  homeButton shadow-sm  btn btn-light rounded-circle d-flex align-items-center justify-content-center" @click="goHome"><i class="fas fa-home"></i></button>
          <div class="imageBox h-100 d-flex align-items-center justify-content-center">
            <div class="brand">
              <span class="logo mr-2"><i class="fas fa-smog"></i></span>
              <span class="brand-name">Wead<span class="brand-sub">er</span></span>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="app h-100 p-5">
            <div v-if="isLoading" class="loading d-flex align-items-center justify-content-center" :class="{ 'bg-white' : isDay ,'bg-dark' :!isDay }">
              <img src="../assets/ic_loading.svg" class="ic_loading" alt="Loading">
            </div>
             <div class="row no-gutters">
               <div class=" col-lg-6 col-md-4 col-sm-6 p-1 " v-for="castDay in forecastsData">
                  <div class="forecasts w-100 d-flex align-items-center justify-content-center flex-column">
                    <div class="day">{{weekDaysShortcut[new Date(castDay.date).getDay()]}}, <b>{{months[new Date(castDay.date).getMonth()]}} {{new Date(castDay.date).getFullYear()}}</b></div>
                    <img :src="forecastImg(castDay.day.avgtemp_c)">
                    <div>{{castDay.day.avgtemp_c}}
                      <span class="font-size-12"><b>°C</b></span>
                    </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Icons} from '../iconMixin'
  export default {
    mixins : [Icons],
    data(){
    return{
      forecastsData: [],
      weekDaysShortcut :['SUN','MON','TUE','WED','THU','FRI','SAT'],
      isLoading : true
    }
  },
    methods:{
      goHome(){
        this.$router.push({name :'home'})
      }
    },
  mounted() {
    this.$http.get('http://api.apixu.com/v1/forecast.json',{
      params :{
        key : 'e48b395a6c3b46eb9bf232622192706',
        q : this.$route.params.name,
        days : 8
      }
    }).then(response=>{
      return response.json();
    }).then(data =>{
      this.forecastsData = data.forecast.forecastday;
      this.isLoading = false;
    });
  }
}
</script>
<style lang="scss" scoped>
  $cardColor : #404040;


  .imageBox{
    background-image: url("../assets/left-bg.jpg");

    &:before{
      content: ' ';
      background: linear-gradient(to right top, #404040, #3c3e45, #323e4a, #213f4d, #00404c);
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.5;
    }
  }
  /*Padding*/
  .p-6{
    padding: 50px;
  }

  /* APP */
  .app{
    background-image: linear-gradient(to right top, #404040, #3c3e45, #323e4a, #213f4d, #00404c);
  }

  /*Brand box*/
  .brand{
    color: white;
    position: absolute;
    z-index: 99;

    .logo{
      font-size: 3rem;
    }
    .brand-name{
      font-size: 2rem;
      font-family: 'Russo One', sans-serif;

      .brand-sub{
        font-family: 'Montserrat', sans-serif;
      }
    }
  }


  .forecasts{
    background-image: linear-gradient(to right top, #ffffff, #f9f9f9, #f2f2f2, #ececec, #e6e6e6)!important;
    border-radius: 10px;

  }
  .homeButton{
    width: 35px;
    height: 35px;
    position: absolute;
    z-index: 10;
    left: 10px;
    top: 10px;

    &:hover{
     color: white;
      background-color:  #398dcf;
      border-color: #398dcf;
    }
  }
  .loading {
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px !important;
  }
  .day{
    font-family: 'Open Sans Condensed', sans-serif;
  }
</style>
