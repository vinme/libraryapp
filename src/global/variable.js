import Vue from 'vue'

let apiBaseUrl = ''
if (process.env.NODE_ENV === 'production') {
  apiBaseUrl = 'https://api.gothailand.online/api/'
} else {
  // apiBaseUrl = 'https://thailandpass.dev/api/'
  apiBaseUrl = 'https://api.gothailand.online/api/'
}
Vue.prototype.$apiBaseUrl = apiBaseUrl