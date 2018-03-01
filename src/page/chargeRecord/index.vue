<style scoped>
  .clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }

  .box {
    background-color: #fff;
    border-top: 4px solid #e7eaec;
  }

  .title {
    min-height: 48px;
    border-bottom: 1px solid #e7eaec;
    padding: 30px;
  }

  .left {
    display: inline-block;
    padding-left: 20px;
  }

  .right {
    float: right;
  }

  .right > .datas {
    float: left;
    padding: 0 15px;
  }

  .unit-text {
    font-size: 14px;
    margin-left: 4px;
  }

  p {
    font-size: 12px;
    color: #1d1d1d;
  }

  .tabs {
    padding: 20px;
  }

  .ivu-tabs-card > .ivu-tabs-content {
    height: 120px;
    margin-top: -16px;
  }

  .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
    background: #fff;
    padding: 16px;
    border: 1px solid #dddee1;
    border-top: none;
  }

  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    border-color: transparent;
  }

  .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
    border-color: #fff;
  }

  .row-gutter {
    margin-bottom: 15px;
  }
  div.ivu-table-header table, div.ivu-table-body table {
    width: 100%!important;
  }
  .search {
    /*position: absolute;*/
    z-index: 4;
    /*top: -4px;*/
    /*right: 0;*/
    display: flex;
    justify-content: flex-start;
  }
  .export-btn {
    position: absolute;
    z-index: 4;
    top: 44px;
    right: 0;
    color: #348eed;
    font-weight: bold;
  }
  .empty-box {
    min-height: 400px;
    padding-top: 100px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .empty-text {
    font-size: 14px;
    color: gray;
    margin: 20px 0 0;
  }
</style>
<template>
  <div class="box">
    <div class="title clearfix">
      <Row :gutter="16">
        <i-col span="1">
          <Icon type="ios-monitor" size="42" color="#45adf2"></Icon>
        </i-col>
        <i-col span="11">
          <h2>充值记录</h2>
          <p>总共有: {{ total.rechargeRecordsCount }}条记录</p>
        </i-col>
        <i-col span="4">
          <p>个人账户累计充值</p>
          <span style="font-size: 20px;">{{ total.appTotalRechargeMoney }}<span class="unit-text">元</span></span>
        </i-col>
        <i-col span="4">
          <p>充电卡累计充值</p>
          <span style="font-size: 20px;">{{ total.chargingCardTotalRechargeMoney }}<span class="unit-text">元</span></span>
        </i-col>
        <i-col span="4">
          <p>企业账户累计充值</p>
          <span style="font-size: 20px;">{{ total.businessAccountTotalRechargeMoney }}<span class="unit-text">元</span></span>
        </i-col>
      </Row>
    </div>
    <Row class="tabs">

      <i-col span="24">
        <div class="search">
          <DatePicker type="date" :options="option1" placement="bottom-end" placeholder="请选择开始日期" style="width: 240px;margin-right: 10px;" v-model="startDate"></DatePicker>
          <DatePicker type="date" :options="option2" placement="bottom-end" placeholder="请选择结束日期" style="width: 240px;" v-model="endDate"></DatePicker>
          <Select style="width:150px;margin:0 10px;" clearable placeholder="请选择支付方式" v-model="payway">
            <Option v-for="item in payWayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Input @on-enter="search" placeholder="请输入订单编号或用户账号" style="width:240px;margin-right:10px;" v-model="keywords"/>
          <Button type="primary" @click="search" style="margin-right:10px;">确定</Button>
          <Button @click="reset">重置</Button>

        </div>

        <Tabs style="padding-top: 20px;" type="card" :animated="false" @on-click="getTabId">
          <Tab-pane label="个人充值记录" name="data1">
            <div v-if="!canExport" class="empty-box">
              <img src="../../assets/SZWsRReGPEouTBXnCKMb.png" style="width: 102px;"/>
              <div class="empty-text">
                暂无记录，请更换条件重新搜索
              </div>
            </div>
            <Table v-if="canExport" :columns="columns1" :data="data1" class="row-gutter" ref="table1"></Table>
            <Page v-if="canExport" :total="page1.allNum" show-total
                  :page-size="userPageSize" @on-change="choosePage1"></Page>
          </Tab-pane>
          <Tab-pane label="企业充值记录" name="data2">
            <div v-if="!canExport" class="empty-box">
              <img src="../../assets/SZWsRReGPEouTBXnCKMb.png" style="width: 102px;"/>
              <div class="empty-text">
                暂无记录，请更换条件重新搜索
              </div>
            </div>
            <Table v-if="canExport" :columns="columns2" :data="data2" class="row-gutter" ref="table2"></Table>
            <Page v-if="canExport" :total="page2.allNum" show-total
                  :page-size="businessPageSize" @on-change="choosePage2">
            </Page>
          </Tab-pane>
        </Tabs>

        <!--<ul v-if="flag">-->
        <!--<li v-for="(n, index) in pages" class="page" :class='{ active: activeId1 === index }' v-if='Math.abs(activeId1 - index) <= 10' @click="choosePage1(index)">{{ n }}</li>-->
        <!--</ul>-->
        <!--<ul v-if="!flag">-->
        <!--<li v-for="(n, index) in pages" class="page" :class='{ active: activeId2 === index }' v-if='Math.abs(activeId2 - index) <= 10' @click="choosePage2(index)">{{ n }}</li>-->
        <!--</ul>-->
      </i-col>
    </Row>


  </div>
</template>
<script>
  export default {
    data () {
      return {
        userPageSize: 15,
        businessPageSize: 15,
        option1: {
          disabledDate: (date) => {
            if (this.endDate === '') {
              return date && date.valueOf() > Date.now()
            } else {
              var endDate = new Date(this.endDate)
              // console.log(' ---- ' + endDate)
              return date && date.valueOf() > endDate
            }
          }
        },
        option2: {
          disabledDate: (date) => {
            if (this.startDate === '') {
              return date && date.valueOf() > Date.now()
            } else {
              var startDate = new Date(this.startDate)
              // console.log(' ---- ' + startDate)
              return date && (date.valueOf() < startDate || date.valueOf() > Date.now())
            }
          }
        },
        payway: '',
        keywords: '',
        startDate: '',
        endDate: '',
        payWayList: [
          {
            value: '',
            label: '不选择'
          },
          {
            value: '2',
            label: '支付宝支付'
          },
          {
            value: '1',
            label: '微信支付'
          },
          {
            value: '3',
            label: '微信小程序支付'
          }
        ],
        activeId1: 1,
        activeId2: 1,
        page1: {},
        page2: {},
        n: 'data1',
        total: {},
        columns1: [
          {
            title: '创建时间',
            key: 'rechargeTime'
          },
          {
            title: '充值账号',
            key: 'rechargeNumber'
          },
          {
            title: '订单编号',
            key: 'orderNumber'
          },
          {
            title: '充值金额（元）',
            key: 'rechargeMoney',
            align: 'right',
            width: 180
          },
          {
            title: '充值渠道',
            key: 'payWay',
            align: 'right',
            width: 160
          },
          {
            title: '状态',
            key: 'rechargeStatus',
            align: 'right',
            width: 160
          }
        ],
        columns2: [
          {
            title: '充值时间',
            key: 'chargingTime'
          },
          {
            title: '订单编号',
            key: 'orderNumber'
          },
          {
            title: '企业名称',
            key: 'business'
          },
          {
            title: '充值金额',
            key: 'rechargeMoney',
            width: 180,
            align: 'right'
          },
          {
            title: '状态',
            key: 'chargingStatus',
            width: 160,
            align: 'right'
          }
        ],
        data1: [],
        data2: [],
        canExport: false
      }
    },
    methods: {
      choosePage1 (i) {
        this.activeId1 = i
        this.getApp(i)
      },
      choosePage2 (i) {
        this.activeId2 = i
        this.getBusiness(i)
      },
      getTabId (name) {
        if (this.n !== name) {
          this.n = name
          if (this.n === 'data1') {
            this.getApp(this.activeId1)
          } else {
            this.getBusiness(this.activeId2)
          }
        }
      },
      getTotal () {
        this.$http.get('/financeCenter/api/getRechargeRecords')
          .then((res) => {
            this.total = res.data.data
          })
      },
      getApp (page) {
        this.$http.post('/financeCenter/api/getRechargeRecordsByType/appRechargeRecord', {
          page: page,
          startDate: this.$auth.getDate(this.startDate),
          endDate: this.$auth.getDateLastTime(this.endDate),
          keywords: this.keywords,
          payWay: this.payway,
          maxNumber: this.userPageSize
        })
          .then((res) => {
            console.log(res)
            this[this.n] = res.data.data.entities
            this.page1 = res.data.data.pageInfo
            if (this.n === 'data1') {
              if (this.data1.length > 0) {
                this.canExport = true
              } else {
                this.canExport = false
              }
            }
          })
      },
      getBusiness (page) {
        this.$http.post('/financeCenter/api/getRechargeRecordsByType/businessAccountRechargeRecord', {
          page: page,
          startDate: this.$auth.getDate(this.startDate),
          endDate: this.$auth.getDateLastTime(this.endDate),
          keywords: this.keywords,
          payWay: this.payway,
          maxNumber: this.businessPageSize
        })
          .then((res) => {
            console.log(res)
            this[this.n] = res.data.data.entities
            this.page2 = res.data.data.pageInfo
            if (this.n === 'data2') {
              if (this.data2.length > 0) {
                this.canExport = true
              } else {
                this.canExport = false
              }
            }
          })
      },
      search () {
        console.log(this.$auth.getDate(this.startDate))
        console.log(this.$auth.getDate(this.endDate))
        if (this.n === 'data1') {
          this.getApp(1)
        } else {
          this.getBusiness(1)
        }

        // var reg = new RegExp('/', 'g')
        // console.log(this.startDate)
      },
      reset () {
        this.payWay = ''
        this.keywords = ''
        this.startDate = ''
        this.endDate = ''
      },
      exportData () {
        this.canExport = false
        var filename = Date.parse(new Date()) + ''
        if (this.n === 'data1') {
          console.log('导出data1')
          this.$refs.table1.exportCsv({
            filename: filename
          })
        } else if (this.n === 'data2') {
          console.log('导出data2')
          this.$refs.table2.exportCsv({
            filename: filename
          })
        }
        this.canExport = true
      }
    },
    mounted () {
      this.getTotal()
      this.getApp(this.url, 1)
      // this.getbusiness()
    }
  }
</script>
