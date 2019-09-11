import Vue from 'vue';
import Calendar from '~/components/Calendar'

if (process.browser) {
    Vue.component('full-calendar', Calendar);
}