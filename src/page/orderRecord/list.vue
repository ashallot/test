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

  h5 {
    font-size: 18px;
    font-weight: 600;
    color: inherit;
  }

  .unit-text {
    font-size: 14px;
    margin-left: 4px;
  }

  p {
    font-size: 12px;
    color: #1d1d1d;
  }

  .row-gutter {
    margin-bottom: 15px;
  }

  .tabs {
    padding: 20px;
    position: relative;
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

  .page {
    float: left;
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    text-align: center;
    margin: 2px 5px;
  }

  .active {
    background-color: red;
    color: #fff;
  }
  .search {
    /*position: absolute;*/
    z-index: 4;
    /*top: 12px;*/
    /*right: 20px;*/
    display: flex;
    justify-content: flex-start;
  }
  .table-box {
    margin-top: 20px;
  }
  .empty-box {
    min-height: 400px;
    padding-top: 100px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    margin-top: 20px;
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
        <i-col span="15">
          <h2>订单记录</h2>
          <p>总共有: {{total.orderCount}}条记录</p>
        </i-col>
        <i-col span="4">
          <p>今日新增线上订单</p>
          <span style="font-size: 20px;">{{ total.todayAppOrdersCount }}<span class="unit-text">个</span></span>
        </i-col>
        <i-col span="4">
          <p>今日新增刷卡订单</p>
          <span style="font-size: 20px;">{{ total.todayCardOrdersCount }}<span class="unit-text">个</span></span>
        </i-col>
      </Row>
    </div>
    <div class="tabs">
      <div class="search">
        <DatePicker type="date" placement="bottom-end" :options="option1" placeholder="请选择开始日期" style="width: 240px;margin-right: 10px;" v-model="startDate"></DatePicker>
        <DatePicker type="date" placement="bottom-end" :options="option2" placeholder="请选择结束日期" style="width: 240px" v-model="endDate"></DatePicker>
        <Input placeholder="请输入关键字" style="width:240px;margin:0 10px;" v-model="keywords"/>
        <Button type="primary" @click="search" style="margin-right:10px;">确定</Button>
        <Button @click="reset">重置</Button>
      </div>
      <div v-if="!isEmpty" class="table-box">
        <Table :columns="columns1" :data="data1" class="row-gutter"></Table>
        <Page :total="page1.allNum"  show-total
              :page-size="15" @on-change="changePage"></Page>
      </div>
      <div v-if="isEmpty" class="empty-box">
        <img src="../../assets/SZWsRReGPEouTBXnCKMb.png" style="width: 102px;"/>
        <div class="empty-text">
          暂无记录，请更换条件重新搜索
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isEmpty: true,
        option1: {
          disabledDate: (date) => {
            if (this.endDate === '') {
              return date && date.valueOf() > Date.now()
            } else {
              var endDate = new Date(this.endDate)
              console.log(' ---- ' + endDate)
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
              console.log(' ---- ' + startDate)
              return date && (date.valueOf() < startDate || date.valueOf() > Date.now())
            }
          }
        },
        startDate: '',
        endDate: '',
        keywords: '',
        data2: [],
        columns2: [],
        n: 0,
        total: {},
        data1: [],
        page1: {},
        currentPage1: 1,
        columns1: [
          {
            title: '订单编号',
            key: 'orderNumber'
          },
          {
            title: '充电用户',
            key: 'userName'
          },
          {
            title: '订单时间',
            key: 'orderTime'
          },
          {
            title: '订单总额',
            key: 'totalMoney',
            width: 120,
            align: 'right'
          },
          {
            title: '实付金额',
            key: 'practicalMoney',
            width: 120,
            align: 'right'
          },
          {
            title: '服务优惠',
            key: 'discountMoney',
            width: 120,
            align: 'right'
          },
          {
            title: '优惠券抵扣',
            key: 'couponMoney',
            width: 120,
            align: 'right'
          },
          {
            title: '操作',
            key: 'detail',
            width: 100,
            align: 'right',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    console.log(this.$router)
                    this.$router.push({
                      name: 'orderDetail',
                      params: {
                        orderId: params.row.orderId
                      }})
                  }
                }
              }, '查看详情')
            }
          }
        ]
      }
    },
    mounted () {
      this.getChargingOrderRecords()
      this.appChargingOrderRecord()
    },
    methods: {
      changePage (page) {
        this.currentPage1 = page
        this.appChargingOrderRecord()
      },
      getChargingOrderRecords () {
        this.$http.get('/financeCenter/api/getChargingOrderRecords')
          .then((res) => {
            this.total = res.data.data
          })
      },
      appChargingOrderRecord () {
        this.$http.post('/financeCenter/api/getChargingOrderRecordsByType/appChargingOrderRecord', {
          page: this.currentPage1,
          startDate: this.$auth.getDate(this.startDate),
          endDate: this.$auth.getDateLastTime(this.endDate),
          keywords: this.keywords
        })
          .then((res) => {
            this.data1 = res.data.data.entities
            if (this.data1.length > 0) {
              this.isEmpty = false
            } else {
              this.isEmpty = true
            }
            if (res.data.data.pageInfo !== undefined) {
              this.page1 = res.data.data.pageInfo
            }
          })
      },
      search () {
        this.appChargingOrderRecord()

        // var reg = new RegExp('/', 'g')
        console.log(this.startDate)
      },
      reset () {
        this.keywords = ''
        this.startDate = ''
        this.endDate = ''
      }
    }
  }
</script>
