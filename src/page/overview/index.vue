<style>
.big-blue-text {
  font-size: 28px;
  color: #14a7ff;
}
.little-gray-text {
  font-size: 14px;
  color: #787878;
}
.right-text {
  margin-top: -63px;
}
.right-text p {
  line-height: 32px;
}
.float-r {
  float: right;
}
.coupon-text {
  font-size: 14px;
  color: #333;
  text-align: center;
}
.unit-text {
  font-size: 14px;
  margin-left: 2px;
}
.money-text {
  font-size: 14px;
  color: #14a7ff;
  margin: 0 2px;
}
.split-line {
  height: 1px;
  width: 98%;
  margin: 10px auto;
  background: #eee;
}
</style>
<template>
  <div>
    <Row :gutter="16" style="margin: 0 0 20px 0">
      <i-col span="9">
        <Card :bordered="false">
          <p class="big-blue-text">{{incomeCount.allRechargeMoney}}<span class="unit-text">元</span></p>
          <p class="little-gray-text">平台累计充值金额</p>
          <div class="right-text float-r">
            <p>用户充值：<span class="money-text">{{incomeCount.personRechargeMoney}}元</span></p>
            <p>企业充值：<span class="money-text">{{incomeCount.businessRechargeMoney}}元</span></p>
          </div>
        </Card>
      </i-col>
      <i-col span="9">
        <Card :bordered="false">
          <p class="big-blue-text">{{incomeCount.allTotalMoney}}<span class="unit-text">元</span></p>
          <p class="little-gray-text">平台累计充电收益</p>
          <div class="right-text float-r">
            <p>充电费收益：<span class="money-text">{{incomeCount.allChargingFee}}元</span></p>
            <p>服务费收益：<span class="money-text">{{incomeCount.allServiceMoney}}元</span></p>
          </div>
        </Card>
      </i-col>
      <i-col span="6">
        <Card :bordered="false">
          <p class="coupon-text">优惠券发放：<span class="money-text">{{incomeCount.allChargingFee}}元</span></p>
          <div class="split-line"></div>
          <p class="coupon-text">优惠券使用：<span class="money-text">{{incomeCount.couponUsedMoney}}元</span></p>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="16" style="margin: 0 0 20px 0">
      <i-col span="6">
        <Card :bordered="false">
          <p slot="title">今日充值金额</p>
          <span style="font-size: 20px; color: #14a7ff;">{{ incomeCount.todayRechargeMoney }}<span class="unit-text">元</span></span>
        </Card>
      </i-col>
      <i-col span="6">
        <Card :bordered="false">
          <p slot="title">今日充电收益</p>
          <span style="font-size: 20px; color: #14a7ff;">{{ incomeCount.todayChargingMoney }}<span class="unit-text">元</span></span>
        </Card>
      </i-col>
      <i-col span="6">
        <Card :bordered="false">
          <p slot="title">暂时留空</p>
          <span style="font-size: 20px; color: #14a7ff;"><span class="unit-text">XXX</span></span>
        </Card>
      </i-col>
      <i-col span="6">
        <Card :bordered="false">
          <p slot="title">暂时留空</p>
          <span style="font-size: 20px; color: #14a7ff;"><span class="unit-text">XXX</span></span>
        </Card>
      </i-col>
    </Row>
    <Row style="padding:0 8px;">
      <i-col span="24" style="background-color: #ffffff;padding:20px;">
        <ve-line :data="chart1Data" :settings="chart2Settings" tooltip-visible legend-visible></ve-line>
      </i-col>
    </Row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        incomeCount: {},
        chart1Data: {
          columns: ['日期', '充电收益', '充值收益'],
          rows: []
        },
        grid: { left: 120, right: 20 },
        chart2Settings: {
          dimension: ['日期'],
          metrics: ['充电收益', '充值收益'],
          yAxisType: ['KMB'],
          yAxisName: ['收益(元)'],
          area: true
        }
      }
    },
    mounted () {
      this.getUserCount()
    },
    methods: {
      getUserCount () {
        this.$http.get('/financeCenter/api/getFinancialInfo')
          .then((res) => {
            if (res.data.data !== undefined) {
              console.log(res.data.data)
              this.incomeCount = res.data.data
              let array = []
              res.data.data.latestDaysChargingMoneyArr.forEach((el) => {
                let ob = {
                  充电收益: el.chargingMoney,
                  日期: el.date,
                  充值收益: el.rechargeMoney
                }
                array.push(ob)
              })
              this.chart1Data.rows = array.reverse()
            }
          })
      }
    }
  }
</script>
<style scoped>

</style>
