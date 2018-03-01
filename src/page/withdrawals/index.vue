<style scoped>
  .box {
    background-color: #fff;
  }

  .list {
    widht: 100%;
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
</style>
<template>
  <div class="box">
    <h5>提现处理</h5>
    <div v-if="!isEmpty" class="list">
      <Table :columns="columns" :data="data1" class="row-gutter"></Table>
      <Page :total="page1.allNum" :current="currentPage1"
            :page-size="15" @on-change="changePage"></Page>
    </div>
    <div v-if="isEmpty" class="empty-box">
      <img src="../../assets/SZWsRReGPEouTBXnCKMb.png" style="width: 102px;"/>
      <div class="empty-text">
        暂无相关记录
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isEmpty: true,
        columns: [
          {
            title: '运营商账号',
            key: 'operatorAccountNumber'
          },
          {
            title: '运营商名称',
            key: 'operatorName'
          },
          {
            title: '提现金额',
            key: 'money'
          },
          {
            title: '提现时间',
            key: 'time'
          },
          {
            title: '状态',
            key: 'status',
            width: 160,
            align: 'right'
          },
          {
            title: '操作',
            key: 'status',
            width: 160,
            align: 'right',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  display: this.data1[params.index].intStatus === 0 ? 'visible' : 'none'
                },
                on: {
                  click: () => {
                    this.handle(params.index)
                  }
                }
              }, '处理')
            }
          }
        ],
        data1: [],
        page1: {},
        currentPage1: 1
      }
    },
    mounted () {
      this.getNotDealWithTakeMoneyCount()
    },
    methods: {
      changePage (page) {
        this.currentPage1 = page
        this.getNotDealWithTakeMoneyCount()
      },
      getNotDealWithTakeMoneyCount () {
        this.$http.post('/financeCenter/api/operatorTakeMoneyList', {
          page: this.currentPage1
        })
          .then((res) => {
            console.log(res)
            this.data1 = res.data.data.entities
            this.page1 = res.data.data.pageInfo
            if (this.data1.length > 0) {
              this.isEmpty = false
            } else {
              this.isEmpty = true
            }
          })
      },
      dealWithTakeMoney (_id) {
        this.$http.post('/financeCenter/api/dealWithTakeMoney', {
          id: _id
        })
          .then((res) => {
            this.getNotDealWithTakeMoneyCount()
            this.$emit('numChange')
          })
      },
      handle (index) {
        this.dealWithTakeMoney(this.data1[index].id)
      }
    }
  }
</script>
