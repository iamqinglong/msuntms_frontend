<template>
<div>
    <a-button type="primary" @click="showModal">
    Add New Account
    </a-button>
  <a-table :dataSource="data" :columns="columns" rowKey="uid">
    <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" class='custom-filter-dropdown'>
      <a-input
        v-ant-ref="c => searchInput = c"
        :placeholder="`Search ${column.dataIndex}`"
        :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
        style="width: 188px; margin-bottom: 8px; display: block;"
      />
      <a-button
        type='primary'
        @click="() => handleSearch(selectedKeys, confirm)"
        icon="search"
        size="small"
        style="width: 90px; margin-right: 8px"
      >Search</a-button>
      <a-button
        @click="() => handleReset(clearFilters)"
        size="small"
        style="width: 90px"
      >Reset</a-button>
    </div>
    <a-icon slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : undefined }" />
    <template slot="customRender" slot-scope="text">
      <span v-if="searchText">
        <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
          <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</mark>
          <template v-else>{{fragment}}</template>
        </template>
      </span>
      <template v-else>{{text}}</template>
      
    </template>

    <span slot="action" slot-scope="key, record">
      <a @click="()=> edit(key, record)">Edit</a>
    </span>

  </a-table>

<a-modal
      v-model="visible"
      :title="modalTitle"
      onOk="handleOk"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" :title="buttonTitle" type="primary" html-type="submit" :loading="loading" @click="handleOk">
        {{buttonTitle}}        
        </a-button>
      </template>
      <a-form :form="form">
            <a-form-item
            label="Username"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'username',
                {rules: [{ required: true, message: 'Please input desired username!' }]}
                ]"
            />
            </a-form-item>
            <a-form-item
            label="Email"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'email',
                {rules: [{  required: true, message: 'Please input desired email!' },{
                            type: 'email', message: 'The input is not valid E-mail!',
                        },]}
                ]"
            />
            </a-form-item>
            <a-form-item
            label="Password"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'password',
                {rules: [{ required: true, message: 'Please input desired password!' },{validator: validateToNextPassword}]}
                ]"
                type="password"
            />
            </a-form-item>
            <a-form-item
            label="Confirm Password"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'confirm',
                {rules: [{ required: true, message: 'Please input desired password!' },{validator: compareToFirstPassword}]}
                ]"
                type="password"
                @blur="handleConfirmBlur"
            />
            </a-form-item>
            <a-form-item
            label="First Name"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'firstname',
                {rules: [{ required: true, message: 'Please input desired username!' }]}
                ]"
            />
            </a-form-item>
            <a-form-item
            label="Middle Name"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'middlename',
                {initialValue : ''},
                {rules: [{ required: false, message: 'Please input desired username!' }]}
                ]"
            />
            </a-form-item>
            <a-form-item
            label="Last Name"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'lastname',
                {rules: [{ required: true, message: 'Please input desired username!' }]}
                ]"
            />
            </a-form-item>
        </a-form>

</a-modal>

</div>
</template>

<script>


function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
    middleware: 'auth',
    async asyncData({params, error, $axios, store}) {
        try {
            let res = await $axios.get(`/users`)
            console.log(res.data.data)
            // cacheData = res.data.map(item => ({ ...item }))
            return {
                data: res.data.data
            }
        } catch (error) {
            console.log(error.data)
        }
        
    },
    data () {
        // this.cacheData = data.map(item => ({ ...item }))
        return {
            confirmDirty: false,
            modalTitle : "New Account",
            buttonTitle : "New",
            key : '',
            value : '',
            buttonType: '',
            hasErrors,
            form: this.$form.createForm(this),
            count: 5,
            //   data,
            loading: false,
            visible: false,
            searchText: '',
            searchInput: null,
            columns: [{
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'customRender',
                },
                onFilter: (value, record) => record.username.toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => {
                    this.searchInput.focus()
                    },0)
                }
                },
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'customRender',
                },
                onFilter: (value, record) => record.email.toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => {
                    this.searchInput.focus()
                    },0)
                }
                },
            },
            {
                title: 'First Name',
                dataIndex: 'firstname',
                key: 'firstname',
                scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'customRender',
                },
                onFilter: (value, record) => record.firstname.toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => {
                    this.searchInput.focus()
                    },0)
                }
                },
            },
            {
                title: 'Middle Name',
                dataIndex: 'middlename',
                key: 'middlename',
                scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'customRender',
                },
                onFilter: (value, record) => record.middlename.toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => {
                    this.searchInput.focus()
                    },0)
                }
                },
            },
            {
                title: 'Last Name',
                dataIndex: 'lastname',
                key: 'lastname',
                scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'customRender',
                },
                onFilter: (value, record) => record.lastname.toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => {
                    this.searchInput.focus()
                    },0)
                }
                },
            },
            {
                title: 'Action',
                key: 'action',
                scopedSlots: { customRender: 'action' },
            },
            ],
        }
    },
  methods: {
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },

    showModal() {
      this.form.resetFields();
      this.visible = true;
      this.buttonType = 'add'
      this.buttonTitle ='New'
      this.modalTitle ='New Account'
    },
    async handleOk(e) {
      //ADD
      if(this.buttonType == 'add')
      {
        this.form.validateFields( async (err, values) => {
        if (!err) {
          this.loading = true;
          console.log('Received values of form: ', values);
          try {
                let user = await this.$axios.post(`/auth/register`,{
                  username: values.username,
                  email: values.email,
                  password: values.password,
                  firstname: values.firstname,
                  middlename: values.middlename,
                  lastname: values.lastname
                })
               console.log(user.data)
               if(!user.data.success){

                    Object.entries(user.data.errors).forEach(([key,val])=> {
                        console.log(`'${key}'`);
                            this.$nextTick(() => {
                                this.form.setFields({[key] : {value:this.form.getFieldValue(key),errors:[new Error(val[0])]}})
                            });
                    });

               }else{
                    let data = {
                        uid : user.data.data.id,
                        username: user.data.data.username,
                        email: user.data.data.email,
                        firstname: user.data.data.firstname,
                        middlename: user.data.data.middlename,
                        lastname: user.data.data.lastname
                    }
                    console.log(data)
                    this.data.unshift(data)
                    this.$message.success(`Account successfully created`);
                    this.visible = false;
                    this.form.resetFields();
               }
            this.loading = false;
                
               
          } catch (error) {
            console.log(error.data)
            this.loading = false;
            // if(error.status == 422)
            //   this.$message.success(error.data.message);
              // console.log(this.$store.state.validation.errors.message.courseError)
            //   this.form.validateFields(['course'],{ force: true})
            //   this.$nextTick(() => {
            //     this.form.setFields({course:{value:this.form.getFieldValue('course'),errors:[new Error(this.$store.state.validation.errors.message.courseError)]}})
            //   });
          }
        
        }
        });
      }//EDIT
      else{
        
          this.form.validateFields( async (err, values) => {
            if(!err){
                try {
              const newData = [...this.data]
              console.log(this.id)
              const target = newData.filter(item => this.id === item.id)[0]
                let acct = await this.$axios.post(`/user/update/${this.id}`,{
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        firstname: values.firstname,
                        middlename: values.middlename,
                        lastname: values.lastname
                      })
              acct.data.data.uid = acct.data.data.id
              console.log(acct.data.data)
              const currentIndex = this.data.indexOf(target);
              this.data.splice(currentIndex, 1, acct.data.data)
              this.$message.success(`${acct.data.message}`);
              this.visible = false;
            } catch (error) {
              console.log(error)
              if(error.status == 422)
              this.$message.error(error.data.message);
              //  this.form.validateFields(['course'],{ force: true})
              // this.$nextTick(() => {
              //   this.form.setFields({course:{value:this.form.getFieldValue('course'),errors:[new Error(this.$store.state.validation.errors.message.courseError)]}})
              // });
            }
            }
            
          })
          
      }
      
    },
    handleCancel(e) {
      this.visible = false;
    },

    async edit(key, record){
      console.log(record)
        this.form.resetFields();
        this.visible = true;
        this.buttonType = 'edit'
        this.buttonTitle = 'Edit'
        this.modalTitle = 'Edit Account'
        console.log(key)
        this.$nextTick(() => {
          this.form.setFieldsValue({username: record.username});
          this.form.setFieldsValue({email: record.email});
          this.form.setFieldsValue({firstname: record.firstname});
          this.form.setFieldsValue({middlename: record.middlename});
          this.form.setFieldsValue({lastname: record.lastname});
          this.key = key
          this.id = record.uid
        //   this.value = record.course_text

      });
    },

    async handleDelete(key){
        // console.log(key)
        try {
          let course = await this.$axios.delete(`/course/${key.id}`)
          this.$message.success(`${course.data.message}`);
          const data = [...this.data]
          this.data = data.filter(item => item.id !== key.id)
          console.log(this.data)
        } catch (error) {
          console.log(error)
          this.$message.error(this.$store.state.validation.errors.message);
        }
        

    },

    courseError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('course') 
    },

    handleConfirmBlur  (e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword  (rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
  },
}
</script>
<style scoped>
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
