/*
 * 路由配置文件
 */
import Vue from 'vue'
import Router from 'vue-router'

// Pages
import root from '@/page/root'
import layout from '@/page/layout'

// Utils
// import auth from '@/utils/auth'

// routes，每个菜单的路由单独独立出来
// import login from './routes/login'
import chargeRecord from './routes/chargeRecord'
import operator from './routes/operator'
import orderRecord from './routes/orderRecord'
import withdrawals from './routes/withdrawals'
import overview from './routes/overview'
import bill from './routes/bill'
import refund from './routes/refund'
import company from './routes/company'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: root,
      children: [
        {
          path: '/',
          component: layout,
          children: [
            overview,
            chargeRecord,
            operator,
            orderRecord,
            withdrawals,
            bill,
            refund,
            company
          ],
          meta: {
            requiresAuth: true
          }
        }
        // login
      ]
    }
  ]
})

export default router
