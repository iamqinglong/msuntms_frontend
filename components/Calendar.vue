<template>
   
    <div>
        <FullCalendar 
        ref="fullCalendar"
        defaultView="dayGridMonth" 
        :plugins="calendarPlugins" 
        @dateClick="handleDateClick"
        @eventClick="handleClickEvent"
        :events="calendarEvents"
        :selectable="true"
        @select="handleSelectClick"
        :validRange="{
            start: start,
            end: end
        }"
        time-zone='local'
        :allDay="false"
        nextDayThreshold='00:00:00'
        />
        <a-modal
            :title="modalTitle"
            v-model="visible"
            >
            <template slot="footer">
            <a-button @click="handleView" v-if="buttonType == 'edit'">Attendance</a-button>
            <a-button key="back" @click="handleCancel">Cancel</a-button>
            <a-button key="submit" :title="modalButton" type="primary" html-type="submit" :loading="loading" @click="handleOk">
            {{modalButton}}        
            </a-button>
        </template>
            <a-form :form="form">
                <a-form-item
                    label="Title"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 8 }"
                    
                    >
                    <a-input
                        v-decorator="[
                        'attendance_title',
                         {rules: [{ required: true, message: 'Please input the title!' }]}
                        ]"
                    />
                    
                </a-form-item>
                <a-form-item
                    label="Start Time"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 8 }"
                >
                    <a-time-picker use12Hours format="h:mm A" @change="onChange" 
                        v-decorator="[
                        'start_time', 
                        {rules: [{ required: true, message: 'Please select start time!' }]}]"
                    />
                </a-form-item>
                <a-form-item
                    label="End Time"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 8 }"
                >
                    <a-time-picker use12Hours format="h:mm A" @change="onChange" 
                        v-decorator="[
                        'end_time', 
                        {rules: [{ required: true, message: 'Please select end time!' }]}]"
                    />
                </a-form-item>
                </a-form>
            </a-modal>
    </div>
</template>

<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
    import moment from 'moment'
    export default {
        // async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        //     try {
        //         let calendarEvents = await $axios.get(`/attendance${params.id}`) 
        //         console.log(calendarEvents.data)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // },
        props : {
            event : Object,
            listCalendarEvent: Array
        },
        components: {
            FullCalendar // make the <FullCalendar> tag available
        },
        data() {
            return {
                calendarPlugins: [ dayGridPlugin,interactionPlugin ],
                calendarEvents: this.listCalendarEvent,
                droppable: true,
                draggable: true,
                start : this.event.date_from,
                end : moment(this.event.date_to).add(1,'days').format('YYYY-MM-DD'),
                visible: false,
                form: this.$form.createForm(this),
                modalTitle : 'New Attendance Event',
                modalButton : 'Save',
                buttonType: 'add',
                loading: false,
                clickedDate: '',
                id: '',
            }
        },
        methods: {
            moment,
            handleDateClick(arg) {
                this.form.resetFields();
                this.visible = true
                console.log(arg.date)
                this.clickedDate = arg
                this.buttonType = 'add'
            
            },
            handleSelectClick(arg){
                // alert(arg)
                console.log(arg)

            },
            handleOk(e) {
                e.preventDefault();
               
                if(this.buttonType == 'add')
                {
                    this.form.validateFields( async (err, fieldsValue) => {
                        if(!err){
                            try {
                                this.loading = true
                                console.log(fieldsValue)
                                
                                let start = moment(this.clickedDate.dateStr)
                                let end = moment(this.clickedDate.dateStr)

                                start.set({hour: fieldsValue.start_time.get('hour'), minute: fieldsValue.start_time.get('minute')} )
                                end.set({hour: fieldsValue.end_time.get('hour'), minute: fieldsValue.end_time.get('minute')} )
                                // console.log(start)
                                // console.log(end)
                                // console.log(start.format('YYYY-MM-DD HH:mm'))
                                // console.log(end.format('YYYY-MM-DD HH:mm'))
                                if(end.format('YYYY-MM-DD HH:mm') > start.format('YYYY-MM-DD HH:mm'))
                                {
                                    let event = await this.$axios.post(`/attendance`,{
                                    training_id : this.event.id,
                                    attendance_title : fieldsValue.attendance_title,
                                    date_from : start.format('YYYY-MM-DD HH:mm'),
                                    date_to : end.format('YYYY-MM-DD HH:mm')
                                    })
                                    console.log(event.data)
                                    this.calendarEvents.push({
                                        id: event.data.data.id,
                                        title: event.data.data.attendance_title, 
                                        start: event.data.data.date_from,
                                        end: event.data.data.date_to,
                                        })
                                        console.log(this.calendarEvents)
                                        this.$message.success(`${event.data.message}`);
                                        this.form.resetFields();
                                        this.visible = false
                                }else{
                                    this.$message.error(`End Time shouldn't be greater than Start time`);
                                }
            
                                this.loading = false
                            } catch (error) {
                                this.$message.error(`${error.data.message}`);
                                this.loading = false
                            }
                            

                        }
                    })
                }
                else{
                    this.form.validateFields( async (err, fieldsValue) => {
                        if(!err){
                            try {
                                 this.loading = true
                                console.log(fieldsValue)
                                 if(fieldsValue.end_time.format('YYYY-MM-DD HH:mm') > fieldsValue.start_time.format('YYYY-MM-DD HH:mm'))
                                {
                                    console.log(this.calendarEvents)
                                    const newData = [...this.calendarEvents]
                                    console.log(newData)
                                    console.log(this.id)
                                    const target = newData.filter(item => this.id == item.id)[0]
                                    console.log(target)
                                    let event = await this.$axios.post(`/attendance/${this.id}`,{
                                        training_id : this.event.id,
                                        attendance_title : fieldsValue.attendance_title,
                                        date_from : fieldsValue.start_time.format('YYYY-MM-DD HH:mm'),
                                        date_to : fieldsValue.end_time.format('YYYY-MM-DD HH:mm')
                                    })
                                    console.log(event.data)
                                    const currentIndex = this.calendarEvents.indexOf(target);
                                    console.log(currentIndex)

                                    let data = {
                                        id : event.data.data.id,
                                        title : event.data.data.attendance_title,
                                        start : moment(event.data.data.date_from).format('YYYY-MM-DD HH:mm'),
                                        end : moment(event.data.data.date_to).format('YYYY-MM-DD HH:mm'),
                                    }
                                    this.calendarEvents.splice(currentIndex, 1, data)
                                    this.$message.success(`${event.data.message}`);
                                    this.form.resetFields();
                                    this.visible = false;
                                }else{
                                    this.$message.error(`End Time shouldn't be greater than Start time`);
                                }
                                
                                this.loading = false
                                
                            } catch (error) {
                                console.log(error)
                                this.$message.error(`${error.data.message}`);
                                this.loading = false
                            }
                            
                        }
                    })
                }
                
            },
            handleCancel(e) {
                this.visible = false;
                this.form.resetFields();
            },
            handleClickEvent(arg){
                console.log(arg.event)
                this.visible = true;
                this.buttonType = 'edit'
                this.buttonTitle = 'Edit'
                this.modalTitle = 'Edit Event Details'
                this.$nextTick(() => {
                    this.form.setFieldsValue({attendance_title: arg.event.title});
                    this.form.setFieldsValue({start_time: moment(arg.event.start)});
                    this.form.setFieldsValue({end_time:  moment(arg.event.end)});

                });
                this.id = arg.event.id
            },
            onChange(time, timeString){
                console.log(timeString)
            },
            handleView(){

                this.$router.push({path:`/training/attendance/${this.id}`})
            }
        },
        mounted() {
            console.log(this.event)
            console.log(this.listCalendarEvent)
            // console.log( moment(this.event.date_from) )
            // let end = moment(this.event.date_to).add(1,'days').format('YYYY-MM-DD');
            // console.log(end)
            // this is test
        },
    }
</script>

<style lang='scss'>

@import '@fullcalendar/core/main.css';
@import '@fullcalendar/daygrid/main.css';

</style>