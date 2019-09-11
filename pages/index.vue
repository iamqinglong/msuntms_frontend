<template>
    <div>
      <div style="background-color: #ececec; padding: 20px;">
        <a-row :gutter="16">
          <a-col :span="6">
            <a-card :bordered=false>
              <center><b>COURSES</b></center>
              <template class="ant-card-actions" slot="actions">
                <nuxt-link to="/course">
                <a-icon type="account-book" />
                </nuxt-link>
              </template>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card :bordered=false>
              <center><b>TRAINEE</b></center>
              <template class="ant-card-actions" slot="actions">
                <nuxt-link to="/trainee">
                <a-icon type="user" />
                </nuxt-link>
              </template>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card :bordered=false>
              <center><b>SCHOOLS</b></center>
              <template class="ant-card-actions" slot="actions">
                <nuxt-link to="/school">
                <a-icon type="bank" />
                </nuxt-link>
              </template>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card :bordered=false>
              <center><b>EMERGENCY CONTACTS</b></center>
              <template class="ant-card-actions" slot="actions">
                <nuxt-link to="/emergency">
                <a-icon type="contacts" />
                </nuxt-link>
              </template>
            </a-card>
          </a-col>
        </a-row>
        
        <br>
        <a-row :gutter="16">
          
          <a-col :span="6">
            <a-card :bordered=false>
              <center><b>TRAININGS</b></center>
              <template class="ant-card-actions" slot="actions">
                <nuxt-link to="/training">
                <a-icon type="schedule" />
                </nuxt-link>
              </template>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card :bordered=false>
              <center><b>ACCOUNTS</b></center>
              <template class="ant-card-actions" slot="actions">
                <nuxt-link to="/account">
                <a-icon type="idcard" />
                </nuxt-link>
              </template>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card :bordered=false>
              <center><b>LOCATIONS</b></center>
              <template class="ant-card-actions" slot="actions">
                <nuxt-link to="/location">
                <a-icon type="home" />
                </nuxt-link>
              </template>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card :bordered=false>
              <center><b>REPORTS</b></center>
              <template class="ant-card-actions" slot="actions">
                 <nuxt-link to="/reports">
                 <a-icon type="file" />
                 </nuxt-link>
              </template>
            </a-card>
          </a-col>
        </a-row>
      </div>
      
    </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  layout: 'clean_layout',
  middleware: 'auth',
  components: {
    // Logo
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
    
  },
  data() {
    return {
      numTrainees: 0,
    }
  },
  async mounted() {
   
  },
  methods: {
  
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
