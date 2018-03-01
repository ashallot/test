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
    padding: 20px;
  }
  .ivu-input-number {
    width: 100%;
  }
</style>
<template>
<div class="box">
  <h5>
    <Breadcrumb>
      <BreadcrumbItem href="/company">企业账户</BreadcrumbItem>
      <BreadcrumbItem>gofun</BreadcrumbItem>
      <BreadcrumbItem to="">订单记录</BreadcrumbItem>
      <BreadcrumbItem>订单详情</BreadcrumbItem>
    </Breadcrumb>
  </h5>
  <div class="list">
    <i-form label-position="top">
      <Row :gutter="18">
        <i-col span="8">
          <Form-item label="订单编号">
            <i-input readonly :value="formItem.charging_order_sn"></i-input>
          </Form-item>
        </i-col>
        <i-col span="8">
          <Form-item label="订单时间">
            <i-input readonly :value="formItem.charging_start_time"></i-input>
          </Form-item>
        </i-col>
        <i-col span="8">
          <Form-item label="支付用户">
            <i-input readonly :value="formItem.loss_power"></i-input>
          </Form-item>
        </i-col>
      </Row>
      <Row :gutter="18">
        <i-col span="8">
          <Form-item label="电站名称">
            <i-input readonly :value="formItem.charging_station_name"></i-input>
          </Form-item>
        </i-col>
        <i-col span="8">
          <Form-item label="设备名称">
            <i-input readonly :value="formItem.charging_pile_name"></i-input>
          </Form-item>
        </i-col>
        <i-col span="8">
          <Form-item label="设备编号">
            <i-input readonly :value="formItem.operator_id"></i-input>
          </Form-item>
        </i-col>
      </Row>
      <Row :gutter="18">
        <i-col span="8">
          <Form-item label="订单总额">
            <i-input readonly :value="formItem.total_money"></i-input>
          </Form-item>
        </i-col>
        <i-col span="8">
          <Form-item label="实付金额">
            <i-input readonly :value="formItem.surplus_time"></i-input>
          </Form-item>
        </i-col>
        <i-col span="8">
          <Form-item label="优惠抵扣">
            <i-input readonly :value="formItem.coupon_money"></i-input>
          </Form-item>
        </i-col>
      </Row>
      <Row :gutter="18">
        <i-col span="8">
          <Form-item label="充电费用">
            <i-input readonly :value="formItem.charging_money"></i-input>
          </Form-item>
        </i-col>
        <i-col span="8">
          <Form-item label="服务费用">
            <i-input readonly :value="formItem.service_fee"></i-input>
          </Form-item>
        </i-col>
        <i-col span="8">
          <Form-item label="服务优惠">
            <i-input readonly :value="formItem.discount_money"></i-input>
          </Form-item>
        </i-col>
      </Row>
      <Row :gutter="18">
        <i-col span="8">
          <Form-item label="充电时长">
            <i-input readonly :value="formItem.charging_time"></i-input>
          </Form-item>
        </i-col>
        <i-col span="8">
          <Form-item label="开始时间">
            <i-input readonly :value="formItem.charging_start_time"></i-input>
          </Form-item>
        </i-col>
        <i-col span="8">
          <Form-item label="结束时间">
            <i-input readonly :value="formItem.charging_end_time"></i-input>
          </Form-item>
        </i-col>
      </Row>
      <Row :gutter="18">
        <i-col span="8">
          <Form-item label="充电电量">
            <i-input readonly :value="formItem.charging_the_battery"></i-input>
          </Form-item>
        </i-col>
        <i-col span="8">
          <Form-item label="充电方式">
            <i-input readonly :value="formItem.pay_way"></i-input>
          </Form-item>
        </i-col>
        <i-col span="8">
          <Form-item label="充电卡号">
            <i-input readonly :value="formItem.blue_card_number"></i-input>
          </Form-item>
        </i-col>
      </Row>
    </i-form>
  </div>
</div>
</template>
<script>
  export default{
    data () {
      return {
        loading: false,
        formItem: {
          charging_record_id: '',
          charging_order_sn: '',                           // 订单编号
          user_id: '',
          charging_pile_id: '',
          connector_id: '',
          charging_station_name: '',      // 电站名称
          charging_pile_name: '',               // 设备名称
          charging_time: '',
          charging_start_time: '',                    // 订单时间，开始时间
          charging_end_time: '',                      // 结束时间
          charging_money: '',                         // 充电费用
          total_money: '',                            // 订单总额
          is_normal: true,
          charging_the_battery: '',                   // 充电电量
          pay_way_fee: '',
          service_fee: '',                            // 服务费用
          coupon_money: '',
          charging_status: '',
          blue_card_number: '',
          pay_way: '',
          power_percent: '',
          start_ammeter: '',
          end_ammeter: '',
          stop_type: '',                              // 结束类型
          loss_power: '',                             // 支付用户
          surplus_time: '',                           // 实付金额
          operator_id: '',                            // 设备编号
          discount_money: ''
        }
      }
    },
    methods: {
      getChargingOrderDetail () {
        this.$http.post('/financeCenter/api/getChargingOrderDetail', {
          orderId: this.$route.params.orderId
        })
          .then((res) => {
            this.formItem.charging_order_sn = res.data.data.orderDetailInfo.charging_order_sn
            this.formItem.connector_id = res.data.data.orderDetailInfo.connector_id
            this.formItem.charging_station_name = res.data.data.orderDetailInfo.charging_station_name
            this.formItem.charging_pile_name = res.data.data.orderDetailInfo.charging_pile_name
            this.formItem.charging_time = res.data.data.orderDetailInfo.charging_time
            this.formItem.leaderPhone = res.data.data.orderDetailInfo.leader_phone
            this.formItem.servicePhone = res.data.data.orderDetailInfo.service_phone
            this.formItem.charging_start_time = res.data.data.orderDetailInfo.charging_start_time
            this.formItem.charging_end_time = res.data.data.orderDetailInfo.charging_end_time
            this.formItem.charging_money = res.data.data.orderDetailInfo.charging_money
            this.formItem.total_money = res.data.data.orderDetailInfo.total_money
            this.formItem.charging_the_battery = res.data.data.orderDetailInfo.charging_the_battery
            this.formItem.pay_way_fee = res.data.data.orderDetailInfo.pay_way_fee
            this.formItem.service_fee = res.data.data.orderDetailInfo.service_fee
            this.formItem.coupon_money = res.data.data.orderDetailInfo.coupon_money
            this.formItem.blue_card_number = res.data.data.orderDetailInfo.blue_card_number
            this.formItem.pay_way = res.data.data.orderDetailInfo.pay_way
            this.formItem.power_percent = res.data.data.orderDetailInfo.power_percent
            this.formItem.start_ammeter = res.data.data.orderDetailInfo.start_ammeter
            this.formItem.end_ammeter = res.data.data.orderDetailInfo.end_ammeter
            this.formItem.stop_type = res.data.data.orderDetailInfo.stop_type
            this.formItem.loss_power = res.data.data.orderDetailInfo.loss_power
            this.formItem.surplus_time = res.data.data.orderDetailInfo.surplus_time
            this.formItem.operator_id = res.data.data.orderDetailInfo.operator_id
            this.formItem.discount_money = res.data.data.orderDetailInfo.discount_money
          })
      }
    },
    mounted () {
      this.getChargingOrderDetail()
    }
  }
</script>
