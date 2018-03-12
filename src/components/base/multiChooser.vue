<template>
  <div class="multi-chooser-component">
    <ul class="multi-chooser-list">
      <li v-for="(item,index) in multiChoosers" :title="item.label" :class="{active:nowIndex.indexOf(index) != -1}" @click="toggleChoose(index)">{{ item.label}}</li>
    </ul>
  </div>
</template>


<script>

  import _ from 'lodash'

  export default {
    props:{
      multiChoosers:{
        type:Array,
        default:[{
          label:'test',
          value:0
        }]
      }
    },
    data () {
      return {
        nowIndex:[0]
      }
    },
    methods:{
      toggleChoose (index) {
        if(this.nowIndex.indexOf(index) == -1){
          //添加到数组中
          this.nowIndex.push(index);
        }else{
//          从数组中删除指定元素
//          定义方法删除数组中指定的元素
//          function removeByValue(arr,value){
//            for(var i=0;i<arr.length;i++){
//              if(arr[i] == value){
//                arr.splice(i,1);
//                break;
//              }
//            }
//          }

//          调用方法删除index对应项
//          removeByValue(this.nowIndex,index);

          this.nowIndex = _.map(this.nowIndex,(idx)=>{
            return idx !== index;
          });




        }

//        将数据传送给父组件
//        this.$emit('on-change',this.nowIndex);
        let nowIndexObj = _.map(this.nowIndex,(idx)=>{
          return this.multiChoosers[idx];
        })

        this.$emit('on-change',nowIndexObj);
      }
    }
  }

</script>

<style scoped>
  .multi-chooser-component {
    position: relative;
    display: inline-block;
  }
  .multi-chooser-list li{
    display: inline-block;
    border: 1px solid #e3e3e3;
    height: 25px;
    line-height: 25px;
    padding: 0 8px;
    margin-right: 5px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }
  .multi-chooser-list li.active {
    border-color: #4fc08d;
    background: #4fc08d;
    color: #fff;
  }
</style>
