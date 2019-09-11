import Vue from 'vue'
import VueQrReader from '~/components/VueQrReader'

if (process.browser) {
    Vue.component('vue-qr-reader', VueQrReader);
}