
<template>  
<div>
  <center>
  <a-card title="Welcome!" :bordered="false" style="width: 600px">
   <template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-alert type="error" :message="errorMsg" banner v-if="errorMsg"/>
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] }
        ]"
        placeholder="Username"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] }
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
    
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
        block
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>
  </a-card>
  </center>
</div>
</template>

<script>
export default {
  middleware: 'guest',
  layout: 'no_layout',
  data () {
    return {
      form: this.$form.createForm(this),
      errorMsg: ''
    };
  },
  mounted () {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      // this.form.validateFields();
    });
  },
  methods: {
   
    
    async handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFields( async (err, values) => {
        if (!err) {
          try {
             await this.$auth.login({
                  data: {
                    username: values.username,
                    password: values.password
                  }
            });
            this.$router.push(this.$route.query.redirect ? this.$route.query.redirect : '/');
          } catch (error) {
            // console.log(error)
            if(error.status == 200)
              this.errorMsg = error.data.errors.username[0]
          }
        }
      });
    },
  },
};
</script>