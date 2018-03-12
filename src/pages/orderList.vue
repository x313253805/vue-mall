<template>
  <div class="order-wrap">
    <h3>你的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection :selections="products" @on-change="getProductId"></v-selection>
      </div>
      <div class="order-list-option">
        开始日期：
        <v-date-picker @on-change="getStartDate"></v-date-picker>
      </div>
      <div class="order-list-option">
        结束日期：
        <v-date-picker @on-change="getEndDate"></v-date-picker>
      </div>
      <div class="order-list-option">
        关键字：
        <input type="text" v-model.lazy="keyWord" class="order-query">
      </div>
      <!--<div class="button" @click="getOrderList">查找</div>-->
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="(head,index) in tableHeads" @click="chooseHead(index)" :class="{active:index === nowIndex}">{{ head.label }}</th>
        </tr>
        <tr v-for="item in orderList">
          <td v-for="head in tableHeads">{{ item[head.key] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

  import VSelection from '../components/base/selection.vue'
  import VDatePicker from '../components/base/datePicker.vue'

  import _ from 'lodash'

  export  default {
    components:{
      VSelection,VDatePicker
    },
    data () {
      return {
        products: [
          {
            label: '数据统计',
            value: 0
          },
          {
            label: '数据预测',
            value: 1
          },
          {
            label: '流量分析',
            value: 2
          },
          {
            label: '广告发布',
            value: 3
          }
        ],
        tableHeads: [
          {
            label: '订单号',
            key: 'orderId'
          },
          {
            label: '购买产品',
            key: 'product'
          },
          {
            label: '版本类型',
            key: 'version'
          },
          {
            label: '有效时间',
            key: 'period'
          },
          {
            label: '购买日期',
            key: 'date'
          },
          {
            label: '数量',
            key: 'buyNum'
          },
          {
            label: '总价',
            key: 'amount'
          }
        ],
        startDate:'',
        endDate:'',
        keyWord:'',
        productId:'',
//        orderList:[],
        nowIndex:0,
        currentOrder:'asc'
      }
    },
    methods:{
      getStartDate (date) {
//        this.startDate = date;
        this.$store.commit('updateParams',{
          key:'startDate',
          val:date
        });

        this.$store.dispatch('fetchOrderList');

//        console.log(this.startDate);
//        this.getOrderList();
      },
      getEndDate (date) {
//        this.endDate = date;
        this.$store.commit('updateParams',{
          key:'endDate',
          val:date
        });

        this.$store.dispatch('fetchOrderList');
//        console.log(this.endDate);
//        this.getOrderList();
      },
      getProductId (obj) {
//        this.productId = obj.value;
        this.$store.commit('updateParams',{
          key:'productId',
          val:obj.value
        });

        this.$store.dispatch('fetchOrderList');
//        this.getOrderList();
      },
      getOrderList(){
        let params = {
          productId:this.productId,
          startDate:this.startDate,
          endDate:this.endDate,
          keyWord:this.keyWord
        }
//        发送http请求
//        this.$http.post('/api/orderList',params).then((res)=>{
//
//        },(err)=>{
//
//        });
        this.$http.get('/api/orderList').then((res)=>{
//          console.log(res.data);
          this.orderList = res.data.list;
        },(err)=>{});
      },
      chooseHead(index){
        this.nowIndex = index;

        if (this.currentOrder === 'asc') {
          this.currentOrder = 'desc'
        }
        else if (this.currentOrder === 'desc') {
          this.currentOrder = 'asc'
        }
        let sortOrderList = this.$store.getters.getOrderList;
        sortOrderList = _.orderBy(sortOrderList, this.tableHeads[index].key, this.currentOrder);
        this.$store.commit('updateOrderList',sortOrderList);

      }
    },
    watch:{
      keyWord (){
//        this.getOrderList();
        this.$store.commit('updateParams',{
          key:'keyWord',
          val:this.keyWord
        });
        this.$store.dispatch('fetchOrderList');
      }
    },
    mounted(){
//      this.getOrderList();
      this.$store.dispatch('fetchOrderList');
//      console.log(this.$store);
    },
    computed:{
      orderList(){
        return this.$store.getters.getOrderList;
      }
    }
  }

</script>

<style scoped>
  .order-wrap {
    width: 1200px;
    min-height: 800px;
    margin: 20px auto;
    overflow: hidden;
  }
  .order-wrap h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .order-query {
    height: 25px;
    line-height: 25px;
    border: 1px solid #e3e3e3;
    outline: none;
    text-indent: 10px;
  }
  .order-list-option {
    display: inline-block;
    padding-left: 15px;
  }
  .order-list-option:first-child {
    padding-left: 0;
  }
  .button {
    padding:5px 10px;
    background-color: yellow;
    text-align: center;
    margin-left: 20px;
    color: #000;
  }
  .order-list-table {
    margin-top: 20px;
  }
  .order-list-table table {
    width: 100%;
    background: #fff;
  }
  .order-list-table tr {
    width:100%;
  }
  .order-list-table td,
  .order-list-table th {
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 10px 0;
  }
  .order-list-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
    cursor: pointer;
  }
  .order-list-table th.active {
    background: #35495e;
  }
</style>
