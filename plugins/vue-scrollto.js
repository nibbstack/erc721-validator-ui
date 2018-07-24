import Vue from 'vue'
import vueScroll from 'vue-scrollto'

Vue.use(vueScroll, {
  container: "body",
  duration: 800,
  easing: "ease-in-out",
  offset: 0,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})