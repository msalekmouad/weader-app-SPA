<template>
  <div class="row h-100 align-items-center justify-content-center ">
    <div class="col-lg-9 h-100 p-6 appBox">
      <div class="row no-gutters h-100 shadow">
        <div class="col-lg-4">
          <div class="imageBox h-100 d-flex align-items-center justify-content-center">
            <div class="brand ">
              <span class="logo mr-2"><i class="fas fa-smog"></i></span>
              <span class="brand-name">Wead<span class="brand-sub">er</span></span>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="app h-100 p-5 ">
            <div class="d-block mb-3 ">
              <div class="form-group position-relative">
                <span class="glyphicon"><i class="fas fa-search"></i></span>
                <span class="ic_loading"  :class="{hide : loadingClass}"><img src="../assets/spinner.svg" alt=""></span>
                <input type="text"  v-model.lazy="searchInput"   placeholder="Type city | country ..." class="form-control pl-5 bg-white rounded-pill" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="dropdown-menu  "  >
                  <a class="dropdown-item" v-if="autoCompleteArr.length == 0" >No suggestion</a>
                  <a class="dropdown-item" @click="getWeather(co.name)" v-else-if="autoCompleteArr.length!=0" v-for="co in autoCompleteArr" >{{co.name}}</a>
                </div>
              </div>
            </div>
            <app-weather class="" v-if="weatherObject!=''" :isLoading="isLoading"  :componentData="weatherObject"></app-weather>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import weather from './weather'
  export default {
    components:{
      appWeather : weather,

    },
    watch:{
      weatherObject(){
        if(this.weatherObject != ''){
          this.RenderIt = true;
        }else{
          this.RenderIt = true;
        }
      }, searchInput(){
        this.fetchSuggess(this.searchInput);
        console.log(this.autoCompleteArr);
      }
    },
    data(){
      return{
        autoCompleteArr : [],
        weatherObject : '',
        RenderIt : false,
        searchInput:'',
        isLoading: false,
        loadingClass :true
      }
    },
    mounted() {
      this.$http.get('http://api.apixu.com/v1/current.json',{
        params :{
          key : 'e48b395a6c3b46eb9bf232622192706',
            q : 'Casablanca'//,
          //days :'6'
        }
      }).then(response=>{
        return response.json();
      }).then(data =>{
        this.weatherObject = data;
        console.log(this.weatherObject);
        console.log('api attached');
      });
    },
    methods:{
      fetchSuggess(){
        this.loadingClass = false;
        this.autoCompleteArr = [];
        this.$http.get('http://api.apixu.com/v1/search.json',{
          params :{
            key : 'e48b395a6c3b46eb9bf232622192706',
            q : this.searchInput
          }
        }).then(response=>{
          return response.json();
        }).then(data =>{
          this.autoCompleteArr = data;
          this.loadingClass = true;
          console.log(this.autoCompleteArr);
        });
      },
      getWeather(name){
          this.searchInput = name;
          this.isLoading = true;
        this.$http.get('http://api.apixu.com/v1/current.json',{
          params :{
            key : 'e48b395a6c3b46eb9bf232622192706',
            q : name
            //days :'6'
          }
        }).then(response=>{
          return response.json();
        }).then(data =>{
          this.weatherObject = data;
          this.isLoading=false;
        });
      }
    }

  }
</script>
<style scoped lang="scss">
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

  input , input:focus , input:hover{
    outline: none!important;
    border: none!important;
    box-shadow: none!important;
  }

  .dropdown-menu{
    border-radius: 20px!important;

    .dropdown-item{
      border-radius: 20px!important;
    }
  }

  .glyphicon{
    position: absolute;
    right: 0;
    padding-right: 20px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.5;
  }


  .ic_loading{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 40px;
    width: 40px;
    img{
      width: 40px;
    }
  }

  .hide{
    display: none!important;
  }
</style>
