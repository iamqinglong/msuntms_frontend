<template>
<div>
    <a-button type="primary" @click="showModal">
    Add New School
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
            label="School Name"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'school',
                {rules: [{ required: true, message: 'Please input desired school name!' }]}
                ]"
            />
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
  
    async asyncData({params, error, $axios, store}) {
        
        try {
          let res = await $axios.get(`/school`)
          let data = res.data.data.filter(item => item.id != 1)
          // console.log(res.data)
          // cacheData = res.data.map(item => ({ ...item }))
          return {
              data: data
          }
        } catch (error) {
          console.log(error)
        }
        
    },
  data () {
    // this.cacheData = data.map(item => ({ ...item }))
    return {
      modalTitle : "New School",
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
        title: 'School Name',
        dataIndex: 'school_name',
        key: 'school_name',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.school_name.toLowerCase().includes(value.toLowerCase()),
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
      this.modalTitle ='New School'
    },
    async handleOk(e) {
      //ADD
      if(this.buttonType == 'add')
      {
        this.form.validateFields( async (err, values) => {
        if (!err) {
          this.loading = true;
          console.log('Received values of form: ', values.school);
          try {
                let school = await this.$axios.post(`/school`,{
                   school_name : values.school
                })
                console.log(school)
                if(school.status == 200)
                {
                    // this.data.push(school.data.data)
                    this.data.unshift(school.data.data)
                    this.$message.success(`${school.data.message}`);
                    this.visible = false;
                    this.loading = false;
                    this.form.resetFields();
                }
               
          } catch (error) {
              // this.$message.error('school Already Exist');
              console.log(this.$store.state.validation.errors.message)
              this.form.validateFields(['school'],{ force: true})
              this.$nextTick(() => {
                this.form.setFields({school:{value:this.form.getFieldValue('school'),errors:[new Error(this.$store.state.validation.errors.message)]}})
              });
              
              
              this.loading = false;
            //   console.log(this.$errors)
          }
        
        }
        });
      }//EDIT
      else{
        
          this.form.validateFields( async (err, values) => {
            if(!err)
            {
                try {
                  console.log(values)
                const newData = [...this.data]
                const target = newData.filter(item => this.id.id === item.id)[0]
                  let school = await this.$axios.post(`/school/${this.id.id}`,{
                          school_name : values.school,
                        })
                const currentIndex = this.data.indexOf(target);
                this.data.splice(currentIndex, 1, school.data.data)
                this.$message.success(`${school.data.message}`);
                this.visible = false;
              } catch (error) {
                console.log(error)

                this.form.validateFields(['school'],{ force: true})
                this.$nextTick(() => {
                  this.form.setFields({school:{value:this.form.getFieldValue('school'),errors:[new Error(this.$store.state.validation.errors.message)]}})
                });
              }
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
        this.modalTitle = 'Edit School'
        this.$nextTick(() => {
          this.form.setFieldsValue({school: record.school_name});
          this.id = key
          this.value = record.school_name

      });
    },

    async handleDelete(key){
        // console.log(key)
        try {
          let school = await this.$axios.delete(`/school/${key.id}`)
          this.$message.success(`${school.data.message}`);
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
