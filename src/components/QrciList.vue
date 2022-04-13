<template>
  <div class="page">
    <div class="container">
      <AGCMenu></AGCMenu>
      <div class="header-row">
        <div class="btn btn-secondary btn-sm" style="margin: 10px 10px 10px 0" @click="changeQrci('change',0)">+ добавить QRCI</div>
      </div>
      <div class="header-row">
        <button :disabled="!dept.status" class="btn__dept-name" v-for="(dept, ind) of message" :key="dept.department" @click="indDept = ind">{{dept.department}}</button>
      </div>
      <div class="">
        <div class="">Всего QRCI: {{qrciList[indDept].qrciList.length}}</div>
        <div class="">Открытых QRCI: {{countQrci.open}}</div>
        <div class="">QRCI с просроченными действиями: {{countQrci.timeIsUp}}</div>
      </div>

      <div class="header-row" v-for="item of qrciList[indDept].qrciList" :key="item.number" @click="changeQrci('show', indDept, item.number)" @mouseleave="item.show = false" @mouseover="item.show = true" v-bind:class="{timeIsUp: !item.status, isActive: !item.open }">
        <div class="header-col1to12">{{item.number}}</div>
        <div class="header-col2to3">{{item.problem}}</div>
        <div class="header-col1to12"><div v-if="item.open">открыт</div><div v-if="!item.open">закрыт</div></div>
        <div class="header-col1to12">{{dateQrci(item.date)}}</div>
        <div class="header-col1to12">{{item.lider}}</div>
        <div class="header-col1to12" @click="changeQrci('change',indDept, item.number)">Изменить</div>
        <div class="information" v-show="item.show">
          <div class="information-row" v-for="el of item.qrciRows" :key="el.id" v-bind:class="{timeIsUp: !el.status}">
            <div class="information-action">{{el.action}}</div>
            <div class="information-responsible">{{el.responsible}}</div>
            <div class="information-date">{{dateQrci(el.date)}}</div>
            <div class="information-line"></div>
          </div>
        </div>
      </div>
      
    </div>

  </div>
  
</template>

<script>
import axios from 'axios'
import AGCMenu from "./AGCMenu.vue"

export default {
  name: 'Home',
  components: {
    AGCMenu
  },
  data: function () {
    return {
        message: [],
        indDept: 0      
    }
  },
  mounted(){
    axios
      .get('http://localhost:8000/qrciList')
      .then(response => (this.message = response.data));
  },
  methods: {
    changeQrci(status, dep, num){
      this.$router.push('/'+status+'/'+dep +'/'+num)

    },
    dateQrci(val){
      let date = new Date(val)
      let str = date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear()
      return str
    },
    
  },
  computed: {
    qrciList(){
      return this.message
    },
    chooseDept(){
      for (i=0; i < this.message.length; i++){
        this.message[i].status = true
      }
      this.message[this.indDept].status = false
    },
    countQrci(){
      let count = {
        open: 0,
        timeIsUp: 0
      }
      for (let i=0; i < this.message[this.indDept].qrciList.length; i++){
        if (this.message[this.indDept].qrciList[i].open === true){
          count.open = count.open+1
          if (this.message[this.indDept].qrciList[i].status === false){
            count.timeIsUp += 1
          }
        }
      }
      return count
    }
  }
}
</script>
<style scoped src="../style/style.css">

</style>
