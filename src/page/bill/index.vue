<style scoped>
  .box {
    background-color:#fff;
  }
  h5{
    font-size:14px;
    height:48px;
    line-height:48px;
    padding-left:15px;
    border-top:4px solid #e7eaec;
    border-bottom: 1px solid #e7eaec;
  }
  .list{
    width:100%;
    padding:15px 20px 20px;
  }
  .ivu-input-number {
    width: 100%;
  }
  .filter-box {
    /*position: absolute;*/
    z-index: 4;
    /*top: 12px;*/
    /*right: 20px;*/
    display: flex;
    justify-content: space-between;
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
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .empty-text {
    font-size: 14px;
    color: gray;
    margin: 20px 0 0;
  }
  .unit-text {
    font-size: 14px;
    margin-left: 4px;
  }
  .order-box {
    float: right;
  }
</style>
<template>
<div class="box">
  <h5>
    账单下载
  </h5>
  <div class="list">
    <div class="filter-box">
      <div style="float:left; margin-top: 10px; margin-bottom: 9px;">
        <RadioGroup style="float: left;" v-model="billType" type="button" @on-change="filterBillList">
          <Radio label="日账单"></Radio>
          <Radio label="月账单"></Radio>
        </RadioGroup>
        <DatePicker v-if="billType === '日账单'" @on-change="dayChanged" :value="day" :options="options" type="date" placeholder="选择日期" style="float: left;margin-left: 20px; width: 220px"></DatePicker>
        <DatePicker v-if="billType === '月账单'" @on-change="monthChanged" :value="month" :options="options" type="month" placeholder="选择月份" style="float: left;margin-left: 20px; width: 220px"></DatePicker>
        <Select style="width:150px;margin:0 10px;float: left;" clearable placeholder="请选择支付方式" v-model="payway" @on-change="payWayChanged">
          <Option v-for="item in payWayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Poptip
          style="float: left;"
          class="export-btn"
          placement="bottom"
          confirm
          title="导出文件格式为CVS，您确定要导出吗？"
          @on-ok="exportData">
          <Button v-if="canExport" type="primary">导出</Button>
        </Poptip>
      </div>
      <div style="color: #000000;">
        <div style="float: left; margin-right: 60px;text-align: left;">
          <p>订单总金额</p>
          <span style="font-size: 22px; color: #03be67;">+{{ orderAmount }}<span class="unit-text">元</span></span>
        </div>
        <div style="float: right;text-align: left; margin-right: 10px;">
          <p>订单总笔数</p>
          <span style="font-size: 22px; color: #000000;">{{ orderCount }}<span class="unit-text">笔</span></span>
        </div>
      </div>

    </div>
    <div v-if="!isEmpty" class="table-box">
      <Table :columns="columns" :data="data" class="row-gutter" ref="table"></Table>
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
  export default{
    data () {
      return {
        orderCount: 0,
        orderAmount: 0.0,
        isEmpty: true,
        canExport: false,
        month: this.currentMonth(),
        day: this.currentDay(),
        options: {
          disabledDate: (date) => {
            if (this.billType === '日账单') {
              return date && (date.valueOf() > this.maxDay())
            } else if (this.billType === '月账单') {
              return date && (date.valueOf() > this.maxMonth())
            }
          }
        },
        billType: '日账单',
        payway: '',
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
        columns: [
          {
            title: '充值时间',
            key: 'rechargeTime',
            sortable: true
          },
          {
            title: '订单编号',
            key: 'orderNumber'
          },
          {
            title: '充值账号',
            key: 'rechargeNumber'
          },
          {
            title: '充值渠道',
            key: 'payWay',
            width: 180,
            align: 'right'
          },
          {
            title: '业务类型',
            key: 'businessType',
            width: 160,
            align: 'right'
          },
          {
            title: '充值金额',
            key: 'rechargeMoney',
            width: 160,
            align: 'right'
          },
          {
            title: '备注',
            key: 'remark',
            width: 160,
            align: 'right'
          }
        ],
        data: []
      }
    },
    methods: {
      // 获取可以选择的最大的月份
      maxMonth () {
        var firstDate = new Date()
        firstDate.setDate(1)
        firstDate.setHours(0)
        firstDate.setMinutes(0)
        firstDate.setSeconds(0)

        firstDate = new Date(firstDate - 1000)
        return firstDate
      },
      // 获取可以选择的最大天数
      maxDay () {
        return Date.now() - 24 * 3600 * 1000
      },
      currentDay () {
        var now = new Date(this.maxDay())
        var month = parseInt(now.getMonth()) + 1
        var day = parseInt(now.getDate())

        var mStr = '00' + month
        mStr = mStr.substr(mStr.length - 2)

        var dStr = '00' + day
        dStr = dStr.substr(dStr.length - 2)

        return now.getFullYear() + '-' + mStr + '-' + dStr
      },
      currentMonth () {
        var now = new Date(this.maxMonth())
        var month = parseInt(now.getMonth()) + 1

        var mStr = '00' + month
        mStr = mStr.substr(mStr.length - 2)

        return now.getFullYear() + '-' + mStr
      },
      getAllRechargeRecords (startDate, endDate) {
        this.$http.post('/financeCenter/api/getAllRechargeRecords', {
          startDate: startDate,
          endDate: endDate,
          payWay: this.payway
        })
        .then((res) => {
          console.log(res)
          this.data = res.data.data.entities
          if (this.data.length > 0) {
            this.orderCount = this.data.length
            this.isEmpty = false
            this.canExport = true
            var amount = 0.0
            for (var i = 0; i < this.data.length; i++) {
              amount = amount + parseFloat(this.data[i].rechargeMoney)
            }
            this.orderAmount = amount.toFixed(2)
          } else {
            this.orderCount = 0
            this.isEmpty = true
            this.canExport = false
            this.orderAmount = 0.00
          }
        })
      },
      dayChanged (date) {
        console.log(date)
        this.day = date
        this.getAllRechargeRecords(this.day, this.day)
      },
      monthChanged (date) {
        this.month = date
        this.filterBillByMonth(this.month)
      },
      filterBillByMonth (date) {
        var start = date + '-01'
        var startDate = new Date(start + ' 00:00:00')
        var endDate = startDate
        var month = endDate.getMonth()

        if (month >= 11) {
          endDate.setFullYear(endDate.getFullYear() + 1)
          endDate.setMonth(1)
        } else {
          endDate.setMonth(endDate.getMonth() + 1)
        }
        endDate = endDate - 1000
        var end = this.$auth.getTimesDate(new Date(endDate))
        console.log(start + ' - ' + end)

        this.getAllRechargeRecords(start, end)
      },
      payWayChanged () {
        this.filterBillList()
      },
      filterBillList () {
        if (this.billType === '日账单') {
          this.getAllRechargeRecords(this.day, this.day)
        } else if (this.billType === '月账单') {
          this.filterBillByMonth(this.month)
        }
      },
      // 导出文件到本地
      exportData () {
        this.canExport = false
        var filename = this.getExportFilename()
        this.$refs.table.exportCsv({
          filename: filename,
          original: false,
          columns: self.columns
        })
        this.canExport = true
      },
      // 获取导出文件的文件名
      getExportFilename () {
        var filename = ''
        if (this.payway === '') {
          filename = filename + 'All'
        } else if (this.payway === '1') {
          filename = filename + 'Wechat'
        } else if (this.payway === '2') {
          filename = filename + 'Alipay'
        }
        if (this.billType === '日账单') {
          filename = filename + this.day
        } else if (this.billType === '月账单') {
          filename = filename + this.month
        }
        return filename
      }
    },
    mounted () {
      this.getAllRechargeRecords(this.day, this.day)
    }
  }
</script>
