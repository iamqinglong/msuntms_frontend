<template>
  <div>
        <div>
          <a-button type="primary" icon="scan" @click="showModal('qr')">
            Scan QR Code
          </a-button>
          <a-button type="primary" icon="usergroup-add" @click="showModal('manual')">
            Batch Sign in
          </a-button>
        </div>
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
        </a-table>
          <a-modal
            title="Attendance Sign in"
            v-model="visible"
          >
          <template slot="footer">
              <a-button key="back" @click="handleCancel" v-if="modalType == 'manual'">Cancel</a-button>
              <a-button key="submit" type="primary" html-type="submit" :loading="loading" @click="handleOk" v-if="modalType == 'manual'">
                  Sign in
              </a-button>
          </template>
            <qrcode-stream @decode="onDecode" @init="onInit" v-if="modalType == 'qr'"></qrcode-stream>
            <a-alert type="error" v-if="error" :message="error" banner />
            <label class="typo__label" for="ajax" v-if="modalType == 'manual'">Select Trainee: </label>
            <multiselect v-model="selectedTrainee"
                            placeholder="Type to search"  
                            label="full_name" 
                            track-by="full_name" 
                            :multiple="true"
                            :options="unattend_list"  
                            :allow-empty="false"
                            :select-label="'Click to change'"
                            :deselect-label="'Selected'"
                            :hide-selected="true"
                            :options-limit="300" 
                            :limit="3" 
                            :limit-text="limitText" 
                            >
            </multiselect>
            <!-- <multiselect v-model="selectedTrainee" 
                id="ajax" 
                label="full_name" 
                track-by="full_name" 
                placeholder="Type to search" 
                open-direction="bottom" 
                :options="unattend_list" 
                :multiple="true" 
                :searchable="true" 
                :loading="isLoading" 
                :internal-search="false" 
                :clear-on-select="false" 
                :close-on-select="false" 
                :options-limit="300" 
                :limit="3" 
                :limit-text="limitText" 
                :max-height="600" 
                :show-no-results="false" 
                :hide-selected="true" 
                v-if="modalType == 'manual'">
                <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag"><span>{{ option.full_name }}</span><span class="custom__remove" @click="remove(option)">❌</span></span></template>
                <template slot="clear" slot-scope="props">
                <div class="multiselect__clear" v-if="selectedTrainee.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
                </template><span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
            </multiselect> -->
          </a-modal>
  </div>

</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>

import moment from 'moment'
// import { QrcodeStream } from 'vue-qrcode-reader'
import Multiselect from 'vue-multiselect';
export default {
  middleware: 'auth',
  components: {Multiselect},
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
    try {
      let [attend_list, unattend_list] = await Promise.all([ $axios.get(`/attend_list/${params.id}`),
                               $axios.get(`/unattend_list/${params.id}`)
                              ])
      
      attend_list.data.data.map(item => item.attend_logged_date = moment(item.attend_logged_date).format('YYYY-MM-DD h:mm A') )
      unattend_list.data.data.map(item => {
                if(!item.trainee_mname === null)
                    item.full_name = item.trainee_fname +' '+item.trainee_mname+' '+item.trainee_lname
                else
                    item.full_name = item.trainee_fname +' '+item.trainee_lname
                    })
      // console.log(unattend_list.data.data)
      // console.log(attend_list.data.data)
      return {
        data: attend_list.data.data,
        id: params.id,
        unattend_list: unattend_list.data.data
      }
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      //multi-select options
      selectedTrainee: [],
      isLoading: false,
      //multi-select options
      //modal options
      modalType : '',
      result: '',
      error: '',
      visible:false,
      loading : false,
      //modal options
      //table options
      // data:[],
      searchText: '',
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
      }, {
        title: 'Attend Time',
        dataIndex: 'attend_logged_date',
        key: 'attend_logged_date',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.attend_logged_date.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus()
            })
          }
        },
      }],
      //table options
    }
  },
  mounted() {
    // this.data.map(item => moment(item.attend_logged_date).format('YYYY-MM-DD h:mm A') )
    // console.log(this.data)
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

    showModal(arg){
      console.log(arg)
      this.modalType = arg
      this.visible = true
    },

    async handleOk(e) {
      e.preventDefault();
      this.loading = true
      try {
        console.log(this.selectedTrainee)
        let trainee_id = []
        this.selectedTrainee.forEach((item) => {
            trainee_id.push(item.tid)
        })
        let trainee = await this.$axios.post(`/attend_batch/`,{
          attendance_sheet_id : this.id,
          trainee_id : trainee_id
        })
        // console.log(trainee.data)
         this.selectedTrainee.forEach((item) => {
          item.attend_logged_date = moment().format('YYYY-MM-DD h:mm A')
        })
        this.unattend_list = this.unattend_list.filter(elem => !this.selectedTrainee.includes(elem))
        this.data = [...this.data,...this.selectedTrainee]
        this.$message.success(trainee.data.message)
        this.visible = false
        this.loading = false
        this.selectedTrainee = []
      } catch (error) {
        console.log(error)
        this.$message.error(this.$store.state.validation.errors.message);
      }
      // this.visible = false
      
    },
    handleCancel(){
      this.visible = false;
      this.loading = false
      this.selectedTrainee = []
    },
    limitText (count) {
        return `and ${count} other trainee`
    },
    async onDecode (result) {
      
      try {

        console.log(result)
        let code = result.split('_')
        let res = await this.$axios.post(`attend_add`,{
            attendance_sheet_id : this.id,
            trainee_id : code[0]
        })
        console.log(res.data)
        this.data.unshift(res.data.data[0])
        this.$message.success('Successfully signed in!')

      } catch (error) {
        console.log(error)
        if(error.status != 422)
          this.$message.error(error.statusText);
        else
          this.$message.error(this.$store.state.validation.errors.message);
      }
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
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
