import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'

Vue.use(VeeValidate)

Validator.extend('wallet', {
  getMessage (field, params, data) {
    return (data && data.message) || 'This is not valid ETH Address'
  },
  validate (value) {
    return /^0x[a-fA-F0-9]{40}$/.test(value)
  }
})
