<template>
    <div>
        <center><b>Registration</b></center>
        <a-alert type="error" :message="error" banner v-if="error"/>
        <a-form :form="form">
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
                label="Emergency Contact Details"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 12 }"
                
            >
                <a-select
                    showSearch
                    placeholder="Search and select"
                    optionFilterProp="children"
                    :filterOption="filterOption"
                    v-decorator="[
                    'emergency_contact',
                    {rules: [{ required: true, message: 'Please select your emergency contact if exist!' },
                        ]}
                    ]"
                    @change="handleSelectChangeEmrgncyContact"
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
              label="Personal Phone #"
              
            >
              <a-input
                v-decorator="[
                  'contact_no',
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
            <center>
                <a-button type="primary" @click="register">
                    Register
                </a-button>
            </center>
        </a-form>
    </div>
</template>

=
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>

import moment from 'moment';
import Multiselect from 'vue-multiselect'
export default {
    layout: 'clean_layout',
    components: {
        Multiselect
    },
    async validate ({ params, $axios }) {
        // // Must be a number
        // return /^\d+$/.test(params.id)
         let url = params.id.split('_')
        // console.log(url[0])
        let training = await $axios.get(`/trainings/${url[0]}`)
        console.log(training.data.data)
        if(training.data.data[0].id && (training.data.data[0].title_of_training.toUpperCase() == url[1].toUpperCase()))
            return true
        else
            return false
        
    },  
    async asyncData({params, error, $axios, store}) {
       
        try {
          let url = params.id.split('_')
        //   let training = await $axios.get(`/trainings/${url[0]}}`)
          let [course, school, emergency_contact] = await Promise.all([ $axios.get(`/course`),
                                 $axios.get(`/school`),
                                 $axios.get(`/ec`),
                              ])

          let sc = ((Array.isArray(school.data.data) && school.data.data.length ) ? {school_name: school.data.data[0].school_name, id: school.data.data[0].id} : {})
          let crs = ((Array.isArray(course.data.data) && course.data.data.length ) ? {course_text: course.data.data[0].course_text, id: course.data.data[0].id} : {})
        //   console.log(training.data.data)
          

          return {
              id: url[0],
              school_name: sc,
              optionsCourse: course.data.data,
              oldCourse : course.data.data,
              optionsSchool: school.data.data,
              oldSchool : school.data.data,
              course_text: crs,
              emergency_list : emergency_contact.data.data,
          }
        } catch (error) {
          console.log(error.status)
        }
         
    },
    data() {
        return {
            error: '',
            dateFormat: 'YYYY-MM-DD',
            form : this.$form.createForm(this),
            ec_flag : true,
            course_flag : true,
            school_flag : true,
            iconType: 'plus',
            iconText: 'Add Contact',
            // dataSource: dataSource,
        }
    },
    methods: {
        moment,
         handleSelectChangeSex (value) {
            console.log(value);
        },
        handleSelectChangeEmrgncyContact (value) {
            console.log(value);
        },
        async addContact(){
        
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
        // console.log(this.course_flag)
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
        // async addContact(){
        //     // this.ec_flag = ((this.ec_flag) ? this.ec_flag = false, this.iconType = 'plus' : this.ec_flag = true, this.iconType = 'minus') 
        //     if(this.ec_flag){
        //         this.ec_flag = false,
        //         this.iconType = 'minus'
        //         this.iconText = 'Remove Contact'
        //     }else{
        //         this.ec_flag = true,
        //         this.iconType = 'plus'
        //         this.iconText = 'Add Contact'
        //     }

        //     console.log(this.ec_flag)
        // },

        async register(e){
            e.preventDefault();
            if(!this.ec_flag)
                this.form.getFieldDecorator('emergency_contact', { hidden: true })
      
            this.form.validateFields(async (err, values) => {
                if(!err){
                    try {
                        console.log(values)
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
                    
                    console.log(ec_flag)
                    console.log(s_flag)
                    console.log(c_flag)
                    let data = {
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
                        ec_fname : ec_fname,
                        ec_lname : ec_lname, 
                        ec_mname : ec_mname,
                        ec_address : ec_address,
                        ec_contact_number : ec_contact_number,
                    }
                    console.log(data)
                    let trainee = await this.$axios.post(`/trainee_set_training`,{
                            training_id : this.id,
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

                    // console.log(trainee.data)

                    this.$router.push({
                        path: `/training/register/success/${trainee.data.data.id}`,
                    });
                    // this.loading = false;
                    // this.visible = false;
                    // this.form.resetFields();
                    } catch (error) {
                        console.log(error.data)
                        if(error.status == 422)
                            this.error =  error.data.message.trainee_fname[0]
                    }
                    
                }
            })
        },
        filterOption(input, option) {
            // console.log(option)
            return option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
        },
        handleSelectContact(value,option)
        {
            console.log(value)
            console.log(this.form.getFieldValue('emergency_contact'))
        },
        handleChangeContact(value){
            console.log(value)
        }

    },
}
</script>
