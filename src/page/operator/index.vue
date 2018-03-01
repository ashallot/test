<style scoped>
  .box{
    background-color:#fff;
    position: relative;
  }
  .list{
    width:100%;
    padding: 20px;
  }
  h5{
    font-size:14px;
    height:48px;
    line-height:48px;
    padding-left:15px;
    border-top:4px solid #e7eaec;
    border-bottom: 1px solid #e7eaec;
  }
  .row-gutter{
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


    <h5>运营商</h5>
    <div class="list">
      <div class="search">
        <Input placeholder="请输入关键字" style="width:300px;margin-right:10px;" v-model="keywords" @on-enter="search"/>
        <Button type="primary" @click="search">确定</Button>
      </div>
      <div v-if="!isEmpty" style="padding-top: 20px;">
        <Table :columns="columns" :data="data1" class="row-gutter"></Table>
        <Page :total="page1.allNum" :current="currentPage1"
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
        startDate: '',
        endDate: '',
        keywords: '',
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
            title: '运营收益',
            key: 'income'
          },
          {
            title: '提现总额',
            key: 'allTakeMoney'
          }
        ],
        data1: [],
        page1: {},
        currentPage1: 1
      }
    },
    mounted () {
      this.operatorRecords()
    },
    methods: {
      changePage (page) {
        this.currentPage1 = page
        this.operatorRecords()
      },
      operatorRecords () {
        this.$http.post('/financeCenter/api/operatorRecords', {
          page: this.currentPage1,
          keywords: this.keywords
        })
          .then((res) => {
            this.data1 = res.data.data.entities
            this.page1 = res.data.data.pageInfo
            if (this.data1.length > 0) {
              this.isEmpty = false
            } else {
              this.isEmpty = true
            }
          })
      },
      search () {
        this.operatorRecords()
      }
    }
  }
</script>
