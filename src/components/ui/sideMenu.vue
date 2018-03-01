<style scoped>
  .sideMenu {
    float: left;
    height: calc(100% - 59px);
    width: 100%;
    background: #495060;
  }

  .ivu-menu {
    margin-top: 20px;
  }

  .ivu-menu-item {
    white-space: nowrap;
    font-size: 14px;
  }

  .ivu-menu-item-center {
    text-align: center;
  }

  .ivu-menu-item-center > i {
    margin-right: 0;
  }

  .sideMenu > ul {
    height: 100%;
  }

  .hide-text .menu-text {
    display: none;
  }

  .hide-text .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
    padding-left: 0;
    padding-right: 0;
    text-align: center;
  }

  .logo {
    width: 100%;
    height: 59px;
    line-height: 59px;
    font-size: 18px;
    text-align: center;
    color: #fff;
    background-color: #30374a;
    box-shadow: -2px -2px 16px #282e42;
  }
  .logo-pic {
    height: 32px;
    vertical-align: middle;
  }
  .logo span {
    margin-left: 8px;
  }
  .msg-tag {
    position: absolute;
    margin-top: 3px;
    right: 20px;
    line-height: 14px;
    background: #f8ac59;
    border-radius: 4px;
    color: #fff;
    font-size: 6px;
    padding: 0 4px;
  }
</style>
<template>
  <div class="sideMenu" :class="{'hide-text':spanLeft < 3}">
    <div class="logo">
      <img src="../../assets/pic_caiwu.png" class="logo-pic"><span v-if="spanLeft == 3">为蓝财务中心</span>
    </div>
    <Menu theme="dark" :active-name="activeName" width="auto" :open-names="openNames" ref="menu"
          @on-select="handleSelect">
      <div class="layout-logo-left"></div>
      <Menu-item :name="menu.name" v-for="menu in menuList" :key="menu.name"
                 :class="{'ivu-menu-item-center':spanLeft < 3}" v-if="!menu.children">
        <Icon :type="menu.icon" :size="iconSize"></Icon>
        <span class="menu-text">{{menu.text}}</span>
        <span class="msg-tag" v-show="menu.text == '提现处理'"  v-if="spanLeft == 3 && num > 0">{{num}}</span>
      </Menu-item>
    </Menu>
  </div>
</template>
<script>
  export default {
    props: {
      num: {
        type: Number
      },
      spanLeft: {
        type: Number,
        default: 3
      },
      iconSize: {
        type: Number,
        default: 14
      }
    },
    data () {
      return {
        // num: '',
        activeName: '',
        openNames: [],
        menuList: [
          {
            path: '/',
            name: '/',
            text: '财务总览',
            title: '财务总览',
            icon: 'easel'
          },
          {
            path: '/chargeRecord',
            name: 'chargeRecord',
            text: '充值记录',
            icon: 'ios-paper'
          },
          {
            path: '/refund',
            name: 'refund',
            text: '退款处理',
            icon: 'cube'
          },
          {
            path: '/bill',
            name: 'bill',
            text: '账单下载',
            icon: 'android-download'
          },
          {
            path: '/orderRecord',
            name: 'orderRecord',
            text: '订单记录',
            icon: 'android-list'
          },
          {
            path: '/withdrawals',
            name: 'withdrawals',
            text: '提现处理',
            icon: 'ios-calendar'
          },
          {
            path: '/company',
            name: 'company',
            text: '企业账户',
            icon: 'card'
          },
          {
            path: '/operator',
            name: 'operator',
            text: '运营商',
            icon: 'person-stalker'
          }
        ]
      }
    },
    methods: {
//       getNotDealWithTakeMoneyCount () {
//         this.$http.get('/financeCenter/api/getNotDealWithTakeMoneyCount')
//              .then((res) => {
//                if (res.data.data !== undefined) {
//                  console.log(res)
//                  this.num = res.data.data.count
//                }
// //               this.num = 1
//              })
//       },
      handleSelect (path) {
        console.log('handleSelect' + path)
        if (path === '/') {
          this.$router.push(path)
        } else {
          this.$router.push('/' + path)
        }
        this.$emit('onSelect', path)
      },
      update (route) {
        console.log('update route')
        const path = route ? route.path : this.$route.path
        const pathArray = path.split('/')
        console.log(pathArray)
        var openName = pathArray[1]
        var activeName = pathArray[1]
        if (pathArray[1] === '') {
          openName = '/'
          activeName = '/'
        }
        this.$set(this, 'activeName', activeName)
        this.$set(this, 'openNames', [openName])

        this.$nextTick(() => {
          this.$refs.menu.updateActiveName()
          this.$refs.menu.$children.forEach((item) => {
            item.opened = false
          })
          this.$refs.menu.updateOpened()
        })
      }
    },
    mounted () {
      this.update(this.$route)
    },
    watch: {
      '$route': function (route) {
        this.update(this.$route)
      }
    },
    computed: {}
  }
</script>
