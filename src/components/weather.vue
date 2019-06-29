<template>
    <div class="card text-center  " :class="{ 'bg-white' : isDay ,'bg-dark' :!isDay ,'text-white' : !isDay ,'text-dark' :isDay }">
      <div class="card-body " >
        <div v-if="isLoading" class="loading d-flex align-items-center justify-content-center" :class="{ 'bg-white' : isDay ,'bg-dark' :!isDay }">
          <img src="../assets/ic_loading.svg" class="ic_loading" alt="Loading">
        </div>
        <div class="row">
          <div class="col-lg-12">
            <h3 class="white">
              {{componentData.location.name}},<span class="font-weight-bold">{{componentData.location.country}}</span>
              <p class="weather-day-date mb-30">
                <span class="mr-3">{{weekDays[new Date(componentData.location.localtime).getDay()]}}</span> {{months[new Date(componentData.location.localtime).getMonth()]}}  , {{new Date(componentData.location.localtime).getFullYear()}}
              </p>
            </h3>
          </div>
          <div class="col-lg-12">
            <div  class="weatherHolder d-inline-block">
              <div class="weather_deg ">{{componentData.current.temp_c}}° C</div>
              <div class="weather_condition"><img :src="componentData.current.condition.icon" alt="">{{componentData.current.condition.text}}</div>
            </div>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-lg-3 col-md-4 col-sm-6 p-1" >
            <div class="forecasts shadow-sm">
              <div class="day">WIND</div>
              <img class="ic" :src="getImg(weatherIcons.windy)">
              <div>
                <span class="ic_font">{{componentData.current.wind_kph}} <b>km/h</b></span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 p-1" >
            <div class="forecasts shadow-sm">
              <div class="day">HUMIDITY</div>
              <img class="ic" :src="getImg(weatherIcons.humidity)">
              <div>
                <span class="ic_font">{{componentData.current.humidity}}</span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 p-1" >
            <div class="forecasts shadow-sm">
              <div class="day">PRESSURE</div>
              <img class="ic" :src="getImg(weatherIcons.pressure)">
              <div>
                <span class="ic_font">{{componentData.current.pressure_mb}} <b>mb</b></span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 p-1" >
            <div class="forecasts shadow-sm">
              <div class="day">PRECIPITATION</div>
              <img class="ic" :src="getImg(weatherIcons.precipitation)">
              <div>
                <span class="ic_font">{{componentData.current.precip_mm}} <b>mm</b></span>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <button class="btn btn-outline-primary btn-block rounded-pill mt-3 shadow" @click="getForecasts">Get Next 6 days <i class="fas fa-cloud-sun-rain ml-2"></i></button>
          </div>
        </div>
        <!--  <div class="col-lg-2 col-md-4 col-sm-6 p-1" v-for="castDay in componentData.forecast.forecastday">
            <div class="forecasts ">
              <div class="day">{{weekDaysShortcut[new Date(castDay.date).getDay()]}}</div>
              <img :src="forecastImg(castDay.day.avgtemp_c)">
              <div>{{castDay.day.avgtemp_c}}
                <span class="font-size-12"><b>°C</b></span>
              </div>
            </div>
          </div>-->

      </div>
    </div>

</template>
<script>
  import {Icons} from '../iconMixin'
  export default {
       mixins : [Icons],
      props:{
          componentData :{
            type : Object,
            required : true
          },
          isLoading :{
            type : Boolean,
            required: true
          }
      },
      data(){
        return{
            isDay:  true ,

        }
      },
    methods:{
      getForecasts(){
        this.$router.push({name :'forecast', params:{
            name : this.componentData.location.name
          }});
      }
    }
  }
</script>
<style scoped lang="scss">
  *{

  }
  .bg-dark{
    background-image: linear-gradient(to right top, #343a40, #3b4248, #424951, #495159, #505962)!important;
  }
  .bg-white{
    background-image: linear-gradient(to right top, #ffffff, #f9f9f9, #f2f2f2, #ececec, #e6e6e6)!important;
  }
  .card {
    border-radius: 20px!important;
    h3{
      font-size: 1.5rem;
      padding-top: 10px;
    }

    .weather-day-date{
      font-weight: lighter;
      font-size: 0.8rem;
      font-family: 'Montserrat', sans-serif;
    }
    .day{
      font-family: 'Open Sans Condensed', sans-serif;
    }
    .weather_deg{
      font-family: 'Russo One', sans-serif;
      font-size: 3rem;
    }
    .weather_icon{
      left: 0;
       height: 120px;
      z-index: 10;
    }
    .forecasts{
      background-color: #e6e6e6;
      border-radius: 10px;

    }
  }

  .card-body{
    .loading{
      position: absolute;
      z-index: 99;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 20px!important;

      .ic_loading{
        height: 50%;
      }
    }
    .ic{
      width: 50%;
    }
    .ic_font{
      font-size: 0.9rem;
      font-family: 'Open Sans Condensed', sans-serif;
    }
  }

  .btn{
    font-size: 0.8rem;
    font-family: 'Montserrat', sans-serif;
  }
</style>
