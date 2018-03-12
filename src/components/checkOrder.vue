<template>
  <div>
    <this-dialog :DialogShow="isShowCheckDialog" @closeDialog="checkStatus">
      <p>请检查你的支付状态</p><br>
      <div class="button" @click="checkStatus">
        支付成功
      </div>
      <div class="button" @click="checkStatus">
        支付失败
      </div>
    </this-dialog>
    <this-dialog :DialogShow="isShowSuccessDialog" @closeDialog="toOrderList('isShowSuccessDialog')">
        购买成功
    </this-dialog>
    <this-dialog :DialogShow="isShowFailDialog" @closeDialog="toOrderList('isShowFailDialog')">
        购买失败
    </this-dialog>
  </div>
</template>


<script>

  import ThisDialog from './base/dialog.vue'

  export default {
    props:{
      isShowCheckDialog:{
        type:Boolean,
        default:true
      },
      orderId:{
        type:[String,Number]
      }
    },
    components:{
      ThisDialog,
    },
    data () {
      return {
          isShowSuccessDialog:false,
          isShowFailDialog:false
      }
    },
    methods:{
      checkStatus () {
//        发送http请求
//        this.$http.post('/api/checkOrder',{orderId:this.orderId}).then((res)=>{
//
//        })
        this.$http.post('/api/checkOrder',{orderId:this.orderId}).then((res)=>{
//            有返回值，说明check成功
          this.isShowSuccessDialog = true;
          this.$emit('closeCheckDialog');  //通知父组件关闭对话框
        },(err)=>{
//            check失败
          this.isShowFailDialog = true;
          this.$emit('closeCheckDialog');
        })

      },
      toOrderList(attr){
        this[attr] = false;
//       跳转到orderlist页面
        this.$router.push({path:'/orderList'});
      }
    }
  }

</script>

<style scoped>

</style>
