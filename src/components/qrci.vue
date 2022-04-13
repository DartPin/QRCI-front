<template>
  <b-container class="bv-example-row">
    <AGCMenu></AGCMenu>
    <div class="header-row">
        <div class="header-label"> <img src="../assets/logo2.png" alt="" srcset="" class="logo"> </div>
        <div class="header-title">Протокол команды улучшения №{{qrci.number}} <div style="display: inline-block" class="rotate" @click="show = !show">&#9998;</div></div>
        <div class="header-date" v-if="show"> {{qrci.date}}</div>
        <div class="header-date" v-if="!show"> <input type="text" class="form-control" v-model="qrci.date" ></div>
    </div> 
    
    <div class="header-row" style="margin:-5px 0 20px 620px; text-align: center; font-weight: 300" v-if="show"><div v-if="qrci.open">открыт</div><div v-if="!qrci.open">закрыт</div></div>
    <div class="header-row" style="margin:-10px 0 20px 600px; text-align: center; font-weight: 700" v-if="!show">
      <button @click="qrci.open = false; show=!show" class="btn btn-secondary btn-sm">закрыть QRCI</button>
    </div> 

    <b-row class="text-center" v-if="show" style="margin-bottom: 20px">
      <b-col></b-col>
      <b-col>(производство "{{departments[department]}}")</b-col>
      <b-col></b-col>
      
    </b-row>

    <b-row class="text-center" v-if="!show" style="margin-bottom: 20px">
      <b-col></b-col>
      <b-col>
        (производство <select type="text" style="margin-left: 10px" class="btn btn-secondary btn-sm dropdown-toggle" v-model="department">
          <option v-for="(el, ind) of departments" :key="ind" :value="ind">{{el}}</option>
        </select>)
      </b-col>
      <b-col></b-col>
    </b-row>

    <b-row class="text-center">
      <b-col cols="1" class="bordered" v-bind:class="{NotActivePage: !pages[0] }" style="padding-top: 10px; font-size: 20px; border-radius: 10px 10px 0 0"  @click="pages = [true, false]">Протокол</b-col>
      <b-col cols="1" class="bordered" v-bind:class="{NotActivePage: !pages[1] }" style="padding-top: 10px; font-size: 20px; border-radius: 10px 10px 0 0;"  @click="pages = [false, true]">5 Why</b-col>
    </b-row>
    
    <transition name="fade">
    <div v-show="pages[0]">
      <b-row class="text-center">
            <b-col cols="2" class="bordered">Лидер команды:</b-col>
            <b-col v-if="show" cols="4" class="bordered">{{qrci.lider}}</b-col>
            <b-col v-if="!show" cols="4" class="bordered"><input type="text" class="form-control" v-model="qrci.lider"></b-col>
            <b-col cols="2" class="bordered">Участники:</b-col>
            <b-col v-if="show" cols="4" class="bordered">{{qrci.team}}</b-col>
            <b-col v-if="!show" cols="4" class="bordered"><input type="text" class="form-control" v-model="qrci.team"></b-col>
      </b-row>
      <b-row class="text-center">
            <b-col cols="2" class="bordered">Куратор команды:</b-col>
            <b-col v-if="show" cols="4" class="bordered">{{qrci.sponsor}}</b-col>
            <b-col v-if="!show" cols="4" class="bordered"><input type="text" class="form-control" v-model="qrci.sponsor"></b-col>
            <b-col cols="2" class="bordered"></b-col>
            <b-col cols="4" class="bordered"></b-col>
      </b-row>
            
      <b-row class="text-center">
        <b-col cols="2" class="bordered">Формулировка проблемы:</b-col>
        <b-col cols="10" v-if="show" class="bordered">{{qrci.problem}}  </b-col>
        <b-col cols="10" v-if="!show" class="bordered"><input type="text" class="form-control" v-model="qrci.problem"></b-col>
      </b-row>
      <b-row class="text-center">
            <b-col cols="2" class="bordered" style="height: 120px">Эта проблема может быть с другими заготовками или артиклями? Если да, то укажите с каими именно</b-col>
            <b-col v-if="show" cols="4" class="bordered" style="height: 120px">{{qrci.problemPast}}  </b-col>
            <b-col v-if="!show" cols="4" class="bordered" style="height: 120px"><textarea type="text" class="form-control" v-model="qrci.problemPast" rows="4"></textarea></b-col>
            <b-col cols="2" class="bordered" style="height: 120px;">Место и причина(-ы) НЕОБНАРУЖЕНИЯ несоответствия</b-col>
            <b-col v-if="show" cols="4" class="bordered" style="height: 120px">{{qrci.place}}  </b-col>
            <b-col v-if="!show" cols="4" class="bordered" style="height: 120px"><textarea type="text" class="form-control" v-model="qrci.place" rows="4"></textarea></b-col>
      </b-row>
      <b-row class="text-center" style="margin-bottom: 20px">
        <b-col cols="2" class="bordered">Коренные(-ая) причины(-а) ВОЗНИКНОВЕНИЯ несоответствия:</b-col>
        <b-col v-if="show" cols="10" class="bordered"> {{qrci.cause}} </b-col>
        <b-col v-if="!show" cols="10" class="bordered"> <input type="text" class="form-control" v-model="qrci.cause">  </b-col>
      </b-row>

      <b-row class="text-center">
        <b-col cols="1" class="bordered">№</b-col>
        <b-col cols="2" class="bordered">Тема</b-col>
        <b-col cols="3" class="bordered">Действие (что, где и как нужно сделать)</b-col>
        <b-col cols="1" class="bordered">ответственный</b-col>
        <b-col cols="1" class="bordered">К дате</b-col>
        <b-col cols="1" class="bordered">Выполнение(%)</b-col>
        <b-col cols="3" class="bordered">Комментарий</b-col>
      </b-row>
      <b-row class="text-center" v-for="(item, ind) of qrci.qrciRows" :key="ind">
        <b-col class="bordered" cols="1">{{ind+1}}</b-col>
        <b-col v-if="show" cols="2" class="bordered">{{item.theme}}</b-col>
        <b-col v-if="show" cols="3" class="bordered">{{item.action}}</b-col>
        <b-col v-if="show" class="bordered" cols="1">{{item.responsible}}</b-col>
        <b-col v-if="show" class="bordered" cols="1">{{item.date}}</b-col>
        <b-col v-if="show"  class="bordered" cols="1">{{item.percent}}%
          <div class="percent" v-bind:style="{width: item.percent*1.063+'px'}"></div>
        </b-col>
        <b-col v-if="show" cols="3" class="bordered">{{item.comment}}</b-col>
        
        <b-col v-if="!show" cols="2" class="bordered"><input type="text" class="form-control" v-model="item.theme"></b-col>
        <b-col v-if="!show" cols="3" class="bordered"><input type="text" class="form-control" v-model="item.action"></b-col>
        <b-col v-if="!show" class="bordered"><input type="text" class="form-control" v-model="item.responsible"></b-col>
        <b-col v-if="!show" class="bordered"><input type="text" class="form-control" v-model="item.date"></b-col>
        <b-col v-if="!show" class="bordered"><input type="text" class="form-control" v-model="item.percent"></b-col>
        <b-col v-if="!show" cols="3"  class="bordered"><input type="text" class="form-control" v-model="item.comment"></b-col>
      </b-row>
      <button @click="qrci.qrciRows.push({})" v-if="!show" class="btn btn-secondary btn-sm">+ новая строка</button>
      <button @click="saveQrci(qrci)" class="btn btn-secondary btn-sm" style="margin: 10px">сохранить</button>
    </div>
    </transition>

    <!-- Блок 5WHY  -->
    <transition name="fade">
    <div v-show="pages[1]" style="width: 100%; margin-left:-10px; border: 1px solid black">
      <div style="margin: 30px 0 0 0" v-if="show">
        <b-row>
          <b-col>5WHY-анализ №1</b-col>
        </b-row>
        <b-row v-for="(el, ind) of qrci.fiveWhy" :key="ind">
          <b-col cols="4" class="bordered" :style="el.style">{{el.text}}</b-col>
        </b-row>
      </div>

      <div style="margin: 30px 0 0 0" v-if="!show">
        <b-row>
          <b-col>5WHY-анализ №1</b-col>
        </b-row>
        <b-row v-for="(el, ind) of qrci.fiveWhy" :key="ind">
          <b-col cols="4" class="bordered" :style="el.style"><input type="text" class="form-control" v-model="el.text"></b-col>
        </b-row>
        <b-row>
          <b-col cols="1"> <div class="another-one" :style="butStyle" @click="addAnothOne()">+</div></b-col>
        </b-row>
      </div>
      
      <button @click="saveQrci(qrci)" class="btn btn-secondary btn-sm" style="margin: 10px">сохранить</button>
    </div>
    </transition>
    
  </b-container>
</template>

<script>
import axios from "axios"
import AGCMenu from "./AGCMenu.vue"
import AGCLoading from "./AGCLoading"

export default {
  name: 'Qrci',
  components: {
    AGCMenu,
    AGCLoading
  },
  data: function () {
    return {
        butStyle: "margin: 0 0 0 15px",
        pages: [true, false],
        department: 0,
        departments: ["Закаленное стекло", "Триплекс", "ARG", "AVO", "BRL-6"],
        show: true,
        date: {day: 0, month: 0, year: 0},
        qrci: {
          id: 0,
          number: 0,
          date: "",
          lider: "",
          sponsor: "",
          team: "",
          problem: "",
          problemPast: "",
          place: "",
          cause: "",
          status: true, 
          show: false,
          open: true,
          qrciRows: [
            {
              theme: "",
              action: "",
              responsible: "",
              date: "",
              percent: "",
              comment: "",
              status: true
            }
          ],
          fiveWhy:[
            {
              text: "first step",
              style: "margin: 0px 0 0 30px"
            }
          ]
        }
    }
  },
  mounted() {      
      if (this.$route.params.status === "change"){
        this.show = false
      } else {
        this.show = true
      }

      this.department = this.$route.params.dep
      if (this.department === undefined){
        this.department = 0
      }
      if (Number(this.$route.params.id) != 0 ){
        axios
        .get('http://localhost:8000/qrciList/department/' + this.$route.params.dep + '/qrci/' + this.$route.params.id) // менять адрес  передавать парамы!!!!!!!!
        .then(response => (this.qrci = response.data));  
      }
  },
  methods: {
    saveQrci(val){
      axios
        .post(`http://localhost:8000/`, {
          body: val, index: this.department
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(e => {
          this.errors.push(e);
        });
      this.$router.push('/QrciList')
    },
    addAnothOne(){
      let data = {
        text: "next step",
        style: "margin: 0 0 0 " + (this.qrci.fiveWhy.length+1)*30 + "px"
      }
      this.butStyle = "margin: 0 0 0 " + (((this.qrci.fiveWhy.length+1)*30)-15) + "px"
      this.qrci.fiveWhy.push(data)
    }
  },
  computed: {
    qrciList(){
      return this.qrci 
    },
    
  }
}
</script>

<style scoped src="../style/style.css">
    
</style>
