export default{
  path: 'orderRecord',
  component: resolve => require(['@/page/orderRecord/index'], resolve),
  children: [
    {
      path: '/',
      component: resolve => require(['@/page/orderRecord/list'], resolve)
    },
    {
      path: 'edit/:orderId',
      name: 'orderDetail',
      component: resolve => require(['@/page/orderRecord/edit'], resolve)
    }
  ]
}
