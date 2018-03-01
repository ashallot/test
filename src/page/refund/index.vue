<style scoped>
  .box {
    background-color: #fff;
    position: relative;
  }

  .list {
    width: 100%;
    padding: 20px;
  }

  h5 {
    font-size: 14px;
    height: 48px;
    line-height: 48px;
    padding-left: 15px;
    border-top: 4px solid #e7eaec;
    border-bottom: 1px solid #e7eaec;
  }

  .row-gutter {
    margin-top: 0px;
    margin-bottom: 15px;
  }

  .search {
    /*position: absolute;*/
    z-index: 4;
    /*top: 14px;*/
    /*right: 20px;*/
    display: flex;
    justify-content: flex-start;
  }

  .empty-box {
    min-height: 400px;
    padding-top: 100px;
    text-align: center;
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
  <div>
    <div class="box">
      <h5>退款记录</h5>
      <div class="list">
        <!-- <div class="search">
          <Input placeholder="请输入关键字" style="width:300px;margin-right:10px;" v-model="keywords" @on-enter="search"/>
          <Button type="primary" @click="search">确定</Button>
        </div> -->
        <div v-if="!isEmpty">
          <Table :columns="columns" :data="data" class="row-gutter"></Table>
          <Page :total="page.allNum" show-total
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
    <Modal
      v-model="modal1"
      @on-ok="ok"
      title="请输入管理员账号密码">
      <i-form ref="formItem" :model="formItem" :rules="ruleValidate">
        <Form-item label="用户名" prop="user">
          <i-input type="text" v-model="formItem.adminUserName" placeholder="请输入" size="large" class="login-input">
          </i-input>
        </Form-item>
        <Form-item label="密码" prop="password">
          <i-input type="password" v-model="formItem.password" placeholder="请输入" size="large">
          </i-input>
        </Form-item>
      </i-form>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isEmpty: true,
        startDate: '',
        endDate: '',
        keywords: '',
        modal1: false,
        type: 0,
        formItem: {
          adminUserName: '',
          password: ''
        },
        ruleValidate: {
          adminUserName: [
            {required: false, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: false, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        },
        columns: [
          {
            title: '订单编号',
            key: 'orderNumber'
          },
          {
            title: '退款账号',
            key: 'userName'
          },
          {
            title: '退款金额',
            key: 'money'
          },
          {
            title: '退款理由',
            key: 'refuseReason'
          },
          {
            title: '状态',
            key: 'status'
          },
          {
            title: '申请管理员',
            key: 'adminNickName'
          },
          {
            title: '申请时间',
            key: 'applyTime'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 180,
            render: (h, params) => {
              console.log(JSON.stringify(params.row.statusCode))
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: parseInt(this.data[params.index].statusCode) === 400 ? 'visible' : 'none'
                  },
                  on: {
                    click: () => {
                      this.formItem.adminUserName = ''
                      this.formItem.password = ''
                      this.modal1 = true
                      this.type = 1
                      this.orderId = params.row.orderId
//                      this.ensureRefund(params.row.orderId)
                    }
                  }
                }, '立即退款'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    display: parseInt(this.data[params.index].statusCode) === 400 ? 'visible' : 'none'
                  },
                  on: {
                    click: () => {
                      this.formItem.adminUserName = ''
                      this.formItem.password = ''
                      this.modal1 = true
                      this.type = 2
                      this.orderId = params.row.orderId
//                      this.refuseRefund(params.row.orderId)
                    }
                  }
                }, '拒绝退款')
              ])
            }
          }
        ],
        data: [],
        page: {},
        currentPage: 1
      }
    },
    mounted () {
      this.getRefundList()
    },
    methods: {
      changePage (page) {
        this.currentPage = page
        this.getRefundList()
      },
      // 获取退款订单记录列表
      getRefundList () {
        this.$http.post('/financeCenter/api/getRefundApplyRecords', {
          page: this.currentPage
        })
          .then((res) => {
            this.data = res.data.data.entities
            if (this.data.length > 0) {
              this.isEmpty = false
            } else {
              this.isEmpty = true
            }
            if (res.data.data.pageInfo !== undefined) {
              this.page = res.data.data.pageInfo
            }
          })
      },
      ok () {
        if (this.type === 1) {
          this.ensureRefund()
        } else if (this.type === 2) {
          this.refuseRefund()
        }
      },
      ensureRefund () {
        this.$http.post('/financeCenter/api/dealWithRefundApply/ensureRefund', {
          adminUserName: this.formItem.adminUserName,
          password: this.formItem.password,
          orderId: this.orderId
        })
          .then((res) => {
            this.$Modal.remove()
            this.getRefundList()
          })
      },
      refuseRefund () {
        this.$http.post('/financeCenter/api/dealWithRefundApply/refuseRefund', {
          adminUserName: this.formItem.adminUserName,
          password: this.formItem.password,
          orderId: this.orderId
        })
          .then((res) => {
            this.$Modal.remove()
            this.getRefundList()
          })
      },
      search () {
        this.getRefundList()
      }
    }
  }
</script>
