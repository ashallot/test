<style scoped>
  .loginbg {
    background: url(https://bing.ioliu.cn/v1) no-repeat center/cover;
    background-color: #f5f8fa;
    height: 100%;
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .form {
    width: 400px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    height: 300px;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.65);
    padding: 30px;
    color: #fff;
    border-radius: 5px;
  }

</style>

<template>
<div class="loginbg bg-blur">
  <div class="form login-form">
    <i-form ref="formItem" :model="formItem" :rules="ruleValidate">
      <Form-item label="用户名" prop="user">
        <i-input type="text" v-model="formItem.adminUserName" placeholder="请输入" size="large" class="login-input">
          <Icon type="ios-person-outline" size="20" slot="prepend"></Icon>
        </i-input>
      </Form-item>
      <Form-item label="密码" prop="password">
        <i-input type="password" v-model="formItem.password" placeholder="请输入" size="large">
          <Icon type="ios-locked-outline" size="20" slot="prepend"></Icon>
        </i-input>
      </Form-item>
      <Form-item>
        <i-button type="primary" @click="handleSubmit" long :loading="loading" size="large">登录</i-button>
      </Form-item>
    </i-form>
  </div></div>
</template>

<script>
  import IForm from '../../node_modules/iview/src/components/form/form'
  export default {
    components: {IForm},
    name: 'login',
    data () {
      return {
        loading: false,
        formItem: {
          adminUserName: '',
          password: ''
        },
        ruleValidate: {
          adminUserName: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs['formItem'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$http.post('/financeCenter/api/adminUserLogin', {
              adminUserName: this.formItem.adminUserName,
              password: this.formItem.password
            })
              .then((res) => {
                this.loading = false
                if (res.data.data !== undefined) {
                  const loginData = {
                    adminId: res.data.data.adminId,
                    token: res.data.data.token
                  }
                  this.$auth.login(loginData)
                  const redirect = this.$route.query.redirect || '/'
                  this.$router.push({path: redirect})
                }
              })
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
