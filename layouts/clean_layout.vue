<template>
  <div>
 
    <a-layout>
      <a-layout-content :style="{ margin: '19px 58px 68px' }" >
        <div :style="{ padding: '24px', background: '#fff', minHeight: '559px' }">
          <nuxt />
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
        MSUN - Training Management System
      </a-layout-footer>
    </a-layout>
  
  
  </div>
</template>
<script>
export default {
  
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
     async logout() {
      //  console.log('fuck')
      await this.$auth.logout();
      this.$router.push({
                path: '/auth/login'
          });
    },
  }
}
</script>

<style>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
</style>
