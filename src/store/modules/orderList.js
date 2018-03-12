import Vue from 'vue'

const state = {
      orderList:[],
      params:{
        productId:'',
        startDate:'',
        endDate:'',
        keyWord:''
      }
}

const getters = {
      getOrderList:function(state){
        return state.orderList
      }
}

const actions = {
      fetchOrderList ({commit,state}){
          Vue.http.post('/api/orderList',state.params).then((res)=>{
            commit('updateOrderList',res.data.list)
          },(err)=>{
              console.log(err);
          })
      //     Vue.http.get('/api/orderList').then((res)=>{
      //       commit('updateOrderList',res.data.list);
      //     })
      }
}

const mutations = {
      updateOrderList:function(state,orderList){
          state.orderList = orderList;
      },
      updateParams(state,{key,val}){
        state.params[key] = val;
      }
}

export  default {
  state,
  getters,
  actions,
  mutations
}
