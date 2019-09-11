<template>
    <!-- <no-ssr> -->
      <vue-qr-reader v-on:code-scanned="codeArrived" />
    <!-- </no-ssr> -->
</template>

<script>
    // import NoSSR from 'vue-no-ssr'
    import VueQrReader from 'vue-qr-reader/dist/lib/vue-qr-reader.umd.js';

    export default {
        components: {
            // 'no-ssr': NoSSR,
            VueQrReader
        },
        methods: {
            codeArrived (code) {
                console.log(code);
            }
        }
    }
</script>