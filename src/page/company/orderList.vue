<template lang="html">
  <div class="box">
    <h5>
      <Breadcrumb>
        <BreadcrumbItem href="/company">企业账户</BreadcrumbItem>
        <BreadcrumbItem>gofun</BreadcrumbItem>
        <BreadcrumbItem>订单记录</BreadcrumbItem>
      </Breadcrumb>
    </h5>
    <div class="list">
      <div class="search">
        <DatePicker type="date" placement="bottom-end" :options="option1" placeholder="请选择开始日期" style="width: 240px;margin-right: 10px;" v-model="startDate"></DatePicker>
        <DatePicker type="date" placement="bottom-end" :options="option2" placeholder="请选择结束日期" style="width: 240px" v-model="endDate"></DatePicker>
        <Input placeholder="请输入关键字" style="width:240px;margin:0 10px;" v-model="keywords"/>
        <Button type="primary" @click="search" style="margin-right:10px;">确定</Button>
        <Button @click="reset">重置</Button>
      </div>
      <div v-if="isEmpty" class="empty-box">
        <img src="../../assets/SZWsRReGPEouTBXnCKMb.png" style="width: 102px;"/>
        <div class="empty-text">
          暂无记录，请更换条件重新搜索
        </div>
      </div>
      <Table v-if="!isEmpty" :columns="columns" :data="data1" class="row-gutter" ref="table2"></Table>
      <Page v-if="!isEmpty" :total="page1.allNum" show-total
            :page-size="15" @on-change="choosePage">
      </Page>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isEmpty: false,
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
      page1: {},
      currentPage1: 1,
      columns: [
        {
          title: '订单编号',
          key: 'orderSn'
        },
        {
          title: '充电用户',
          key: 'userName'
        },
        {
          title: '订单时间',
          key: 'startTime'
        },
        {
          title: '订单总额',
          key: 'totalMoney',
          width: 120,
          align: 'right'
        },
        {
          title: '实付金额',
          key: 'realMoney',
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
                    name: 'companyOrderDetail',
                    params: {
                      orderId: 2515// params.row.orderId
                    }})
                }
              }
            }, '查看详情')
          }
        }
      ],
      data1: []
    }
  },
  mounted () {
    this.appChargingOrderRecord()
  },
  methods: {
    choosePage (page) {
      this.currentPage1 = page
      this.appChargingOrderRecord()
    },
    appChargingOrderRecord () {
      this.$http.post('/financeCenter/api/getBusinessAccountChargingRecords', {
        page: this.currentPage1,
        startDate: this.$auth.getDate(this.startDate),
        endDate: this.$auth.getDateLastTime(this.endDate),
        keywords: this.keywords,
        businessAccountId: this.$route.params.companyId
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
    },
    reset () {
      this.keywords = ''
      this.startDate = ''
      this.endDate = ''
    }
  }
}
</script>

<style lang="css">
.box {
  background-color:#fff;
}
h5{
  font-size: 14px;
  height: 48px;
  line-height: 48px;
  padding-left: 15px;
  border-top: 4px solid #e7eaec;
  border-bottom: 1px solid #e7eaec;
}
.list {
  width: 100%;
  padding: 20px;
  min-height: 500px;
}
.empty-box {
  min-height: 400px;
  padding-top: 100px;
  text-align: center;
  border-bottom: 1px solid #e6e6e6;
  margin-top: 15px;
  margin-bottom: 15px;
}
.empty-text {
  font-size: 14px;
  color: gray;
  margin: 20px 0 0;
}
.search {
  z-index: 4;
  display: flex;
  justify-content: flex-start;
}
.row-gutter {
  margin-top: 20px;
}
</style>
