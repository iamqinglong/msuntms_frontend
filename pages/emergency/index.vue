<template>
<div>
    <a-button type="primary" @click="showModal">
    Add New Contacts
    </a-button>
  <a-table :dataSource="data" :columns="columns" rowKey="id">
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
      <a-divider type="vertical" />
        <a-popconfirm
        title="Sure to delete?"
        @confirm="() => handleDelete(key)">
        <a >Delete</a>
      </a-popconfirm>
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
                label="First Name"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 12 }"
                >
                <a-input
                    v-decorator="[
                    'ec_fname',
                    {rules: [{ required: true, message: 'Please input the first name!' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Middle Name"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 12 }"
                >
                <a-input
                    v-decorator="[
                    'ec_mname',
                    {initialValue : ''},
                    {rules: [{ required: false, message: 'Please input the middle name!' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Last Name"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 12 }"
                >
                <a-input
                    v-decorator="[
                    'ec_lname',
                    {rules: [{ required: true, message: 'Please input the last name!' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Address:"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 12 }"
                >
                <a-textarea
                    v-decorator="[
                    'ec_address',
                    {rules: [{ required: true, message: 'Please input the address!' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 12 }"
              label="Phone Number"
            >
              <a-input
                v-decorator="[
                  'ec_contact',
                  {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                  }
                ]"
              >
                <a-select
                  slot="addonBefore"
                  v-decorator="[
                    'prefix',
                    { initialValue: '63' }
                  ]"
                  style="width: 80px"
                >
                  <a-select-option value="63">
                    +63
                  </a-select-option>
                </a-select>
              </a-input>
            </a-form-item>
            
        </a-form>
        <!-- <small class="form-text text-danger" v-if="errors.message.schoolError">{{errors.message.schoolError}}</small> -->
</a-modal>

</div>
</template>

<script>


function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  middleware : 'auth',
    async asyncData({params, error, $axios, store}) {
        try {
            let res = await $axios.get(`/ec`)
            console.log(res.data)
            // cacheData = res.data.map(item => ({ ...item }))
            return {
                data: res.data.data
            }
        } catch (error) {
          console.log(error)
        }
        
    },
  data () {
    // this.cacheData = data.map(item => ({ ...item }))
    return {
      modalTitle : "New Contacts",
      buttonTitle : "New",
      id : '',
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
        title: 'First Name',
        dataIndex: 'fname',
        key: 'fname',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.fname.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            },0)
          }
        },
      }, {
        title: 'Middle Name',
        dataIndex: 'mname',
        key: 'mname',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.mname.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            })
          }
        },
      },
      {
        title: 'Last Name',
        dataIndex: 'lname',
        key: 'lname',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.lname.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            })
          }
        },
      },
      {
        title: 'Contact',
        dataIndex: 'contact_number',
        key: 'contact_number',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.contact_number.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            })
          }
        },
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.address.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            })
          }
        },
      },
      {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
      },],
    }
  },
   beforeCreate () {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator('school', { initialValue: '' });
    
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
      this.modalTitle ='New Contacts'
    },
    async handleOk(e) {
      //ADD
      if(this.buttonType == 'add')
      {
        this.form.validateFields( async (err, values) => {
        if (!err) {
          this.loading = true;
          console.log('Received values of form: ', values.ec_fname);
          try {
                let contacts = await this.$axios.post(`/ec`,{
                   fname : values.ec_fname,
                   mname: values.ec_mname,
                   lname: values.ec_lname,
                   contact_number: values.ec_contact,
                   address: values.ec_address
                })
                console.log(contacts)
                if(contacts.status == 200)
                {
                    // this.data.push(school.data.data)
                    this.data.unshift(contacts.data.data)
                    this.$message.success(`${contacts.data.message}`);
                    this.visible = false;
                    this.loading = false;
                    this.form.resetFields();
                }
               
          } catch (error) {
              // this.$message.error('school Already Exist');
              this.$message.error(this.$store.state.validation.errors.message)
            //   this.form.validateFields(['school'],{ force: true})
            //   this.$nextTick(() => {
            //     this.form.setFields({school:{value:this.form.getFieldValue('school'),errors:[new Error(this.$store.state.validation.errors.message)]}})
            //   });
              
              
              this.loading = false;
            //   console.log(this.$errors)
          }
        
        }
        });
      }//EDIT
      else{
          this.loading = true;
          this.form.validateFields( async (err, values) => {
            try {
                console.log(values)
              const newData = [...this.data]
              const target = newData.filter(item => this.id.id === item.id)[0]
                let contacts = await this.$axios.post(`/ec/${this.id.id}`,{
                        fname : values.ec_fname,
                        mname: values.ec_mname,
                        lname: values.ec_lname,
                        contact_number: values.ec_contact,
                        address: values.ec_address
                      })
              const currentIndex = this.data.indexOf(target);
              this.data.splice(currentIndex, 1, contacts.data.data)
              this.$message.success(`${contacts.data.message}`);
              this.visible = false;
              this.loading = false;
              this.form.resetFields();
            } catch (error) {
              console.log(error)
              this.loading = false;
                this.$message.error(this.$store.state.validation.errors.message)
            //    this.form.validateFields(['school'],{ force: true})
            //   this.$nextTick(() => {
            //     this.form.setFields({school:{value:this.form.getFieldValue('school'),errors:[new Error(this.$store.state.validation.errors.message)]}})
            //   });
            }
          })
          
      }
      
    },
    handleCancel(e) {
      this.visible = false;
    },

    async edit(key, record){
        this.visible = true;
        this.buttonType = 'edit'
        this.buttonTitle = 'Edit'
        this.modalTitle = 'Edit Contacts'
        this.$nextTick(() => {
          this.form.setFieldsValue({ec_fname: record.fname});
          this.form.setFieldsValue({ec_mname: record.mname});
          this.form.setFieldsValue({ec_lname: record.lname});
          this.form.setFieldsValue({ec_address: record.address});
          this.form.setFieldsValue({ec_contact: record.contact_number});
          this.id = key
          this.value = record

      });
    },

    async handleDelete(key){
        // console.log(key)
        try {
          let contacts = await this.$axios.delete(`/ec/${key.id}`)
          this.$message.success(`${contacts.data.message}`);
          const data = [...this.data]
          this.data = data.filter(item => item.id !== key.id)
          console.log(this.data)
        } catch (error) {
          console.log(error)
          this.$message.error(this.$store.state.validation.errors.message);
        }
        

    },

    schoolError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('school') 
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
