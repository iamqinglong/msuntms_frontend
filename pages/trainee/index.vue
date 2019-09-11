<template>
<div>
    <a-button type="primary" @click="showModal">
    Add New Trainee
    </a-button>
  <a-table :dataSource="data" :columns="columns" rowKey="TraineeID">
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
      <!-- <a @click="()=> view(key, record)">View</a> -->
      <nuxt-link :to="'/trainee/'+ key.TraineeID">View</nuxt-link>
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
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
        {{buttonTitle}}        
        </a-button>
      </template>
      <a-form :form="form">
             <a-alert type="error" :message="error" banner v-if="error"/>
            <a-form-item
            label="First Name"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'fname',
                {rules: [{ required: true, message: 'Please input your first name!' }]}
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
                'mname',
                {initialValue : ''},
                {rules: [{ required: false, message: 'Please input your middle name!' }]}
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
                    'lname',
                    {rules: [{ required: true, message: 'Please input your last name!' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Date of Birth"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 12 }"
                >
                <a-date-picker 
                @change="onChange" 
                placeholder="Pick your date of birth"
                :format="dateFormat"
                v-decorator="[
                    'bdate',
                    {rules: [{ required: true, message: 'Please pick your date of birth!' }]}
                    ]"
                 />
            </a-form-item>
            
            <a-form-item
                label="Sex"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 12 }"
                >
                <a-select
                    v-decorator="[
                    'sex',
                    {rules: [{ required: true, message: 'Please select your sex!' }]}
                    ]"
                    placeholder="Select an option"
                    @change="handleSelectChangeSex"
                    
                >
                    <a-select-option value="Male">
                    Male
                    </a-select-option>
                    <a-select-option value="Female">
                    Female
                    </a-select-option>
                </a-select>
            </a-form-item>
            <div data-v-f49e88fc="" class="ant-row ant-form-item">
                <div class="ant-col-7 ant-form-item-label">
                    <label for="course" title="course" class="ant-form-item-required">Course</label>
                </div>
                
                    <div class="ant-col-12 ant-form-item-control-wrapper">
                        <multiselect v-model="course_text" tag-placeholder="Add this as new course" placeholder="Search or add a course" 
                        label="course_text" 
                        track-by="course_text" 
                        :taggable="true" 
                        :options="optionsCourse" 
                        @tag="addTagCourse"
                        :allow-empty="false"
                        :select-label="'Click to change'"
                        :deselect-label="'Selected'"
                        @input="onChangeCourse"
                        >
                        </multiselect>
                        
                    </div>
            </div>
            <div data-v-f49e88fc="" class="ant-row ant-form-item">
                <div class="ant-col-7 ant-form-item-label">
                    <label for="school" title="School" class="ant-form-item-required">School</label>
                </div>
                
                    <div class="ant-col-12 ant-form-item-control-wrapper">
                        <multiselect v-model="school_name"
                            tag-placeholder="Add this as new school" 
                            placeholder="Search or add a school" 
                            label="school_name" 
                            track-by="school_name" 
                            :taggable="true" 
                            :options="optionsSchool"  
                            @tag="addTagSchool"
                            :allow-empty="false"
                            :select-label="'Click to change'"
                            :deselect-label="'Selected'"
                            @input="onChangeSchool"
                            >
                        </multiselect>
                        
                    </div>
            </div>
            <a-form-item
                label="Emergency Contacts"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 12 }"
                
            >
                <a-select
                    showSearch
                    placeholder="Search and select"
                    optionFilterProp="children"
                    style="width: 300px"
                    :filterOption="filterOption"
                    v-decorator="[
                    'emergency_contact',
                    {rules: [{ required: true, message: 'Please select your emergency contact if exist!' },
                        ]}
                    ]"
                    :disabled='!ec_flag'
                >
                    <a-select-option v-for="ec in emergency_list " :key="ec.id">
                        {{ec.fname +' '+ ec.lname}}
                    </a-select-option>
                </a-select>
                <a-button
                    type="dashed"
                    style="width: 60%"
                    @click="addContact"
                >
                <a-icon :type="iconType" />
                {{iconText}}
                </a-button>
            </a-form-item>
            <a-form-item
                label="Emergency First Name"
                :label-col="{ span: 9 }"
                :wrapper-col="{ span: 12 }"
                v-if='!ec_flag'
                >
                <a-input
                    v-decorator="[
                    'ec_fname',
                    {rules: [{ required: true, message: 'Please input the first name!' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Emergency Middle Name"
                :label-col="{ span: 9 }"
                :wrapper-col="{ span: 12 }"
                v-if='!ec_flag'
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
                label="Emergency Last Name"
                :label-col="{ span: 9 }"
                :wrapper-col="{ span: 12 }"
                v-if='!ec_flag'
                >
                <a-input
                    v-decorator="[
                    'ec_lname',
                    {rules: [{ required: true, message: 'Please input the last name!' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Emergency Address:"
                :label-col="{ span: 9 }"
                :wrapper-col="{ span: 12 }"
                v-if="!ec_flag"
                >
                <a-textarea
                    v-decorator="[
                    'ec_address',
                    {rules: [{ required: true, message: 'Please input the address!' }]}
                    ]"
                />
            </a-form-item>
  
            <a-form-item
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 12 }"
              label="Emergency Phone #"
              v-if="!ec_flag"
            >
              <a-input
                v-decorator="[
                  'ec_contact',
                  {
                    rules: [{ required: true, message: 'Please input contact number!' }],
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

            <a-form-item
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 12 }"
              label="Phone Number"
            >
              <a-input
                v-decorator="[
                  'contact_no',
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
            <a-form-item
                label="Home Address"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 12 }"
                >
                <a-textarea placeholder="Address" :rows="2"
                 v-decorator="[
                    'home_add',
                    {rules: [{ required: true, message: 'Please input your home address!' }]}
                    ]"
                />
                
            </a-form-item>
            <a-form-item
                label="No of Hours:"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 12 }"
                >
                <a-input-number
                    v-decorator="[
                    'no_of_hrs',
                    {rules: [{ required: true, message: 'Please input the no. of hours!' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Purpose of stay:"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 12 }"
                >
                <a-textarea
                    v-decorator="[
                    'purpose_of_stay',
                    {rules: [{ required: true, message: 'Please input your purpose of stay!' }]}
                    ]"
                />
            </a-form-item>
        </a-form>
</a-modal>

</div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>

import Multiselect from 'vue-multiselect'
import moment from 'moment';
export default {
    middleware: 'auth',
    components: {
        Multiselect
    },
    async asyncData({params, error, $axios, store}) {
      
        try {
          let [course, school, emergency_contact, trainee] = await Promise.all([ $axios.get(`/course`),
                                 $axios.get(`/school`),
                                 $axios.get(`/ec`),
                                 $axios.get(`/trainee_all`),
                              ])

          console.log(course.data.data)
          console.log(school.data.data)
          console.log(emergency_contact.data.data)
          console.log(trainee.data.data)
          let sc = ((Array.isArray(school.data.data) && school.data.data.length ) ? {school_name: school.data.data[0].school_name, id: school.data.data[0].id} : {})
          let crs = ((Array.isArray(course.data.data) && course.data.data.length ) ? {course_text: course.data.data[0].course_text, id: course.data.data[0].id} : {})
          
          return {
              school_name: sc,
              optionsCourse: course.data.data,
              oldCourse : course.data.data,
              optionsSchool: school.data.data,
              oldSchool : school.data.data,
              course_text: crs,
              emergency_list : emergency_contact.data.data,
              data : trainee.data.data,
          }
        } catch (error) {
          console.log(error.data)
        }
         
    },
  data () {
    return {
      error : '',
      dateFormat: 'YYYY-MM-DD',
      ec_flag: true,
      course_flag: true,
      school_flag : true,
      iconType: 'plus',
      iconText: 'Add Contact',
      form: this.$form.createForm(this),
      modalTitle: 'New Trainee',
      buttonTitle: 'New',
      buttonType: 'add',
      count: 5,
      // data: [],
      loading: false,
      visible: false,
      searchText: '',
      searchInput: null,
      columns: [{
        title: 'First Name',
        dataIndex: 'trainee_fname',
        key: 'trainee_fname',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.trainee_fname.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            },0)
          }
        },
      }, {
        title: 'Middle Name',
        dataIndex: 'trainee_mname',
        key: 'trainee_mname',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.trainee_mname.toLowerCase().includes(value.toLowerCase()),
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
        dataIndex: 'trainee_lname',
        key: 'trainee_lname',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.trainee_lname.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            })
          }
        },
      },
      {
        title: 'Course',
        dataIndex: 'course_text',
        key: 'course_text',
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
            })
          }
        },
      },
      {
        title: 'School',
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
      this.error = ''
      this.visible = true;
      this.buttonType = 'add'
      this.buttonTitle ='New'
      this.modalTitle ='New Trainee'
      this.ec_flag = true
      this.course_flag = true
      this.school_flag  = true
      this.iconType = 'plus'
      this.iconText = 'Add Contact'
    },
    handleOk(e) {
      
      if(!this.ec_flag){
        this.form.getFieldDecorator('emergency_contact', { hidden: true })
      }
      if(this.buttonType == 'add'){
                this.form.validateFields( async (err, values) => {
          // console.log(values.contact_no)
        if (!err) {
          try {
            
              this.loading = true;
              console.log('Received values of form: ', moment(values.bdate._d).format('YYYY-MM-DD'));
   
              let course_text = ''
              let course_idcourse = ''
              if(this.course_flag){
                 course_idcourse = this.course_text.id
                 console.log(course_idcourse)
              }else{
                 course_text = this.course_text.course_text
              }
              let c_flag = this.course_flag

              let s_school_name = ''
              let school_idschool = ''

              if(this.school_flag){
                 school_idschool = this.school_name.id
              }else{
                 s_school_name = this.school_name.school_name
                 console.log(this.school_name)
              }

               let s_flag = this.school_flag
               
              let ec_fname = ''
              let ec_lname = ''
              let ec_mname = ''
              let ec_address = ''
              let ec_contact_number = ''
              let emergency_contact = ''
               if(this.ec_flag){
                  emergency_contact = this.form.getFieldValue('emergency_contact')
               }else{
                  ec_fname = this.form.getFieldValue('ec_fname')
                  ec_lname = this.form.getFieldValue('ec_lname')
                  ec_mname = this.form.getFieldValue('ec_mname')
                  ec_address = this.form.getFieldValue('ec_address')
                  ec_contact_number = this.form.getFieldValue('ec_contact')
               }
               let ec_flag = this.ec_flag
               
              // console.log(course_text)
              // console.log(s_school_name)
              // console.log(ec_fname)
              console.log(ec_flag)
              console.log(s_flag)
              console.log(c_flag)
              console.log({
                  trainee_fname : values.fname,
                  trainee_lname : values.lname,
                  trainee_mname : values.mname,
                  trainee_bdate : moment(values.bdate._d).format('YYYY-MM-DD'),
                  trainee_home_add : values.home_add,
                  trainee_sex : values.sex,
                  trainee_contact_no : values.contact_no,
                  required_no_of_hrs : values.no_of_hrs,
                  purpose_of_stay : values.purpose_of_stay,
                  course_id : course_idcourse,
                  c_flag : this.course_flag,
                  course_text : course_text,
                  s_flag: this.school_flag,
                  school_name: s_school_name,
                  school_id : school_idschool,
                  emergency_contact_id : emergency_contact,
                  ec_flag : this.ec_flag,
                  fname : ec_fname,
                  lname : ec_lname, 
                  mname : ec_mname,
                  ec_address : ec_address,
                  contact_number : ec_contact_number,
              })
              let trainee = await this.$axios.post(`/trainee`,{
                  trainee_fname : values.fname,
                  trainee_lname : values.lname,
                  trainee_mname : values.mname,
                  trainee_bdate : moment(values.bdate._d).format('YYYY-MM-DD'),
                  trainee_home_add : values.home_add,
                  trainee_sex : values.sex,
                  trainee_contact_no : values.contact_no,
                  required_no_of_hrs : values.no_of_hrs,
                  purpose_of_stay : values.purpose_of_stay,
                  course_id : course_idcourse,
                  c_flag : this.course_flag,
                  course_text : course_text,
                  s_flag: this.school_flag,
                  school_name: s_school_name,
                  school_id : school_idschool,
                  emergency_contact_id : emergency_contact,
                  ec_flag : this.ec_flag,
                  fname : ec_fname,
                  lname : ec_lname, 
                  mname : ec_mname,
                  ec_address : ec_address,
                  contact_number : ec_contact_number,
                })

              console.log(trainee.data)

               let resData = {
                TraineeID : trainee.data.data.id,
                CourseID : trainee.data.data.courses_id,
                course_text : trainee.data.data.course_text[0].course_text,
                EID : trainee.data.data.emergency_contact_id,
                ec_fname : trainee.data.data.e_c[0].FirstName,
                ec_mname : trainee.data.data.e_c[0].MiddleName,
                ec_lname : trainee.data.data.e_c[0].LastName,
                SchoolID : trainee.data.data.schools_id,
                school_name : trainee.data.data.school_name[0].school_name,
                purpose_of_stay: trainee.data.data.purpose_of_stay,
                required_no_of_hrs: trainee.data.data.required_no_of_hrs,
                trainee_bdate: trainee.data.data.trainee_bdate,
                trainee_contact_no: trainee.data.data.trainee_contact_no,
                trainee_fname: trainee.data.data.trainee_fname,
                trainee_home_add: trainee.data.data.trainee_home_add,
                trainee_lname: trainee.data.data.trainee_lname,
                trainee_mname: trainee.data.data.trainee_mname,
                trainee_sex: trainee.data.data.trainee_sex
              }
              console.log(resData)
              if(!this.c_flag){
                this.optionsCourse.filter(elem => {
                    if(elem.course_text == trainee.data.data.course_text[0].course_text)
                      elem.id = trainee.data.data.courses_id
                })
                
             
              }
              console.log(this.optionsCourse)
              if(!this.s_flag)
              {
                this.optionsSchool.filter(elem => {
                    if(elem.school_name == trainee.data.data.school_name[0].school_name)
                      elem.id = trainee.data.data.schools_id
                })
              }
              
              console.log(this.optionsSchool)
              if(!this.ec_flag)
                this.emergency_list.push({id: trainee.data.data.emergency_contact_id, 
                fname : trainee.data.data.e_c[0].FirstName, 
                mname : trainee.data.data.e_c[0].MiddleName, 
                lname : trainee.data.data.e_c[0].LastName,
            
                })
                
              console.log(this.emergency_list)
              this.data.unshift(resData)
              this.$message.success(`${trainee.data.message}`);
              this.loading = false;
              this.visible = false;
              this.ec_flag = true;
              this.course_flag = true,
              this.school_flag = true,
              this.form.resetFields();
          } catch (error) {
              console.log(error.data)
              if(error.status == 422)
                this.error =  error.data.message.trainee_fname[0]
              this.loading = false;
          }
              
        }
      });

      }else{
              this.form.validateFields( async (err, values) => {
          // console.log(values.contact_no)
        if (!err) {
          try {
            
              this.loading = true;
              const newData = [...this.data]
              const target = newData.filter(item => this.id === item.TraineeID)[0]
              const currentIndex = this.data.indexOf(target);
              console.log(currentIndex)
              let course_text = ''
              let course_idcourse = ''
              if(this.course_flag){
                 course_idcourse = this.course_text.id
                 console.log(course_idcourse)
              }else{
                 course_text = this.course_text.course_text
              }
              let c_flag = this.course_flag

              let s_school_name = ''
              let school_idschool = ''

              if(this.school_flag){
                 school_idschool = this.school_name.id
              }else{
                 s_school_name = this.school_name.school_name
                 console.log(this.school_name)
              }

               let s_flag = this.school_flag
               
              let ec_fname = ''
              let ec_lname = ''
              let ec_mname = ''
              let ec_address = ''
              let ec_contact_number = ''
              let emergency_contact = ''
               if(this.ec_flag){
                  emergency_contact = this.form.getFieldValue('emergency_contact')
               }else{
                  ec_fname = this.form.getFieldValue('ec_fname')
                  ec_lname = this.form.getFieldValue('ec_lname')
                  ec_mname = this.form.getFieldValue('ec_mname')
                  ec_address = this.form.getFieldValue('ec_address')
                  ec_contact_number = this.form.getFieldValue('ec_contact')
               }
               let ec_flag = this.ec_flag
               
              // console.log(course_text)
              // console.log(s_school_name)
              // console.log(ec_fname)
              console.log(ec_flag)
              console.log(s_flag)
              console.log(c_flag)
              console.log(s_school_name)
              console.log({
                  trainee_fname : values.fname,
                  trainee_lname : values.lname,
                  trainee_mname : values.mname,
                  trainee_bdate : moment(values.bdate._d).format('YYYY-MM-DD'),
                  trainee_home_add : values.home_add,
                  trainee_sex : values.sex,
                  trainee_contact_no : values.contact_no,
                  required_no_of_hrs : values.no_of_hrs,
                  purpose_of_stay : values.purpose_of_stay,
                  course_id : course_idcourse,
                  c_flag : this.course_flag,
                  course_text : course_text,
                  s_flag: this.school_flag,
                  school_name: s_school_name,
                  school_id : school_idschool,
                  emergency_contact_id : emergency_contact,
                  ec_flag : this.ec_flag,
                  fname : ec_fname,
                  lname : ec_lname, 
                  mname : ec_mname,
                  ec_address : ec_address,
                  contact_number : ec_contact_number,
              })
              let trainee = await this.$axios.post(`/trainee/${this.id}`,{
                  trainee_fname : values.fname,
                  trainee_lname : values.lname,
                  trainee_mname : values.mname,
                  trainee_bdate : moment(values.bdate._d).format('YYYY-MM-DD'),
                  trainee_home_add : values.home_add,
                  trainee_sex : values.sex,
                  trainee_contact_no : values.contact_no,
                  required_no_of_hrs : values.no_of_hrs,
                  purpose_of_stay : values.purpose_of_stay,
                  course_id : course_idcourse,
                  c_flag : this.course_flag,
                  course_text : course_text,
                  s_flag: this.school_flag,
                  school_name: s_school_name,
                  school_id : school_idschool,
                  emergency_contact_id : emergency_contact,
                  ec_flag : this.ec_flag,
                  fname : ec_fname,
                  lname : ec_lname, 
                  mname : ec_mname,
                  address : ec_address,
                  contact_number : ec_contact_number,
                })

              console.log(trainee.data)

              let resData = {
                TraineeID : trainee.data.data.id,
                CourseID : trainee.data.data.courses_id,
                course_text : trainee.data.data.course_text[0].course_text,
                EID : trainee.data.data.emergency_contact_id,
                ec_fname : trainee.data.data.e_c[0].FirstName,
                ec_mname : trainee.data.data.e_c[0].MiddleName,
                ec_lname : trainee.data.data.e_c[0].LastName,
                SchoolID : trainee.data.data.schools_id,
                school_name : trainee.data.data.school_name[0].school_name,
                purpose_of_stay: trainee.data.data.purpose_of_stay,
                required_no_of_hrs: trainee.data.data.required_no_of_hrs,
                trainee_bdate: trainee.data.data.trainee_bdate,
                trainee_contact_no: trainee.data.data.trainee_contact_no,
                trainee_fname: trainee.data.data.trainee_fname,
                trainee_home_add: trainee.data.data.trainee_home_add,
                trainee_lname: trainee.data.data.trainee_lname,
                trainee_mname: trainee.data.data.trainee_mname,
                trainee_sex: trainee.data.data.trainee_sex
              }
              console.log(resData)
              if(!this.c_flag){
                this.optionsCourse.filter(elem => {
                    if(elem.course_text == trainee.data.data.course_text[0].course_text)
                      elem.id = trainee.data.data.courses_id
                })
                
             
              }
              console.log(this.optionsCourse)
              if(!this.s_flag)
              {
                this.optionsSchool.filter(elem => {
                    if(elem.school_name == trainee.data.data.school_name[0].school_name)
                      elem.id = trainee.data.data.schools_id
                })
              }
              
              console.log(this.optionsSchool)
              if(!this.ec_flag)
                this.emergency_list.push({id: trainee.data.data.emergency_contact_id, 
                fname : trainee.data.data.e_c[0].FirstName, 
                mname : trainee.data.data.e_c[0].MiddleName, 
                lname : trainee.data.data.e_c[0].LastName,
            
                })
                
              console.log(this.emergency_list)
              this.data.splice(currentIndex, 1, resData)
              this.$message.success(`${trainee.data.message}`);

              this.loading = false;
              this.visible = false;
              this.ec_flag = true;
              this.course_flag = true,
              this.school_flag = true,
              this.form.resetFields();
          } catch (error) {
              console.log(error.data)
              if(error.status == 422)
                this.error =  error.data.message.trainee_fname[0]
              this.loading = false;
          }
              
        }
      });

      }
              
      
      
    },
    handleCancel(e) {
      this.visible = false;
    },

    async edit(key, record){
        console.log(record)
        this.visible = true;
        this.error = ''
        this.buttonType = 'edit'
        this.buttonTitle = 'Edit'
        this.modalTitle = 'Edit Trainee'
        this.ec_flag = true
        this.course_flag = true
        this.school_flag  = true
        this.iconType = 'plus'
        this.iconText = 'Add Contact'
        this.id = record.TraineeID
        this.$nextTick(() => {
        this.form.setFieldsValue({fname: record.trainee_fname});
        this.form.setFieldsValue({mname: record.trainee_mname});
        this.form.setFieldsValue({lname: record.trainee_lname});
        this.form.setFieldsValue({bdate: moment(record.trainne_bdate)});
        this.form.setFieldsValue({sex: record.trainee_sex});
        this.course_text = {course_text: record.course_text, id: record.CourseID}
        this.school_name = {school_name: record.school_name, id: record.SchoolID}
        this.form.setFieldsValue({emergency_contact: record.EID});
        this.form.setFieldsValue({contact_no: record.trainee_contact_no});
        this.form.setFieldsValue({home_add: record.trainee_home_add});
        this.form.setFieldsValue({no_of_hrs: record.required_no_of_hrs});
        this.form.setFieldsValue({purpose_of_stay: record.purpose_of_stay});
      });
    },

    async handleDelete(key){
      console.log(key)
      try {

        let trainee = await this.$axios.delete(`/trainee/${key.TraineeID}`)
        this.$message.success(`${trainee.data.message}`);
        const data = [...this.data]
        this.data = data.filter(item => item.TraineeID !== key.TraineeID)

      } catch (error) {

        console.log(error)
        this.$message.error(this.$store.state.validation.errors.message);

      }
        
    },
    onChangeCourse (value) {
     this.course_flag = (value.id ? true : false)
     console.log(this.course_flag)

    },
    onChangeSchool (value) {
      this.school_flag = (value.id ? true : false)
      console.log(this.school_flag)
    },
    async addTagCourse(newTag){
      const tag = {
                course_text: newTag,
                text: newTag
            }
      this.optionsCourse.push(tag)
      this.course_text = tag
      this.course_flag = false
    },

    async addTagSchool(newTag){
        const tag = {
                school_name: newTag,
                text: newTag
            }
      this.optionsSchool.push(tag)
      this.school_name = tag
      this.school_flag = false
    },
    
    async removeTagSchool(newTag){

    },
    
    async removeTagCourse(newTag){

    },
    async addContact(){
        // this.ec_flag = ((this.ec_flag) ? this.ec_flag = false, this.iconType = 'plus' : this.ec_flag = true, this.iconType = 'minus') 
        if(this.ec_flag){
            this.ec_flag = false,
            this.iconType = 'minus'
            this.iconText = 'Remove Contact'
        }else{
            this.ec_flag = true,
            this.iconType = 'plus'
            this.iconText = 'Add Contact'
            
        }

        console.log(this.ec_flag)
    },

    onChange(date, dateString) {
      console.log(date, dateString);
    },

    handleSelectChangeSex (value) {
      console.log(value);
    },
    handleSelectChangeEmrgncyContact (value) {
      console.log(value);
    },

    view(key,record){
      console.log(key,record)
    },
    filterOption(input, option) {
            // console.log(option)
            return option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
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
