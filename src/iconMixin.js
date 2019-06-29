export const Icons = {
  data(){
    return {
      weatherIcons: {
        cloudy : {
          day : 'cloudy-day-3.svg',
          night : 'cloudy-night-1.svg'
        },
        rainy:[
          'rainy-1.svg',
          'rainy-2.svg',
          'rainy-3.svg',
          'rainy-4.svg',
          'rainy-5.svg',
          'rainy-6.svg',
          'rainy-7.svg'
        ],
        snowy:[
          'snowy-1.svg',
          'snowy-2.svg',
          'snowy-3.svg',
          'snowy-4.svg',
          'snowy-5.svg',
          'snowy-6.svg',
          'snowy-7.svg'
        ],
        sunny: 'day.svg',
        thunder : 'thunder.svg',
        windy :'ic_windy.svg',
        humidity : 'ic_humidity.svg',
        pressure: 'ic_pressure.svg',
        precipitation : 'ic_precip.svg'
      },
      weekDays :['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      months :['January','February','March','April','May','June','July','August','September','October','November','December'],
      weekDaysShortcut :['SUN','MON','TUE','WED','THU','FRI','SAT'],
      }
    },
  methods:{
    getImgUrl(url){
      return require('./assets/icWeather/animated/'+url);
    },
    forecastImg(degree){
      var _deg = parseInt(degree);
      if(_deg >= 25){
        return this.getImgUrl(this.weatherIcons.sunny);
      }else if(_deg >= 15 && _deg <25){
        return this.getImgUrl(this.weatherIcons.cloudy.day);
      }
      else if (_deg >= 8 && _deg <15){
        return this.getImgUrl(this.weatherIcons.rainy[2]);
      }
      else{
        return this.getImgUrl(this.weatherIcons.snowy[2]);
      }
    },
    getImg(name){
      return require('./assets/'+name);
    }

  }
};
