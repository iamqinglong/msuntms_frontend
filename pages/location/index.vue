<template>
<div>
    <a-button type="primary" @click="showModal">
    Add New Location
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
      <a-alert type="error" :message="locationErrors" v-if="locationErrors" banner />
      <a-form :form="form">
            <a-form-item
            label="Baranggay"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'baranggay',
                {rules: [{ required: true, message: 'Please input desired baranggay!' }]}
                ]"
            />
            </a-form-item>
            <a-form-item
            label="Municipality"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'municipality',
                {rules: [{ required: true, message: 'Please input desired municipality!' }]}
                ]"
            />
            </a-form-item>
            <a-form-item
            label="Province"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'province',
                {rules: [{ required: true, message: 'Please input desired province!' }]}
                ]"
            />
            </a-form-item>
        </a-form>
        <!-- <small class="form-text text-danger" v-if="errors.message.courseError">{{errors.message.courseError}}</small> -->
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
        
        let loc = await $axios.get(`/locations`)
        console.log(loc.data.data)
        // cacheData = res.data.map(item => ({ ...item }))
        return {
            data: loc.data.data
        }
    },
  data () {
    // this.cacheData = data.map(item => ({ ...item }))
    return {
      locationErrors : '',
      modalTitle : "New Location",
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
        title: 'Baranggay',
        dataIndex: 'baranggay',
        key: 'baranggay',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.course_text.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            },0)
          }
        },
      },
      {
        title: 'Municipality',
        dataIndex: 'municipality',
        key: 'municipality',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.course_text.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            },0)
          }
        },
      },
      {
        title: 'Province',
        dataIndex: 'province',
        key: 'province',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.course_text.toLowerCase().includes(value.toLowerCase()),
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
      this.locationErrors = ''
      this.visible = true;
      this.buttonType = 'add'
      this.buttonTitle ='New'
      this.modalTitle ='New Location'
    },
    async handleOk(e) {
      //ADD
      if(this.buttonType == 'add')
      {
        this.form.validateFields( async (err, values) => {
        if (!err) {
          this.loading = true;
          try {
                let loc = await this.$axios.post(`/locations`,{
                   baranggay : values.baranggay,
                   municipality : values.municipality,
                   province : values.province,
                })
                
                    this.data.unshift(loc.data.data)
                    this.$message.success(`${loc.data.message}`);
                    this.visible = false;
                    this.loading = false;
                    this.form.resetFields();
               
          } catch (error) {
            if(error.status == '422')
                this.locationErrors = error.data.message
            //   console.log(this.$store.state.validation.errors.message.courseError)
              
            //   this.form.validateFields(['course'],{ force: true})
            //   this.$nextTick(() => {
            //     this.form.setFields({course:{value:this.form.getFieldValue('course'),errors:[new Error(this.$store.state.validation.errors.message.courseError)]}})
            //   });
              
              
              this.loading = false;
            //   console.log(this.$errors)
          }
        
        }
        });
      }//EDIT
      else{
        
          this.form.validateFields( async (err, values) => {
            try {
              const newData = [...this.data]
              const target = newData.filter(item => this.id.id === item.id)[0]
                let loc = await this.$axios.post(`/location/${this.id.id}`,{
                        baranggay : values.baranggay,
                        municipality : values.municipality,
                        province : values.province,
                      })
              const currentIndex = this.data.indexOf(target);
              this.data.splice(currentIndex, 1, loc.data.data)
              this.$message.success(`${loc.data.message}`);
              this.visible = false;
            } catch (error) {
                console.log(error)
                if(error.status == '422')
                    this.locationErrors = error.data.message
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
        this.modalTitle = 'Edit Course'
        this.$nextTick(() => {
          this.form.setFieldsValue({baranggay: record.baranggay});
          this.form.setFieldsValue({municipality: record.municipality});
          this.form.setFieldsValue({province: record.province});
          this.id = key
          this.value = record.course_text

      });
    },

    async handleDelete(key){
        // console.log(key)
        try {
          let loc = await this.$axios.delete(`/location_del/${key.id}`)
          this.$message.success(`${loc.data.message}`);
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
