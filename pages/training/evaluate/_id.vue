<template>
    <div>
    
    <img class="pic" src="@/static/msunlogo.png" width="120px;" height="120px;" style="float: left;">
    <h2 class="headers2" style="font-weight: lighter; position: relative; left: 10px; top: 10px;">Minandao State University at Naawan<br>E X T E N S I O N  D I V I S I O N<br>9023 Naawan, Misamis Oriental</h2>
    <br><h1 class="hidden"><br></h1>
    <h2 class="headers" style="text-align: center; font-weight: lighter;"><b>Participants Training Evaluation</b></h2>
     <h2 class="headers" style="text-align: left; font-weight: lighter; font-size: 15px; ">Date: <b>{{date.toDateString()}}</b></h2>
    <h2 class="headers" style="text-align: left; font-weight: lighter; font-size: 15px;">Title of Training: <b>{{training.title_of_training}}</b></h2>
    <h2 class="headers" style="text-align: left; font-weight: lighter; font-size: 15px;">Location of the Training: <b>{{training.baranggay+', '+training.municipality+', '+training.province}}</b></h2>
    <h2 class="headers" style="text-align: left; font-weight: lighter; font-size: 15px;">Trainer: <b>{{training.trainer}}</b></h2>
    <br>
    <h2 class="headers" style="text-align: center; font-weight: lighter; font-size: 15px;">Instruction: Palihug tubaga ang musunod nga mga pangutana pinaagi sa pag tuplok sa lingin. (Please respond to the following questions by clicking the circle corresponsing your answer.)</h2>
    <form id="app" @submit.prevent="submit" method="post">
    <table>
      <thead>
        <tr>
          <th scope="col">Question<br>(Mga Pangutana)</th>
          <th scope="col">Kusganong Miuyon (Strongly Agree)</th>
          <th scope="col">Miuyon<br>(Agree)</th>
          <th scope="col">Neyutral<br>(Neutral)</th>
          <th scope="col">Wala Miuyon<br>(Disagree)</th>
          <th scope="col">Kusganong Wala Miuyon<br>(Strongly Disagree)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="" style="text-align: left;">1. Ang mga gihisgutan nga mga hilisgutan adunay kalabutan kanako.<br>(The topics covered were relevant to me.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input name="q_1" type="radio" value='5' v-model="q_1" required></td>
          <td data-label="Miuyon (Agree)"><input name="q_1" type="radio" value='4' v-model="q_1"></td>
          <td data-label="Neyutral (Neutral)"><input name="q_1" type="radio" value='3' v-model="q_1"></td>
          <td data-label="Wala Miuyon (Disagree)"><input name="q_1" type="radio" value='2' v-model="q_1"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input name="q_1" type="radio" value='1' v-model="q_1"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">2. Kini nga training experience mapuslan sa akong trabaho.<br>(This training experience will be useful in my work.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input name="q_2" type="radio" value='5' v-model="q_2" required></td>
          <td data-label="Miuyon (Agree)"><input name="q_2" type="radio" value='4' v-model="q_2"></td>
          <td data-label="Neyutral (Neutral)"><input name="q_2" type="radio" value='3' v-model="q_2"></td>
          <td data-label="Wala Miuyon (Disagree)"><input name="q_2" type="radio" value='2' v-model="q_2"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input name="q_2" type="radio" value='1' v-model="q_2"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">3. Ang trainer adunay kahibalo mahitungod sa mga hilisgutan sa training.<br>(The trainer was knowledgeable about the training topics.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input name="q_3" type="radio" value='5' v-model="q_3" required></td>
          <td data-label="Miuyon (Agree)"><input name="q_3" type="radio" value='4' v-model="q_3"></td>
          <td data-label="Neyutral (Neutral)"><input name="q_3" type="radio" value='3' v-model="q_3"></td>
          <td data-label="Wala Miuyon (Disagree)"><input name="q_3" type="radio" value='2' v-model="q_3"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input name="q_3" type="radio" value='1' v-model="q_3"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">4. Ang trainer adunay kahibalo mahitungod sa mga hilisgutan sa training.<br>(The trainer was knowledgeable about the training topics.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input name="q_4" type="radio" value='5' v-model="q_4" required></td>
          <td data-label="Miuyon (Agree)"><input name="q_4" type="radio" value='4' v-model="q_4"></td>
          <td data-label="Neyutral (Neutral)"><input name="q_4" type="radio" value='3' v-model="q_4"></td>
          <td data-label="Wala Miuyon (Disagree)"><input name="q_4" type="radio" value='2' v-model="q_4"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input name="q_4" type="radio" value='1' v-model="q_4"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">5. Ang mga tumong sa training kay natuman.<br>(The training objectives were met.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input name="q_5" type="radio" value='5' v-model="q_5" required></td>
          <td data-label="Miuyon (Agree)"><input name="q_5" type="radio" value='4' v-model="q_5"></td>
          <td data-label="Neyutral (Neutral)"><input name="q_5" type="radio" value='3' v-model="q_5"></td>
          <td data-label="Wala Miuyon (Disagree)"><input name="q_5" type="radio" value='2' v-model="q_5"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input name="q_5" type="radio" value='1' v-model="q_5"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">6. Ang mga panahon nga gigahin alang sa training kay igo na.<br>(The time alloted for the training was sufficient.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input name="q_6" type="radio" value='5' v-model="q_6" required></td>
          <td data-label="Miuyon (Agree)"><input name="q_6" type="radio" value='4' v-model="q_6"></td>
          <td data-label="Neyutral (Neutral)"><input name="q_6" type="radio" value='3' v-model="q_6"></td>
          <td data-label="Wala Miuyon (Disagree)"><input name="q_6" type="radio" value='2' v-model="q_6"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input name="q_6" type="radio" value='1' v-model="q_6"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">7. Ang meeting room ug mga pasilidad igo ug komportable.<br>(The meeting room and facilities were adequate and comfortable.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input name="q_7" type="radio" value='5' v-model="q_7" required></td>
          <td data-label="Miuyon (Agree)"><input name="q_7" type="radio" value='4' v-model="q_7"></td>
          <td data-label="Neyutral (Neutral)"><input name="q_7" type="radio" value='3' v-model="q_7"></td>
          <td data-label="Wala Miuyon (Disagree)"><input name="q_7" type="radio" value='2' v-model="q_7"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input name="q_7" type="radio" value='1' v-model="q_7"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">8. Ang mga estilo ug pama-agi sa mga lecturer sa pagtudlo kay maayo ba.<br>(The teaching styles and directions of the lecturers are good.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input name="q_8" type="radio" value='5' v-model="q_8" required></td>
          <td data-label="Miuyon (Agree)"><input name="q_8" type="radio" value='4' v-model="q_8"></td>
          <td data-label="Neyutral (Neutral)"><input name="q_8" type="radio" value='3' v-model="q_8"></td>
          <td data-label="Wala Miuyon (Disagree)"><input name="q_8" type="radio" value='2' v-model="q_8"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input name="q_8" type="radio" value='1' v-model="q_8"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">9. Nalingaw ka ba sa training nga gihatag kanimo<br>(Did you enjoy the training that was given to you.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input name="q_9" type="radio" value='5' v-model="q_9" required></td>
          <td data-label="Miuyon (Agree)"><input name="q_9" type="radio" value='4' v-model="q_9"></td>
          <td data-label="Neyutral (Neutral)"><input name="q_9" type="radio" value='3' v-model="q_9"></td>
          <td data-label="Wala Miuyon (Disagree)"><input name="q_9" type="radio" value='2' v-model="q_9"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input name="q_9" type="radio" value='1' v-model="q_9"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">10. Natuman ba ang imong expectation.<br>(Did your expectation was fulfilled.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input name="q_10" type="radio" value='5' v-model="q_10" required></td>
          <td data-label="Miuyon (Agree)"><input name="q_10" type="radio" value='4' v-model="q_10"></td>
          <td data-label="Neyutral (Neutral)"><input name="q_10" type="radio" value='3' v-model="q_10"></td>
          <td data-label="Wala Miuyon (Disagree)"><input name="q_10" type="radio" value='2' v-model="q_10"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input name="q_10" type="radio" value='1' v-model="q_10"></td>
        </tr>
        
      </tbody>
    </table>
    <br>
    <h2 class="headers" style="text-align: left; font-weight: lighter; font-size: 15px;"><b> Unsa ang imong nagustuhan mahitungod sa training?</b><br><b>(What did you like about this training?)</b><br> </h2>
    <textarea style="width: 99.2%; height: 100px;" name="comment" v-model="comment" required></textarea>
    <center><button type="submit" role="button" value="Submit">Submit</button></center>
    </form>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    layout: 'no_layout',
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
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
      try {
          let url = params.id.split('_')
          let training = await $axios.get(`/trainings/${url[0]}`)
          // console.log(training.data.data[0])
          return {
            id : url[0],
            training : training.data.data[0],
            date : new Date()
          }
      } catch (error) {
        console.log(error.data)
      }
    },
    data() {
        return {
            form: this.$form.createForm(this),
            q_1 : '',
            q_2 : '',
            q_3 : '',
            q_4 : '',
            q_5 : '',
            q_6 : '',
            q_7 : '',
            q_8 : '',
            q_9 : '',
            q_10 : '',
            comment : ''
        }
    },
    methods: {
        moment,

        async submit(){
            
            try {
              let i = 1
              let data = []
              while (i <= 10) {
                let split = `q_${i}`.split('_')
                data.push({
                  [`${i}`] : this[`q_${i}`]
                })
                i++
              }
              
              let res = await this.$axios.post(`/evaluate`,{
                 training_id : this.id,
                 comment_text : this.comment,
                 data : data
              })

              this.$router.push({
                        path: `/training/evaluate/success`,
                    });
            } catch (error) {
              console.log(error)
            }
        },

        validate(question){
            if(question)
            { return true }
            else
            { return false }
        }
    },
}
</script>

<style scoped>
    body {
      font-family: "Open Sans", sans-serif;
      line-height: 1.25;
      margin: 50px;
    }

    table {
      border: 1px solid #ccc;
      border-collapse: collapse;
      margin: 0;
      padding: 0;
      width: 100%;
      table-layout: fixed;
    }

    table caption {
      font-size: 1.5em;
      margin: .5em 0 .75em;
    }

    .headers{
      font-size: 1.5em;
      margin: .5em 0 .75em;
    }

    table tr {
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      padding: .35em;
    }

    table th,
    table td {
      padding: .625em;
      text-align: center;
    }

    table th {
      font-size: .85em;
      letter-spacing: .1em;
      text-transform: uppercase;
    }

    .hidden{
      display: none;
    }

    @media screen and (max-width: 600px) {
      table {
        border: 0;
      }

      table caption {
        font-size: 1.3em;
      }

      .headers{
         font-size: 1.3em;
      }

      .headers2{
        font-size: 0.9em;
        float: left;
        margin-left: 7px;
      }
      
      table thead {
        border: none;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }
      
      table tr {
        border-bottom: 3px solid #ddd;
        display: block;
        margin-bottom: .625em;
      }
      
      table td {
        border-bottom: 1px solid #ddd;
        display: block;
        font-size: .8em;
        text-align: right;
      }
      
      table td::before {
        /*
        * aria-label has no advantage, it won't be read inside a table
        content: attr(aria-label);
        */
        content: attr(data-label);
        float: left;
        font-weight: bold;
      }
      
      table td:last-child {
        border-bottom: 0;
      }

      .pic{
        width: 60px;
        height: 60px;
        float: left;
        position: relative;
        top: 20px;
        left: 5px;
      }

      .hidden{
        display: block;
      }

    }
     button {
      font-size: 14px;
      padding: 6px 12px;
      margin-bottom: 0;
      display: inline-block;
      text-decoration: none;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background-image: none;
      border: 1px solid transparent;
      border-radius: 5px;
      background-color: #1bbb1b;
      color: #ffffff;
      width: 30%;

    }
    button:focus,
    button:active:focus {
        outline: thin dotted;
        outline: 5px auto -webkit-focus-ring-color;
        outline-offset: -2px;
    }
    button:hover,
    button:focus {
        color: #333;
        text-decoration: none;
    }
</style>