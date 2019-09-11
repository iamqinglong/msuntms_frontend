const ip = require('ip');
export default {
  mode: 'universal',
  server: {
    port: 3000, // default: 3000
    host:ip.address(), // default: localhost
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/msunlogo.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  router: {
    middleware: [
      'clearValidationErrors',
    ],
  },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/mixins/validation',
    './plugins/mixins/user',
    '@/plugins/axios',
    {src: '~/plugins/full-calendar', ssr: false},
    { src: './plugins/vue-qr.js', ssr: false },
    { src: './plugins/print-html.js', ssr: false },
    { src: './plugins/vue-qr-reader.js', ssr: false },
    { src: './plugins/vue-qr-code-reader.js', ssr: false },
    { src: './plugins/vue-qr-code-component.js', ssr: false },
    // { src: './plugins/vue-pdf.js', ssr: false },
    { src: '~/plugins/vue-materialize-datatable', ssr: false }
  ],
  
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-material-design-icons',
    'bootstrap-vue/nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL : 'http://127.0.0.1:8000/api',
    baseURL : `http://${ip.address()}:8000/api`,
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/auth/login', method: 'post', propertyName:'token'},
          logout: {url: '/auth/user_logout', method: 'get', },
          user: {url: '/user_me', method: 'get', propertyName: 'data'},
        },
      },
    },
    redirect: {
        login: '/auth/login',
        // logout: '/auth/login',
        home: '/',
        // callback: '/'
    },
    plugins : [
      './plugins/auth'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // cssSourceMap: false,
    // extend(config, ctx) {
    // },
    // vendor: ['vue-pdf'],
   extend(config, ctx) {
      config.output.globalObject = 'this'
   }
  }
}
