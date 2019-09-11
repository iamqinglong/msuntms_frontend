<template>
    <div>
         <a-button type="primary" @click="showModal">
    Add New Training
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
      <nuxt-link :to="'/training/'+ key.id">View</nuxt-link>
      <a-divider type="vertical" />
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
            label="Title"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'title_of_training',
                {rules: [{ required: true, message: 'Please input desired title!' }]}
                ]"
            />
           </a-form-item>
           <a-form-item
            label="Trainer"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'trainer',
                {rules: [{ required: true, message: 'Please input trainer name' }]}
                ]"
            />
           </a-form-item>
            <a-form-item
                label="Location"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12 }"
                
            >
                <a-select
                    showSearch
                    placeholder="Search and select"
                    optionFilterProp="children"
                    style="width: 300px"
                    :filterOption="filterOption"
                    v-decorator="[
                    'location_id',
                    {rules: [{ required: true, message: 'Please select location if exist!' },
                        ]}
                    ]"
                    :disabled='!l_flag'
                >
                    <a-select-option v-for="location in location_list " :key="location.id">
                        {{location.baranggay +', '+ location.municipality +', '+location.province }}
                    </a-select-option>
                </a-select>
                <a-button
                    type="dashed"
                    style="width: 60%"
                    @click="addLocation"
                >
                <a-icon :type="iconType" />
                {{iconText}}
                </a-button>
            </a-form-item>
            <a-form-item
                label="Barangay"
                :label-col="{ span: 9 }"
                :wrapper-col="{ span: 12 }"
                v-if='!l_flag'
                >
                <a-input
                    v-decorator="[
                    'barangay',
                    {rules: [{ required: true, message: 'Please input the desired Barangay' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Municipality"
                :label-col="{ span: 9 }"
                :wrapper-col="{ span: 12 }"
                v-if='!l_flag'
                >
                <a-input
                    v-decorator="[
                    'municipality',
                    {rules: [{ required: true, message: 'Please input the desired Municipality!' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Province"
                :label-col="{ span: 9 }"
                :wrapper-col="{ span: 12 }"
                v-if='!l_flag'
                >
                <a-input
                    v-decorator="[
                    'province',
                    {rules: [{ required: true, message: 'Please input the desired Province!' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item
              label="Duration"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-range-picker
                v-decorator="['range_picker', {rules: [{ type: 'array', required: true, message: 'Please select time!' }]}]"
                :showTime="{ format: 'h:mm A' }"
                format="YYYY-MM-DD h:mm A"
              />
            </a-form-item>
        </a-form>
      
</a-modal>
    </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
import moment from 'moment';
import Multiselect from 'vue-multiselect'
export default {
    middleware: 'auth',
    components: {
        Multiselect
    },
    async asyncData({params, error, $axios, store}) {
        try {

          let [training, locations ] = await Promise.all([ $axios.get(`/trainings`),
                                 $axios.get(`/locations`),
                              ])
          console.log(locations.data.data)
          training.data.data.map(item => {item.date_from = moment(item.date_from).format('YYYY-MM-DD h:mm A'),
                                     item.date_to = moment(item.date_to).format('YYYY-MM-DD h:mm A'),
                                     item.location = item.baranggay+', '+item.municipality+', '+item.province
                                     }, )
          
          console.log(training.data.data)
          return {
              data: training.data.data,
              location_list : locations.data.data
          }
        } catch (error) {
          console.log(error)
        }
        
    },
    data () {
    return {
      l_flag : true,
      iconType: 'plus',
      iconText: 'Add Location',
      rangeConfig: {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
      },
      modalTitle : "New Training",
      buttonTitle : "New",
      id : '',
      value : '',
      buttonType: '',
      hasErrors,
      form: this.$form.createForm(this),
      count: 5,
      loading: false,
      visible: false,
      searchText: '',
      searchInput: null,
      columns: [{
        title: 'Title',
        dataIndex: 'title_of_training',
        key: 'title_of_training',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.title_of_training.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            },0)
          }
        },
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.location.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            },0)
          }
        },
      },
      {
        title: 'Start Date',
        dataIndex: 'date_from',
        key: 'date_from',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.date_from.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            },0)
          }
        },
      },
      {
        title: 'End Date',
        dataIndex: 'date_to',
        key: 'date_to',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.date_to.toLowerCase().includes(value.toLowerCase()),
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
    moment,
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
      this.l_flag = true;
      this.iconType = 'plus',
      this.iconText = 'Add Location',
      this.visible = true;
      this.buttonType = 'add'
      this.buttonTitle ='New'
      this.modalTitle ='New Training'
    },
    async handleOk(e) {
      //ADD
      e.preventDefault();
      if(this.buttonType == 'add')
      {
        if(!this.l_flag){
          this.form.getFieldDecorator('location_id', { hidden: true })
        }
        this.form.validateFields( async (err, fieldsValue) => {
        if (!err) {
          this.loading = true;
          const rangeValue = fieldsValue['range_picker'];
          try {
              
              let loc_id = this.form.getFieldValue('location_id')
              let barangay = this.form.getFieldValue('barangay')
              let municipality = this.form.getFieldValue('municipality')
              let province = this.form.getFieldValue('province')
               
         
               let trainings = await this.$axios.post(`/trainings`,{
                   l_flag : this.l_flag,
                   title_of_training : fieldsValue['title_of_training'],
                   trainer : fieldsValue['trainer'],
                   location_id : loc_id,
                   baranggay : barangay,
                   municipality : municipality,
                   province : province,
                   date_from : rangeValue[0].format('YYYY-MM-DD hh-mm-ss'),
                   date_to : rangeValue[1].format('YYYY-MM-DD hh-mm-ss')
                })
                console.log(trainings.data.data)
                let data = {
                  title_of_training : trainings.data.data[0].title_of_training,
                  location : trainings.data.data[0].baranggay+', '+trainings.data.data[0].municipality+', '+trainings.data.data[0].province,
                  baranggay : trainings.data.data[0].baranggay,
                  municipality: trainings.data.data[0].municipality,
                  province: trainings.data.data[0].province,
                  date_from: moment(trainings.data.data[0].date_from).format('YYYY-MM-DD h:mm A'),
                  date_to : moment(trainings.data.data[0].date_to).format('YYYY-MM-DD h:mm A'),
                  id: trainings.data.data[0].id,
                  trainer : trainings.data.data[0].trainer,
                  lid :trainings.data.data[0].lid,
                }
                if(!this.l_flag)
                  this.location_list.push({id: trainings.data.data[0].lid, 
                  baranggay : trainings.data.data[0].baranggay,
                  municipality : trainings.data.data[0].municipality,
                  province : trainings.data.data[0].province,
                  location : trainings.data.data[0].baranggay+', '+trainings.data.data[0].municipality+', '+trainings.data.data[0].province,
                  })
                console.log(this.location_list)
                this.data.unshift(data)
                this.$message.success(`${trainings.data.message}`);
                this.visible = false;
                this.loading = false;
                this.l_flag = true;
                this.form.resetFields();
                
          } catch (error) {
            console.log(error)
             console.log(this.$store.state.validation.errors.message)
              this.form.validateFields(['title_of_training'],{ force: true})
              this.$nextTick(() => {
                this.form.setFields({title_of_training:{value:this.form.getFieldValue('title_of_training'),errors:[new Error(this.$store.state.validation.errors.message)]}})
              });
              
              
              this.loading = false;

          }
        
        }
        });
      }//EDIT
      else{
        
          this.form.validateFields( async (err, fieldsValue) => {
            if(!err){
                this.loading = true;

                try {
                    console.log(this.id)
                    const newData = [...this.data]
                    const target = newData.filter(item => this.id === item.id)[0]
                    const rangeValue = fieldsValue['range_picker'];

                  
                    let  loc_id = this.form.getFieldValue('location_id')
                    let barangay = this.form.getFieldValue('barangay')
                    let municipality = this.form.getFieldValue('municipality')
                    let province = this.form.getFieldValue('province')

                    let trainings = await this.$axios.post(`/trainings/${this.id}`,{
                            l_flag : this.l_flag,
                            title_of_training : fieldsValue['title_of_training'],
                            trainer : fieldsValue['trainer'],
                            location_id : loc_id,
                            baranggay : barangay,
                            municipality : municipality,
                            province : province,
                            date_from : rangeValue[0].format('YYYY-MM-DD hh-mm-ss'),
                            date_to : rangeValue[1].format('YYYY-MM-DD hh-mm-ss')
                          })
                    console.log(trainings.data.data)
                    let data = {
                        title_of_training : trainings.data.data[0].title_of_training,
                        location : trainings.data.data[0].baranggay+', '+trainings.data.data[0].municipality+', '+trainings.data.data[0].province,
                        baranggay : trainings.data.data[0].baranggay,
                        municipality: trainings.data.data[0].municipality,
                        province: trainings.data.data[0].province,
                        date_from: moment(trainings.data.data[0].date_from).format('YYYY-MM-DD h:mm A'),
                        date_to : moment(trainings.data.data[0].date_to).format('YYYY-MM-DD h:mm A'),
                        id: trainings.data.data[0].id,
                        trainer : trainings.data.data[0].trainer,
                        lid :trainings.data.data[0].lid,
                      }
                    const currentIndex = this.data.indexOf(target);
                    this.data.splice(currentIndex, 1, data)
                    this.$message.success(`${trainings.data.message}`);
                    if(!this.l_flag)
                        this.location_list.push({id: trainings.data.data[0].lid, 
                        baranggay : trainings.data.data[0].baranggay,
                        municipality : trainings.data.data[0].municipality,
                        province : trainings.data.data[0].province,
                        location : trainings.data.data[0].baranggay+', '+trainings.data.data[0].municipality+', '+trainings.data.data[0].province,
                        })
                    console.log(this.location_list)
                    this.visible = false;
                    this.loading = false;
                    this.l_flag = true;
                    this.form.resetFields();
                  } catch (error) {
                    console.log(error)

                      this.form.validateFields(['title_of_training'],{ force: true})
                      this.$nextTick(() => {
                          this.form.setFields({title_of_training:{value:this.form.getFieldValue('title_of_training'),errors:[new Error(this.$store.state.validation.errors.message)]}})
                      });
                    
                    
                    this.loading = false;
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
      this.visible = true;
      this.buttonType = 'edit'
      this.buttonTitle = 'Edit'
      this.modalTitle = 'Edit Training'
      this.l_flag = true
      this.iconType = 'plus'
      this.iconText = 'Add Location'
      let duration = [moment(new Date(record.date_from)),moment(new Date(record.date_to))]
      this.$nextTick(() => {
        
        this.form.setFieldsValue({location_id: record.lid});
        this.form.setFieldsValue({title_of_training: record.title_of_training});
        this.form.setFieldsValue({location: record.location});
        this.form.setFieldsValue({trainer: record.trainer});
        this.form.setFieldsValue({range_picker: duration});
        this.id = record.id
        this.value = record

      });
    },

    async handleDelete(key){
        // console.log(key)
        try {
          let training = await this.$axios.delete(`/trainings/${key.id}`)
          this.$message.success(`${training.data.message}`);
          const data = [...this.data]
          this.data = data.filter(item => item.id !== key.id)
          console.log(this.data)
        } catch (error) {
          console.log(error)
        }
        

    },

    courseError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('course') 
    },
    filterOption(input, option) {
        return option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
    },
    async addLocation(){
            // this.ec_flag = ((this.ec_flag) ? this.ec_flag = false, this.iconType = 'plus' : this.ec_flag = true, this.iconType = 'minus') 
            if(this.l_flag){
                this.l_flag = false,
                this.iconType = 'minus'
                this.iconText = 'Remove Location'
            }else{
                this.l_flag = true,
                this.iconType = 'plus'
                this.iconText = 'Add Location'
            }

            console.log(this.l_flag)
        },
  },
}
</script>
