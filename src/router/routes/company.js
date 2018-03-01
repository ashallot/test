export default{
  path: 'company',
  component: resolve => require(['@/page/company/index'], resolve),
  children: [
    {
      path: '/',
      component: resolve => require(['@/page/company/companyList'], resolve)
    },
    {
      path: 'orderList/:companyId',
      name: 'orderList',
      component: resolve => require(['@/page/company/orderList'], resolve)
    },
    {
      path: 'chargeList/:companyId',
      name: 'chargeList',
      component: resolve => require(['@/page/company/chargeList'], resolve)
    },
    {
      path: 'orderDetail/:orderId',
      name: 'companyOrderDetail',
      component: resolve => require(['@/page/company/orderDetail'], resolve)
    }
  ]
}
