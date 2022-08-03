import Vue from 'vue';
import Router from 'vue-router';
// import Dashboard from '@/pages/Dashboard'
import Profile from '@/pages/Profile'
import Tables from '@/pages/Tables'
import Maps from '@/pages/Maps'
import BadGateway from '@/pages/BadGateway'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'Tables',
      component: Tables,
      props: { page: 1 },
      alias: '/'
    },
    {
      path: '/book/:id',
      name: 'Profile',
      props: { page: 2 },
      component: Profile
    },
    {
      path: '/books',
      name: 'Tables',
      props: { page: 3 },
      component: Tables
    },
    {
      path: '/maps',
      name: 'Maps',
      props: { page: 4 },
      component: Maps
    },
    {
      path: '/404',
      name: 'BadGateway',
      props: { page: 5 },
      component: BadGateway
    },
    {
      path: '*',
      props: { page: 5 },
      redirect: '/404'
    }
  ]
})