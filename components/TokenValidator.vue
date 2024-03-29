<template>
  <div class="container">
    <h2>Token Validation</h2>
    <p>Input any existing <strong>token ID</strong></p>

    <form @submit.prevent="validate" novalidate>
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <div class="input-group-text">Token ID</div>
        </div>
        <input 
          v-model="tokenId" 
          v-validate="'required'"
          name="tokenId"
          type="text" 
          :class="{'is-invalid': errors.has('tokenId') }"
          data-vv-as="Token ID"
          class="form-control"/>
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">
            <transition name="fade" mode="out-in">
              <img v-if="status == 'loading'" src="/loader.svg"/>
              <span v-else>Validate</span>
            </transition>
          </button>
        </div>
      </div>
      <div class="invalid-feedback" v-show="errors.has('tokenId')">{{ errors.first('tokenId') }}</div>
    </form> 

    <transition name="fade" mode="out-in">
      <div id="tokenResults" key="results" v-if="state == 'results'" class="results mt-3">
        <table class="table">
          <thead>
            <tr>
              <th class="row">ERC721</th>
              <th class="row">Metadata extension (optional)</th>
           </tr>
          </thead>
          <tbody>
            <tr>
              <td><Test :test="test[1]"/></td>
              <td><Test :test="test[0]"/></td>
              <td></td>
            </tr>
            <tr>
              <td><Test :test="test[2]"/></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div key="error" v-if="state == 'error'" class="mt-3">
        Something went wrong.
      </div>
    </transition>

  </div>
</template>

<script>
import vueScroll from 'vue-scrollto'
import Test from '~/components/Test'

  export default {
     props: {
      chainId: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        tokenId: '',
        state: "inital",
        status: "",
        test: [
          { 
            id: 1,
            name: "Token URI",
            description: "tokenURI(TEST_TOKEN_ID) should not throw.",
            category: "ERC721Metadata",
            result: null,
            expected: true
          },
          { 
            id: 2,
            name: "Balance of owner of test token",
            description: "balanceOf(ownerOf(TEST_TOKEN_ID) should be > 0.",
            category: "ERC721",
            result: null,
            expected: true
          },
          { 
            id: 3,
            name: "Owner of test token",
            description: "ownerOf(TEST_TOKEN_ID) should return an address > 0.",
            category: "ERC721",
            result: null,
            expected: true
          }
        ]
      }
    },
    methods: {
      validate: async function() {
        try {
          this.status = "loading"
          this.test.forEach(t => t.result = null)
          this.state = "results"
          const promises = []
          this.test.forEach(t => promises.push(this.$axios.get(`/token?test=${t.id}&contract=${this.$store.state.contract}&token=${this.tokenId}&chainId=${this.chainId}`)))
          const results = await Promise.all(promises)
          results.forEach((r, i) => { 
            this.test[i].result = r.data.data.result;
            this.test[i].gas = r.data.data.gas;
          })
          this.status = ""
          vueScroll.scrollTo('#tokenResults')
          this.$store.commit('setToken', this.tokenId)
        }
        catch (err) {
          console.log("Error:" + err)
          this.state = "error"
          this.status = ""
        }
      }
    },
    components: {
      Test
    }
  }
</script>

<style scoped lang="scss">
@import '~assets/scss/_config';
.row {
  width: 50%;
}
</style>