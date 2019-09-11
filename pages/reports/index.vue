<template>
    <div>
        <div>
            <a-form :form="form">
                <h2>Evaluation List</h2>
                <a-row :gutter="16">
                    <a-col class="gutter-row" :span="6">
                    <div class="gutter-box">
                        
                        <a-form-item
                        label="Training"
                        >
                            <a-select
                                    showSearch
                                    placeholder="Search and select"
                                    optionFilterProp="children"
                                    style="width: 300px"
                                    :filterOption="filterOption"
                                    v-decorator="[
                                    'training_id_2',
                                    {initialValue : defaultValTraining},
                                    {rules: [{ required: true, message: 'Please select which training' },
                                        ]}
                                    ]"
                                    @change="handleChangeEval"
                                >
                                    <a-select-option v-for="training in training_list " :key="training.id">
                                        {{training.title_of_training}}
                                    </a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                </a-col>
                <a-col class="gutter-row" :span="6">
                    <div class="gutter-box">
                         <a-form-item
                        label="Evaluations"
                        >
                        <a-button type="primary" @click="submit">Generate Evaluation List</a-button>
                        </a-form-item>
                    </div>
                </a-col>
                </a-row>
                <br>
                <br>
                <h2>List of Attendance in Trainings</h2>
                <a-row :gutter="16">
                <a-col class="gutter-row" :span="6">
                    <div class="gutter-box">
                        <a-form-item
                        label="Training"
                        >
                            <a-select
                                    showSearch
                                    placeholder="Search and select"
                                    optionFilterProp="children"
                                    style="width: 300px"
                                    :filterOption="filterOption"
                                    v-decorator="[
                                    'training_id',
                                    {initialValue : defaultValTraining},
                                    {rules: [{ required: true, message: 'Please select which training' },
                                        ]}
                                    ]"
                                    @change="handleChangeTraining"
                                >
                                    <a-select-option v-for="training in training_list " :key="training.id">
                                        {{training.title_of_training}}
                                    </a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                </a-col>
                <a-col class="gutter-row" :span="6">
                    <div class="gutter-box">
                            <a-form-item
                            label="Attendance Sheet"
                            >
                                <a-select
                                        showSearch
                                        placeholder="Search and select"
                                        optionFilterProp="children"
                                        style="width: 300px"
                                        :filterOption="filterOption"
                                        v-decorator="[
                                        'attend_event_id',
                                        {initialValue : defaultValAttend ? defaultValAttend : ''},
                                        {rules: [{ required: true, message: 'Please select which attendance event' },
                                            ]}
                                        ]"
                                        @change="handleChangeAttend"
                                    >
                                        <a-select-option v-for="attend in attend_event_list " :key="attend.id" >
                                            {{attend.title}}
                                        </a-select-option>
                                </a-select>
                            </a-form-item>
                    </div>
                    
                </a-col>
               
                
                </a-row>
            </a-form>
        </div>
        <br>
        <no-ssr>
        <datatable
        :title="title"
        :columns="tableColumns1"
        :rows="dataSource"
        :perPage="[3, 5, 10]"
        ></datatable>
        </no-ssr>
    </div>
</template>

<script>

// import DataTable from "vue-materialize-datatable";
import moment from 'moment';
export default {
middleware : 'auth',
async asyncData({isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
    try {
        let training = await $axios.get(`/trainings`)
        let defaultValTraining = (( training.data.data.length ) ? {'valTraining':training.data.data[0].id, 'training_list': training.data.data} : {'valTraining':'No Data Available', 'training_list': []})
        let  defaultValAttend = {'valAttend' : 'No Data Available', 'attend_list': []}
        let title = 'No Data Available'
        let attend_event_list = ''
        let attendance_list = ''
        let dataSource = []
        if(defaultValTraining.training_list.length){
            try {
                attend_event_list = await $axios.get(`/attendance_event/${training.data.data[0].id}`)
                defaultValAttend = (( attend_event_list.data.data.length ) ? {'valAttend' : attend_event_list.data.data[0].id, 'attend_list': attend_event_list.data.data} : {'valAttend' : 'No Data Available', 'attend_list': []})
            
            } catch (error) {
                console.log(error.data)
            }
            
            if(defaultValAttend.attend_list.length){

                try {
                    title = attend_event_list.data.data[0].title
                    attendance_list = await $axios.get(`/reports_attendance/${attend_event_list.data.data[0].id}`)
                    // console.log(attendance_list.data)
                    if(attendance_list.data.success){
                        attendance_list.data.data[0].trainee_attendance.map(item => {
                            item.logged = moment(item.logged).format('YYYY-MM-DD h:mm A')
                        })
                        dataSource = attendance_list.data.data[0].trainee_attendance
                    
                    }
                } catch (error) {
                    console.log(error.data)
                }
                
            }
        }
        
        return {
            eval : defaultValTraining.valTraining,
            training_list : defaultValTraining.training_list,
            attend_event_list : defaultValAttend.attend_list,
            defaultValTraining: defaultValTraining.valTraining,
            defaultValAttend: defaultValAttend.valAttend,
            dataSource : dataSource,
            title : title,
        }
    } catch (error) {
        console.log(error.data)
    }
},
data() {
  return {
    form : this.$form.createForm(this),
    toggle: false, 
    tableColumns1: [
      {
        label: "Full Name",
        field: "name",
        numeric: false,
        html: false
      },
      {
        label: "Signed in",
        field: "logged",
        numeric: false,
        html: false
      },
    ],
  }
},
methods: {
    async handleChangeAttend (arg) {
        console.log(arg)
        //attendance_event/id
        try {
           let res = await this.$axios.get(`/reports_attendance/${arg}`)
           if(res.data.success){
               res.data.data[0].trainee_attendance.map(item => {
                item.logged = moment(item.logged).format('YYYY-MM-DD h:mm A')
            })
            this.dataSource = res.data.data[0].trainee_attendance
           
           }
           else{
               this.dataSource = []
           }
            const target = this.attend_event_list.filter(item => arg === item.id)[0]
            this.title = target.title
            
        } catch (error) {
            console.log(error.data)
            
        }
    },
    async handleChangeTraining (arg) {
        console.log(arg)
        //attendance_event/id
        try {
           let res = await this.$axios.get(`/attendance_event/${arg}`)
        //    console.log(res.data)
           let defaultValAttend = {'valAttend' : 'No Data Available', 'attend_list': []}
           if(res.data.data.length){
            defaultValAttend = (( res.data.data.length ) ? {'valAttend' : res.data.data[0].id, 'attend_list': res.data.data} : {'valAttend' : 'No Data Available', 'attend_list': []})
                if(defaultValAttend.attend_list.length){
                    this.title = res.data.data[0].title
                    let attendance_list = await this.$axios.get(`/reports_attendance/${res.data.data[0].id}`)
                    if(attendance_list.data.success){
                        attendance_list.data.data[0].trainee_attendance.map(item => {
                            item.logged = moment(item.logged).format('YYYY-MM-DD h:mm A')
                        })
                        this.dataSource = attendance_list.data.data[0].trainee_attendance
                    }
                }
                
                // this.form.setFieldsValue({attend_event_id : defaultValAttend.valAttend})
                // console.log(this.defaultValAttend)
            }
            else{
                this.title = 'No Data Available'
                this.dataSource = []
                
            }
            this.attend_event_list = defaultValAttend.attend_list
            this.defaultValAttend = defaultValAttend.valAttend
        } catch (error) {
            console.log(error.data)
        }
    },
    async submit(){
        this.$router.push({
                path: `/reports/evaluation/${this.eval}`
          });
    },
    async handleChangeEval(arg) {
        this.eval = arg
    },
    filterOption(input, option) {
            // console.log(option)
            return option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
    },
},
mounted() {
    // this.form.options.initialValue({training_id : this.defaultValTraining})
    // this.form.options.initialValue({training_id_2 : this.defaultValTraining})
    // this.form.options.initialValue({attend_event_id : this.defaultValAttend})
},
}
</script>

<style lang="scss" scoped>
// @import "~material-design-icons-iconfont/dist/material-design-icons";
// @import url(http://fonts.googleapis.com/icon?family=Material+Icons);
</style>
