<template>
  <router-view />
</template>

<script>
  export default {
    name: 'root',
    mounted () {
      this.loginIn()
    },
    methods: {
      loginIn () {
        let adminId = this.$route.query.adminId
        let token = this.$route.query.token
        let userName = this.$route.query.userName
        if (adminId !== undefined && token !== undefined) {
          const data = {
            adminId: adminId,
            token: token,
            userName: userName
          }
          this.$auth.login(data)
        }
      }
    }
  }
</script>
