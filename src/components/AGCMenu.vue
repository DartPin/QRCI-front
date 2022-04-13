<template>
  <div class="menu">
      <figure class="js-toogle-burger" v-b-toggle.sidebar-1>
        <div class="inner">
          <span></span>
          <span style="margin-top:9px"></span>
          <span style="margin-top:18px"></span>
        </div>
      </figure>
      
        <b-sidebar id="sidebar-1" title="AGC" shadow>
        <div class="px-3 py-2">
            <b-list-group>
              <b-list-group-item variant="dark" v-for="(item, ind) of menuItems" :key="ind" @click="item.subMenu = !item.subMenu">{{item.text}}
                <b-list-group-item variant="secondary" style="font-size: 12px" v-for="(el, ind) of item.items" :key="ind" v-show="item.subMenu">{{el.text}}</b-list-group-item>  
              </b-list-group-item>
            </b-list-group>
        </div>
        </b-sidebar>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'Menu',
  components: {
  },
  data: function () {
    return {
        menuItems: [
          {
            text: "Качество",
            subMenu: false,
            items: [
              {
                text: "QRCI",
              },
              {
                text: "Сменный QRCI"
              }
            ]
          },
          {
            text: "Фотолаборатория",
            subMenu: false,
            items: [
              {
                text:"Заказ экранов"
              },
              {
                text: "Сменные задания"
              }
            ]
          },
          {
            text: "Логистический поезд",
            subMenu: false,
          }
        ]
    }
  },
  mounted() {      
      
  },
  methods: {
    
  },
  computed: {
    
  }
}
</script>

<style scoped src="../style/style.css">
    
</style>
