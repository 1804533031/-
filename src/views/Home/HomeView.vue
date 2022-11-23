<template>
  <van-nav-bar title="首页" fixed placeholder>
    <template #right>
      <van-icon name="search" size="20" @click="search" />
    </template>
  </van-nav-bar>
  <Swipe :images="images"></Swipe>
  <van-grid :gutter="10">
      <van-grid-item icon="shopping-cart-o" text="商店" to="/store" />
    <van-grid-item icon="balance-list-o" text="我的订单"  to="/order" />
    <van-grid-item icon="gift-o" text="我的领养" to="/myAdopt"  />
    <van-grid-item icon="photo-o" text="清空备忘" @click="clear"/>
  </van-grid>
  <div class="seckill" @click="goFlashSale">
    <img src="@/assets/images/Snipaste_2022-11-20_15-51-10.png" alt="" />
    <p class="text">限时秒杀<br />0元抢购</p>
  </div>
  <e-charts class="chart" :option="option" />

  <van-calendar v-model:show="show" @confirm="onConfirm" />
  <van-divider dashed>今日备忘录</van-divider>

  <van-cell-group inset>
    <!-- <van-field label="文本" model-value="输入框只读"  /> -->
    <van-field
      label="日期"
      :model-value="date"
      readonly
      placeholder="点击此框以备忘"
      @click="show = true"
    />

    <van-field
      v-model="value"
      label="备忘内容"
      placeholder="请输入备忘内容"
      v-if="date.length != 0"
      @blur="blur"
      :readonly="readonly"
    />
  </van-cell-group>
</template>

<script>
import Swipe from '@/components/Swipe.vue'
import { useRouter } from 'vue-router'
import { ref, computed, reactive ,onMounted,nextTick} from 'vue'
import Cookie from 'js-cookie'
import { Calendar } from 'vant';
import { Dialog } from 'vant';
export default {
  setup() {
    const images = reactive([
      require('@/assets/images/011.png'),
      require('@/assets/images/012.png'),
      require('@/assets/images/013.png'),
      require('@/assets/images/014.png'),
      require('@/assets/images/015.png')
    ])
    const router = useRouter()
    const data = ref([
      {
        value: Math.round(Math.random() * 500),
        name: '鸟'
      },
      {
        value: Math.round(Math.random() * 500),
        name: '猫'
      },
      {
        value: Math.round(Math.random() * 500),
        name: '鱼'
      },
      {
        value: Math.round(Math.random() * 500),
        name: '羊'
      },
      {
        value: Math.round(Math.random() * 500),
        name: '狗'
      }
    ])
    console.log(data.value)
    setInterval(() => {
      data.value = data.value.map((item) => ({
        ...item,
        value: Math.round(Math.random() * 500)
      }))
    }, 10000)
    const option = computed(() => {
      return {
        title: {
          text: '领养热度图',
          subtext: '2022年',
          left: 'right'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '领养数',
            type: 'pie',
            radius: '50%',
            data: data.value.map((data) => data),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    })
    function goFlashSale() {
      router.push({
        name: 'flashSale'
      })
    }
    function search() {
      console.log('seach')
      router.push({
        name: 'seach'
      })
    }

    let readonly=ref(false)
    const date = ref('');
    const show = ref(false);
   const  value=ref('')
    const formatDate = (date) => `${date.getFullYear() }/${date.getMonth() + 1}/${date.getDate()}`;
    const onConfirm = (value) => {
      show.value = false;
      date.value = formatDate(value);
    };
    const blur=()=> {
      console.log("一个弹出框");
      if (value.value!='') {
        Dialog.confirm({
  title: '注意',
  message:
    '确认修改今日备忘?(修改后将锁定)',
})
  .then(() => {
    // on confirm
    readonly.value=true
    
    const msgs={
      data:date.value,
      msg:value.value
    }
  Cookie.set(Cookie.get('userName'),JSON.stringify(msgs)
    
  )  
  })
  .catch(() => {
    // on cancel
    readonly.value=false
  });
      } else{
        alert('备忘内容不能为空')
      }
    
    }
 let clear=()=>{
    readonly.value=false
    value.value='';
    date.value=''
nextTick(()=>{
 Cookie.set(Cookie.get('userName'),'')
})
   
    
  }
  onMounted(()=>{
    // console.log(JSON.parse(Cookie.get('userInfo')).userName);
    if(Cookie.get(Cookie.get('userName'))){
      console.log(Cookie.get('userName'));
   date.value=JSON.parse(Cookie.get(Cookie.get('userName'))).data
   value.value=JSON.parse(Cookie.get(Cookie.get('userName'))).msg
   readonly.value=true
    }

  })
    return {
      images,
      search,
      goFlashSale,
      option,
      date,
      show,
      value,
      onConfirm,
      blur,
      clear,
      readonly
    }
  },
  components: {
    Swipe
  }
}
</script>

<style lang="less" scoped>
.seckill {
  position: relative;
  border-radius: 10px;
  margin: 10px 10px 0px 10px;
  height: 100px;
  padding: 1px;
  background-image: url('@/assets/images/bgimg.png');
  background-size: 110% 110%;
  // border: 1px solid transparent;
  img {
    margin-top: 10px;
    margin-left: 220px;
    height: 80px;
    border-radius: 5px;
  }
  .text {
    position: absolute;
    left: 50px;
    top: 20px;
    color: white;
    font-size: 25px;
    font-weight: 600;
    text-align: center;
  }
}
.chart {
  margin-top: 10px;
  padding: 0px 20px 0px 20px;
  height: 140px;
  width: 100%;
}
.van-grid {
  margin-top: 20px;
  /deep/.van-grid-item__content--center {
    background-color: whitesmoke;
    border-radius: 10px;
  }
}
.van-divider{
  font-size: larger;
  border-color: coral;
}
.van-cell{
  border-bottom: 1px solid  rgb(141, 95, 141);


}
</style>
