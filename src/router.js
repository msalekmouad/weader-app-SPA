import Vue from 'vue'
import Router from 'vue-router'
import HomeComp from './components/Home'
import ForecastComp from './components/forecat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name : 'home',
      path : '',
      component : HomeComp
    },
    {
      name : 'forecast',
      path : '/forecast/:name',
      component : ForecastComp,
      beforeEnter :(to,from,next)=>{
        console.log(!to.params.name);
        next();
      }
    },
    {
      path :'*',
      component : HomeComp
    }
  ]
})
