<template>
  <div>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsedWidth="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
      v-if="authenticated"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="[selected]" >
        <a-menu-item key="1">
          <nuxt-link to="/" @click.native="onChange(1)"></nuxt-link>
          <a-icon type="home" />
          <span class="nav-text">Home</span>
        </a-menu-item>
        <a-menu-item key="2">
          <nuxt-link to="/course" @click.native="onChange(2)"></nuxt-link>
          <a-icon type="account-book" />
          <span class="nav-text">Courses</span>
        </a-menu-item>
        <a-menu-item key="3">
          <nuxt-link to="/trainee" @click.native="onChange(3)"></nuxt-link>
          <a-icon type="user" />
          <span class="nav-text">Trainee</span>
        </a-menu-item>
        <a-menu-item key="4">
          <nuxt-link to="/school" @click.native="onChange(4)"></nuxt-link>
          <a-icon type="bank" />
          <span class="nav-text">Schools</span>
        </a-menu-item>
        <a-menu-item key="5">
          <nuxt-link to="/emergency" @click.native="onChange(5)"></nuxt-link>
          <a-icon type="contacts" />
          <span class="nav-text">Emergency Contacts</span>
        </a-menu-item>
        <a-menu-item key="6">
          <nuxt-link to="/training" @click.native="onChange(6)"></nuxt-link>
          <a-icon type="schedule" />
          <span class="nav-text">Trainings</span>
        </a-menu-item>
        <a-menu-item key="7">
          <nuxt-link to="/account" @click.native="onChange(7)"></nuxt-link>
          <a-icon type="idcard" />
          <span class="nav-text">Accounts</span>
        </a-menu-item>
        <a-menu-item key="8">
          <nuxt-link to="/location" @click.native="onChange(8)"></nuxt-link>
          <a-icon type="environment" />
          <span class="nav-text">Locations</span>
        </a-menu-item>
        <a-menu-item key="9">
          <nuxt-link to="/reports" @click.native="onChange(9)"></nuxt-link>
          <a-icon type="file" />
          <span class="nav-text">Reports</span>
        </a-menu-item>
        <a-menu-item key="10">
          <!-- <nuxt-link to="/logout"></nuxt-link> -->
          <a-icon type="logout" />
          <a-popconfirm
            title="Logout ?"
            @confirm="() => logout()">
            <span class="nav-text">Logout</span>
          </a-popconfirm>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" v-if="authenticated" />
      <a-layout-content :style="{ margin: '30px 16px 0' }" v-if="authenticated">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '559px' }">
          <nuxt />
        </div>
      </a-layout-content>
      <a-layout-content :style="{ margin: '118px 16px 0' }" v-if="!authenticated">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '559px' }">
          <nuxt />
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center" v-if="authenticated">
        MSUN Training Management System
      </a-layout-footer>
    </a-layout>
  </a-layout>
  
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected : 1,
    }
  },
  methods: {
    onChange(arg){
      this.selected = arg
      console.log(this.selected)
    },
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
