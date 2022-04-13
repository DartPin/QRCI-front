import Vue from 'vue'
import VueRouter from 'vue-router'
import QrciList from '../components/QrciList.vue'
import qrci from '../components/qrci.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'qrci',
    component: qrci
  },
  {
    path: '/QrciList',
    name: 'QrciList',
    component: QrciList
  },
  { path: '/:status/:dep/:id', 
    component: qrci,
    props: true
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
