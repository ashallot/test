<style scoped>
  .topbar{
    background-color: #fff;
    height: 58px;
    line-height: 58px;
    box-shadow: 1px -5px 12px #666;
  }
  .dropdown{float: right;line-height: 58px;margin-right: 40px;}
  .name{color:#1c2438;}
</style>
<template>
  <div class="topbar">
    <i-button type="text" @click="toggleClick">
      <Icon type="navicon" size="32"></Icon>
    </i-button>
    <Dropdown class="dropdown" trigger="click">
        <a href="javascript:void(0)" class="name">
            <Avatar icon="person" />
            {{userName}}
            <Icon type="arrow-down-b"></Icon>
        </a>
        <Dropdown-menu slot="list">
            <!-- <Dropdown-item>用户信息</Dropdown-item> -->
            <Dropdown-item @click.native="backHome">退出栏目</Dropdown-item>
            <Dropdown-item divided @click.native="exitLogin">退出登录</Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        userName: '',
        formItem: {
          nick_name: ''
        },
        ruleValidate: {
          oldPsw: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
          newPsw: [{ required: true, message: '新密码不能为空', trigger: 'blur' }]
        },
        loading: false
      }
    },
    computed: {
      iconSize () {
      }
    },
    mounted () {
      let _self = this
      setTimeout(function () {
        _self.userName = _self.$auth.get().userName
      }, 5000)
    },
    methods: {
      submit () {
        this.$refs['formItem'].validate((valid) => {
          if (valid) {
            let formData = new FormData()
            formData.append('oldPsw', this.formItem.oldPsw)
            formData.append('newPsw', this.formItem.newPsw)
            this.loading = true
            this.$http.post('platform/changePsw', formData)
            .then((res) => {
              if (res.data.status.code === '200') {
                this.$Message.success('修改成功!')
                this.getUserInfo()
                this.modalShow = false
              }
            })
            this.loading = false
          }
        })
      },
      toggleClick () {
        this.$emit('toggleClick')
      },
      exitLogin () {
        this.$auth.logout()
        this.$Message.success('退出登录成功!')
        this.$router.push('/login')
        window.location.href = 'https://t.govlan.com/govlan/logout'
      },
      backHome () {
        window.location.href = 'https://t.govlan.com/govlan/home'
      },
      getUserInfo () {
        this.$http.get('platform/getAdmin', {params: {
          adminId: this.$auth.get().userId
        }})
        .then((res) => {
          this.formItem = res.data.data
        })
      }
    }
  }
</script>
