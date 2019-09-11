<template>
    <div class="wrapper" style="margin: 0;">
  <img class="pic" src="@/static/msunlogo.png" width="100px;" height="100px;" style="float: left;">
  <h2 class="headers2" style="font-weight: lighter; position: relative; right: -8px; top: 10px;">Minandao State University at Naawan<br>E X T E N S I O N  &nbsp;D I V I S I O N<br>9023 Naawan, Misamis Oriental</h2>
  <br><h1 class="hidden"><br></h1>
  <p style="border-bottom: 2px solid black;"></p>
  <h2 class="headers" style="text-align: center; font-weight: lighter;"><b>Participant's Training Evaluation</b></h2>
  <h2 class="headers" style="text-align: left; font-weight: lighter; font-size: 15px; ">Date: <b>{{date}}</b></h2>
  <h2 class="headers" style="text-align: left; font-weight: lighter; font-size: 15px;">Title of Training: <b><br class="hidden">{{training.title_of_training}}</b></h2>
  <h2 class="headers" style="text-align: left; font-weight: lighter; font-size: 15px;">Location of the Training: <b><br class="hidden">{{training.baranggay+', '+training.municipality+', '+training.province}}</b></h2>
  <h2 class="headers" style="text-align: left; font-weight: lighter; font-size: 15px;">Trainer: <b><br class="hidden">{{training.trainer}}</b></h2>
  <br>
  <h2 class="headers3" style="text-align: center; font-weight: lighter; font-size: 15px;">Instruction: Palihug tubaga ang musunod nga mga pangutana pinaagi sa pag tuplok sa lingin. (Please respond to the following questions by clicking the circle corresponsing your answer.)</h2>
 
  <h2 class="error" style="text-align: center; color: red;">Naay error. Palihug ug butang sa imong tubag sa naka shade ug pula nga row sa ubos.<br>(An error occured. Answer(s) are required to the red shaded row(s) below.)</h2>
    
  <form :form="form">
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
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input disabled name="q_1" type="radio" value="5" v-model="this[`q_1_${evaluation.e_id}`]" required></td>
          <td data-label="Miuyon (Agree)"><input disabled name="q_1" type="radio" value="4" v-model="this[`q_1_${evaluation.e_id}`]"></td>
          <td data-label="Neyutral (Neutral)"><input disabled name="q_1" type="radio" value='3' v-model="this[`q_1_${evaluation.e_id}`]"></td>
          <td data-label="Wala Miuyon (Disagree)"><input disabled name="q_1" type="radio" value="2" v-model="this[`q_1_${evaluation.e_id}`]"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input disabled name="q_1" type="radio" value="1" v-model="this[`q_1_${evaluation.e_id}`]"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">2. Kini nga training experience mapuslan sa akong trabaho.<br>(This training experience will be useful in my work.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input disabled name="q_2" type="radio" value='5' v-model="this[`q_2_${evaluation.e_id}`]" required></td>
          <td data-label="Miuyon (Agree)"><input disabled name="q_2" type="radio" value='4' v-model="this[`q_2_${evaluation.e_id}`]"></td>
          <td data-label="Neyutral (Neutral)"><input disabled name="q_2" type="radio" value='3' v-model="this[`q_2_${evaluation.e_id}`]"></td>
          <td data-label="Wala Miuyon (Disagree)"><input disabled name="q_2" type="radio" value='2' v-model="this[`q_2_${evaluation.e_id}`]"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input disabled name="q_2" type="radio" value='1' v-model="this[`q_2_${evaluation.e_id}`]"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">3. Ang trainer adunay kahibalo mahitungod sa mga hilisgutan sa training.<br>(The trainer was knowledgeable about the training topics.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input disabled name="q_3" type="radio" value='5' v-model="this[`q_3_${evaluation.e_id}`]" required></td>
          <td data-label="Miuyon (Agree)"><input disabled name="q_3" type="radio" value='4' v-model="this[`q_3_${evaluation.e_id}`]"></td>
          <td data-label="Neyutral (Neutral)"><input disabled name="q_3" type="radio" value='3' v-model="this[`q_3_${evaluation.e_id}`]"></td>
          <td data-label="Wala Miuyon (Disagree)"><input disabled name="q_3" type="radio" value='2' v-model="this[`q_3_${evaluation.e_id}`]"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input disabled name="q_3" type="radio" value='1' v-model="this[`q_3_${evaluation.e_id}`]"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">4. Ang trainer adunay kahibalo mahitungod sa mga hilisgutan sa training.<br>(The trainer was knowledgeable about the training topics.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input disabled name="q_4" type="radio" value='5' v-model="this[`q_4_${evaluation.e_id}`]" required></td>
          <td data-label="Miuyon (Agree)"><input disabled name="q_4" type="radio" value='4' v-model="this[`q_4_${evaluation.e_id}`]"></td>
          <td data-label="Neyutral (Neutral)"><input disabled name="q_4" type="radio" value='3' v-model="this[`q_4_${evaluation.e_id}`]"></td>
          <td data-label="Wala Miuyon (Disagree)"><input disabled name="q_4" type="radio" value='2' v-model="this[`q_4_${evaluation.e_id}`]"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input disabled name="q_4" type="radio" value='1' v-model="this[`q_4_${evaluation.e_id}`]"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">5. Ang mga tumong sa training kay natuman.<br>(The training objectives were met.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input disabled name="q_5" type="radio" value='5' v-model="this[`q_5_${evaluation.e_id}`]" required></td>
          <td data-label="Miuyon (Agree)"><input disabled name="q_5" type="radio" value='4' v-model="this[`q_5_${evaluation.e_id}`]"></td>
          <td data-label="Neyutral (Neutral)"><input disabled name="q_5" type="radio" value='3' v-model="this[`q_5_${evaluation.e_id}`]"></td>
          <td data-label="Wala Miuyon (Disagree)"><input disabled name="q_5" type="radio" value='2' v-model="this[`q_5_${evaluation.e_id}`]"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input disabled name="q_5" type="radio" value='1' v-model="this[`q_5_${evaluation.e_id}`]"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">6. Ang mga panahon nga gigahin alang sa training kay igo na.<br>(The time alloted for the training was sufficient.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input disabled name="q_6" type="radio" value='5' v-model="this[`q_6_${evaluation.e_id}`]" required></td>
          <td data-label="Miuyon (Agree)"><input disabled name="q_6" type="radio" value='4' v-model="this[`q_6_${evaluation.e_id}`]"></td>
          <td data-label="Neyutral (Neutral)"><input disabled name="q_6" type="radio" value='3' v-model="this[`q_6_${evaluation.e_id}`]"></td>
          <td data-label="Wala Miuyon (Disagree)"><input disabled name="q_6" type="radio" value='2' v-model="this[`q_6_${evaluation.e_id}`]"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input disabled name="q_6" type="radio" value='1' v-model="this[`q_6_${evaluation.e_id}`]"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">7. Ang meeting room ug mga pasilidad igo ug komportable.<br>(The meeting room and facilities were adequate and comfortable.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input disabled name="q_7" type="radio" value='5' v-model="this[`q_7_${evaluation.e_id}`]" required></td>
          <td data-label="Miuyon (Agree)"><input disabled name="q_7" type="radio" value='4' v-model="this[`q_7_${evaluation.e_id}`]"></td>
          <td data-label="Neyutral (Neutral)"><input disabled name="q_7" type="radio" value='3' v-model="this[`q_7_${evaluation.e_id}`]"></td>
          <td data-label="Wala Miuyon (Disagree)"><input disabled name="q_7" type="radio" value='2' v-model="this[`q_7_${evaluation.e_id}`]"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input disabled name="q_7" type="radio" value='1' v-model="this[`q_7_${evaluation.e_id}`]"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">8. Ang mga estilo ug pama-agi sa mga lecturer sa pagtudlo kay maayo ba.<br>(The teaching styles and directions of the lecturers are good.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input disabled name="q_8" type="radio" value='5' v-model="this[`q_8_${evaluation.e_id}`]" required></td>
          <td data-label="Miuyon (Agree)"><input disabled name="q_8" type="radio" value='4' v-model="this[`q_8_${evaluation.e_id}`]"></td>
          <td data-label="Neyutral (Neutral)"><input disabled name="q_8" type="radio" value='3' v-model="this[`q_8_${evaluation.e_id}`]"></td>
          <td data-label="Wala Miuyon (Disagree)"><input disabled name="q_8" type="radio" value='2' v-model="this[`q_8_${evaluation.e_id}`]"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input disabled name="q_8" type="radio" value='1' v-model="this[`q_8_${evaluation.e_id}`]"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">9. Nalingaw ka ba sa training nga gihatag kanimo<br>(Did you enjoy the training that was given to you.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input disabled name="q_9" type="radio" value='5' v-model="this[`q_9_${evaluation.e_id}`]" required></td>
          <td data-label="Miuyon (Agree)"><input disabled name="q_9" type="radio" value='4' v-model="this[`q_9_${evaluation.e_id}`]"></td>
          <td data-label="Neyutral (Neutral)"><input disabled name="q_9" type="radio" value='3' v-model="this[`q_9_${evaluation.e_id}`]"></td>
          <td data-label="Wala Miuyon (Disagree)"><input disabled name="q_9" type="radio" value='2' v-model="this[`q_9_${evaluation.e_id}`]"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input disabled name="q_9" type="radio" value='1' v-model="this[`q_9_${evaluation.e_id}`]"></td>
        </tr>
        <tr>
          <td data-label="" style="text-align: left;">10. Natuman ba ang imong expectation.<br>(Did your expectation was fulfilled.)</td>
          <td data-label="Kusganong Miuyon (Strongly Agree)"><input disabled name="q_10" type="radio" value='5' v-model="this[`q_10_${evaluation.e_id}`]" required></td>
          <td data-label="Miuyon (Agree)"><input disabled name="q_10" type="radio" value='4' v-model="this[`q_10_${evaluation.e_id}`]"></td>
          <td data-label="Neyutral (Neutral)"><input disabled name="q_10" type="radio" value='3' v-model="this[`q_10_${evaluation.e_id}`]"></td>
          <td data-label="Wala Miuyon (Disagree)"><input disabled name="q_10" type="radio" value='2' v-model="this[`q_10_${evaluation.e_id}`]"></td>
          <td data-label="Kusganong Wala Miuyon (Strongly Disagree)"><input disabled name="q_10" type="radio" value='1' v-model="this[`q_10_${evaluation.e_id}`]"></td>
        </tr>
      
    </tbody>
  </table>
  <br>
  <h2 class="headers" style="text-align: left; font-weight: lighter; font-size: 15px;">Unsa ang imong nagustuhan mahitungod as training?<br>(What did you like about this training?)<br></h2>
  <textarea style="width: 99.2%; height: 100px; page-break-after: always;" name="comment" v-model="comment" disabled></textarea>
  </form>
    </div>
    
</template>

<script>
import moment from 'moment'
export default {
    layout: 'no_layout',
    props: {
        evaluation : Object,
        training : Object
    },
    data() {
        return {
            form: this.$form.createForm(this),
            [`q_1_${this.evaluation.e_id}`] : this.evaluation.data[0].answer_1,
            [`q_2_${this.evaluation.e_id}`] : this.evaluation.data[1].answer_2,
            [`q_3_${this.evaluation.e_id}`] : this.evaluation.data[2].answer_3,
            [`q_4_${this.evaluation.e_id}`] : this.evaluation.data[3].answer_4,
            [`q_5_${this.evaluation.e_id}`] : this.evaluation.data[4].answer_5,
            [`q_6_${this.evaluation.e_id}`] : this.evaluation.data[5].answer_6,
            [`q_7_${this.evaluation.e_id}`] : this.evaluation.data[6].answer_7,
            [`q_8_${this.evaluation.e_id}`] : this.evaluation.data[7].answer_8,
            [`q_9_${this.evaluation.e_id}`] : this.evaluation.data[8].answer_9,
            [`q_10_${this.evaluation.e_id}`] : this.evaluation.data[9].answer_10,
            comment : this.evaluation.comment,
            date : moment(this.evaluation.date_evaluated).format('LLL'),
        }
    },
    mounted() {
     
    },
}
</script>

<style type="css" scoped>
    body {
      font-family: "Open Sans", sans-serif;
      line-height: 1.25;
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

    input{
      width: 20px;
      height: 20px;
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
    
    .error{
      display: none; /** display: block if error exist.*/
    }

    /** qids from q1 -*/

    /*#q1{ 
      background-color: #ff3c3c;  
    }*/
    

    @media screen and (max-width: 768px) {
      button{
        width: 100%;
      }

      body{
        margin: 10px;
      }

      input{
        width: 20px;
        height: 20px;
      }

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

      .error{
        font-size: 0.9em;
      }
    }

    @media print{
    	.hidden{
    		display: none;
    	}
    	.heaers{
    		font-size: 13px;
    	}
    	.headers2{
    		font-size: 12px;
    	}
    	.headers3{
    		display: none;
    	}
    	.pic{
    		width: 50px;
    		height: 50px;
    	}
    	table{
    		font-size: 12px;
    		font-weight: lighter;
    	}
    	table tr{
    		height: 12px;
    	}
    	input{
    		width: 12px;
    		height: 12px;

    	}
    	thead tr th:first-child,
		tbody tr td:first-child {
		  width: 20em;
		  min-width: 8em;
		  max-width: 8em;
		  word-break: break-all;
		}
		button{
			display: none;
		}

    }

    @page{
      margin: 0;
    	margin-top: 20px;
    	size: 8.5in 13in;
      transform: scale(96);
      margin-bottom: 50px;
      @bottom{
          margin: 20px;
      };   
    }

  </style>
