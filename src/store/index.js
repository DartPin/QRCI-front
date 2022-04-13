import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    qrciList: 
    [
      {
        number: 48,
        date: 1648242000000,
        lider: "Люльков А.",
        sponsor: "Смеловский А.",
        team: "Шиманов А., Игнаткин А.",
        problem: "",
        problemPast: "",
        place: "",
        cause: "",
        status: true, 
        qrciRows: [
          {
            theme: "причина возникновения",
            action: "Проведение тестовых наработок на турецкой краске",
            responsible: "Люльков А.",
            date: 1648242000000,
            percent: "20",
            comment: "Вот как то так"
          },
          {
            theme: "причина возникновения",
            action: "Изменение в инструкции",
            responsible: "Люльков А.",
            date: 1648328400000,
            percent: "20",
            comment: "Вот как то так"
          },
        ]
      }
    ]
     
  },
  getters: {
    GET_QRCILIST: state => {
      return state.qrciList
    }
  },
  mutations: {
    NEWQRCI: (state, payload) => {
      if (payload.number === 0){
        payload.number = state.qrciList[state.qrciList.length-1].number + 1

        let arrDate = payload.date.split('.')
        if (arrDate[2].length < 4){
          arrDate[2] = "20"+ String(arrDate[2])

        }
        payload.date = new Date(Number(arrDate[2]), Number(arrDate[1])-1, Number(arrDate[0]), 0, 0, 0, 0)

        for(let item = 0; item <payload.qrciRows.length; item++){
          let arr2Date = payload.qrciRows[item].date.split('.')
          if (arr2Date[2].length < 4){
            arr2Date[2] = "20" + String(arr2Date[2])
          } 
          payload.qrciRows[item].date = new Date(Number(arr2Date[2]), Number(arr2Date[1])-1, Number(arr2Date[0]), 0, 0, 0, 0)         
        }

        state.qrciList.push(payload)
      } else {
        for (let i = 0; i < state.qrciList.length; i++){
          
          if (Number(state.qrciList[i].number) === Number(payload.number)){
            state.qrciList[i] = payload
          }
        }
      }
    },
    CHECK_DATE: (state) => {
      let dateNow = new Date();
      dateNow.setHours(0, 0, 0, 0)
      
      for (let i = 0; i < state.qrciList.length; i++){
        let checker = true;
        
        for (let x = 0; x < state.qrciList[i].qrciRows.length; x++){
          if (dateNow > state.qrciList[i].qrciRows[x].date){
            checker = false;
          }
        }
        state.qrciList[i].status = checker
      }
    }
  },
  actions: {
    SAVE_NEWQRCI: async (context, data) => {
      context.commit('NEWQRCI', data)
    },
    CHECK_DATE: async (context) => {
      context.commit('CHECK_DATE')
    }
  },
  modules: {
  }
})
