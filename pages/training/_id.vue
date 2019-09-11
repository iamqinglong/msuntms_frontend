<template>
    <div>
        <a-form :form="form">
            <h4>Training Details</h4>
            <br>
            <a-form-item
                label="Title"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'title_of_training',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Location"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'location',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Start Date"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'date_from',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="End Date"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'date_to',
                    ]"
                />
            </a-form-item>
            <a-form-item
                label="Trainer"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                
                >
                <a-input
                    :disabled='true'
                    v-decorator="[
                    'trainer',
                    ]"
                />
            </a-form-item>
            </a-form>
            <center>
                <a-button type="primary" block @click="showEvalPage">
                Evaluate Training
            </a-button>
            </center>
            
            <br>
            <br>
            <a-button type="primary" @click="showModal">
                Add Trainee
            </a-button>
            <a-button type="primary" @click="showRegPage">
                Register Trainee
            </a-button>
            <br>
            <br>
            <center><h3>List of Trainees</h3></center>
            <a-table :dataSource="data" :columns="columns" rowKey="tid">
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
                    <a-popconfirm
                    title="Sure to delete?"
                    @confirm="() => handleDelete(key,record)">
                    <a >Delete</a>
                </a-popconfirm>
                </span>
            </a-table>
            <br>
            <br>
            <center><h1>Attendance</h1></center>
            <div>
                <!-- <a-calendar @panelChange="onPanelChange" /> -->
                <full-calendar :event="training" :listCalendarEvent="listCalendarEvent">
                </full-calendar>
            </div>


            <a-modal
                v-model="visible"
                title="Add Trainee"
                onOk="handleOk"
                >
                <template slot="footer">
                    <a-button key="back" @click="handleCancel">Cancel</a-button>
                    <a-button key="submit" type="primary" html-type="submit" :loading="loading" @click="handleOk">
                        Add
                    </a-button>
                </template>
                <a-form :form="form2">
                         <label class="typo__label" for="ajax">Select Trainee: </label>
                         <multiselect v-model="selectedTrainee"
                            placeholder="Type to search"  
                            label="full_name" 
                            track-by="full_name" 
                            :multiple="true"
                            :options="non_trainee"  
                            :allow-empty="false"
                            :select-label="'Click to change'"
                            :deselect-label="'Selected'"
                            :hide-selected="true"
                            :options-limit="300" 
                            :limit="3" 
                            :limit-text="limitText" 
                            >
                        </multiselect>
                        
                        <a-alert type="error" v-if="error" :message="error" banner />
                    </a-form>
             </a-modal>
            
    </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
import moment from 'moment';
import Multiselect from 'vue-multiselect';

export default {
    middleware: 'auth',
    components: {
        Multiselect
    },
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
        try {
            
            
            let [training, attendance, trainee, non_trainee] = await Promise.all([ $axios.get(`/trainings/${params.id}`),
                                 $axios.get(`/attendance_event/${params.id}`),
                                 $axios.get(`/trainee_training_list/${params.id}`),
                                 $axios.get(`/trainee_not_set_trainings/${params.id}`)
                              ])

            console.log(training.data.data)
            non_trainee.data.data.map(item => {
                if(!item.trainee_mname === null)
                    item.full_name = item.trainee_fname +' '+item.trainee_mname+' '+item.trainee_lname
                else
                    item.full_name = item.trainee_fname +' '+item.trainee_lname
                    })
                
            return {
                id : params.id,
                training : training.data.data[0],
                listCalendarEvent : attendance.data.data,
                data : trainee.data.data,
                non_trainee : non_trainee.data.data
            
            }
        } catch (error) {
            console.log(error)
        }
        
    },
    data() {
        return {
            //options multi-select
            selectedTrainee: [],
            // non_trainee: [],
            isLoading: false,
            //options multi-select
            loading: false,
            visible: false,
            //table options
            // data: [],
            searchText: '',
            error: '',
            searchInput: null,
            columns: [ {
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
                    })
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
            }, {
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
                title: 'Action',
                key: 'action',
                scopedSlots: { customRender: 'action' },
            },],
            //table options
            form: this.$form.createForm(this),
            form2: this.$form.createForm(this),
        }
    },
    methods: {
        moment,
        showEvalPage(){
            this.$router.push({
                path: `/training/evaluate/${this.id+'_'+this.training.title_of_training}`
          });
        },
         showRegPage(){
            this.$router.push({
                path: `/training/register/${this.id+'_'+this.training.title_of_training}`
          });
        },
        onPanelChange(value, mode) {
            console.log(value, mode);
        },
        handleAdd(){
            
        },
        handleSearch (selectedKeys, confirm) {
            confirm()
            this.searchText = selectedKeys[0]
        },

        handleReset (clearFilters) {
            clearFilters()
            this.searchText = ''
        },

        showModal() {
            this.form2.resetFields();
            this.visible = true;
        },
        async handleOk(e) {
            // console.log(this.selectedTrainee)
            e.preventDefault();
            this.loading = true
            if(!this.selectedTrainee.length){
                this.error = "Please select a trainee"
            }
            else{
               try {
                   
                    //training_trainees
                    let trainee_id = []
                    this.selectedTrainee.forEach((element) => {
                        trainee_id.push(element.tid)
                    })
                    let res = await this.$axios.post('training_trainees',{
                        training_id : this.id,
                        trainee_id : trainee_id
                    })
                    console.log(res.data)
                    let not_trainee = await this.$axios.get(`/trainee_not_set_trainings/${this.id}`)
                    not_trainee.data.data.map(item => item.full_name = item.trainee_fname +' '+item.trainee_lname)
                    this.non_trainee = not_trainee.data.data
                     this.data = [...this.data, ...this.selectedTrainee]
                    this.selectedTrainee = []
                    this.$message.success('Successfully added!')
                    this.form2.resetFields();
                    this.visible = false
                    this.loading = false
               } catch (error) {
                   console.log(error)
                   this.loading = false
               }
                
            }
           
        },
        handleCancel(e) {
            this.visible = false;
            this.loading = false
            this.selectedTrainee = []
        },
        limitText (count) {
            return `and ${count} other trainee`
        },
        asyncFind (query) {
        this.isLoading = true
        ajaxFindCountry(query).then(response => {
            this.countries = response
            this.isLoading = false
        })
        },
        clearAll () {
            this.selectedTrainee = []
        },
        async handleDelete(key,record){
            console.log(key,record)
            try {

                let trainee = await this.$axios.post(`/training_trainees_del`,{
                    training_id : this.id,
                    trainee_id : key.tid.toString()
                })
                this.$message.success(`${trainee.data.message}`);
                const data = [...this.data]
                this.data = data.filter(item => item.tid !== key.tid)
                let not_trainee = await this.$axios.get(`/trainee_not_set_trainings/${this.id}`)
                not_trainee.data.data.map(item => item.full_name = item.trainee_fname +' '+item.trainee_lname)
                this.non_trainee = not_trainee.data.data
                console.log(this.non_trainee)
            } catch (error) {
                
                console.log(error)
                if(error.status != '422')
                    this.$message.error(error.statusText)
                else
                    this.$message.error(this.$store.state.validation.errors.message);
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.form.setFieldsValue({title_of_training: this.training.title_of_training});
            this.form.setFieldsValue({location: this.training.baranggay+', '+this.training.municipality+', '+this.training.province});
            this.form.setFieldsValue({date_from: moment(this.training.date_from).format('YYYY-MM-DD h:mm A') } );
            this.form.setFieldsValue({date_to: moment(this.training.date_to).format('YYYY-MM-DD h:mm A')});
            this.form.setFieldsValue({trainer: this.training.trainer});
      });
    },
}
</script>
