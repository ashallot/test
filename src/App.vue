<style>
  html{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",SimSun, sans-serif;
  }
  html,body,#app,.main-row{
    width: 100%;
    height: 100% !important;
    overflow: hidden;
    background: #f8f8f9;
  }
  #router-view{
    overflow: auto;
    padding:20px;
    height: calc( 100% - 58px );
    background-color: #f8f8f9;
    margin-bottom: -58px;
    /*overflow-x: hidden; */
  }
  .main-row>div{
    height: 100%;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
  .hide-text .ivu-menu-submenu-title{text-align: center;}
  .hide-text .ivu-menu-vertical .ivu-menu-submenu-title-icon{float: none;top:-4px;}
  hr{
    border: none;
    border-top: 1px solid #e9eaec;
  }
  .row-gutter{
    margin-bottom: 15px;
  }
  .text-right{
    text-align: right;
  }
  .label-left{
    width: 6em;
    display: inline-block;
  }
  .login-form .ivu-form-item-label{color:#fff !important;}

  .ivu-tabs-bar {
    margin-bottom: 0px;
  }
  div.ivu-table-header table, div.ivu-table-body table {
    width: 100%!important;
  }
</style>
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>



<script>
export default {
  name: 'app'
}
</script>
