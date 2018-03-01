<style scoped>
  #main-app{width: 100%;height: 100%;}
</style>
<template>
  <div id="main-app">
    <Row class="main-row">
      <i-col :span="spanLeft">
        <sideMenu :spanLeft="spanLeft" :spanRight="spanRight" :iconSize="iconSize" :num="num" ref="sideMenu"></sideMenu>
      </i-col>
      <i-col :span="spanRight">
        <topBar @toggleClick="toggleClick"></topBar>
        <div id="router-view">
          <router-view @numChange="numChange"></router-view>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import sideMenu from '@/components/ui/sideMenu'
  import topBar from '@/components/ui/topBar'
  export default {
    components: {sideMenu, topBar},
    name: 'app',
    data () {
      return {
        num: 0,
        spanLeft: 3,
        spanRight: 21,
        nowId: 0
      }
    },
    computed: {
      iconSize () {
        return this.spanLeft === 3 ? 18 : 24
      }
    },
    methods: {
      getNotDealWithTakeMoneyCount () {
        this.$http.get('/financeCenter/api/getNotDealWithTakeMoneyCount')
             .then((res) => {
               if (res.data.data !== undefined) {
                 console.log(res)
                 this.num = res.data.data.count
               }
//               this.num = 1
             })
      },
      numChange () {
        console.log('numChange')
        this.num = this.num - 1
      },
      toggleClick () {
        if (this.spanLeft === 3) {
          this.spanLeft = 1
          this.spanRight = 23
        } else {
          this.spanLeft = 3
          this.spanRight = 21
        }
      }
    },
    mounted () {
      this.getNotDealWithTakeMoneyCount()
    }
  }
</script>
