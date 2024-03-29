<template>
  <div class="container">
    <h2>Basic Validation</h2>
    <p>Input a valid <strong>contract address</strong></p>

    <form @submit.prevent="sanityCheck" novalidate>
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <div class="input-group-text">Ξ</div>
        </div>
        <input 
          v-model="contract" 
          v-validate="'required|wallet'"
          name="contract"
          type="text" 
          :class="{'is-invalid': errors.has('contract') }"
          data-vv-as="ETH address"
          class="form-control" 
          placeholder="Contract address" />
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">
            <transition name="fade" mode="out-in">
              <img v-if="status == 'loading'" src="/loader.svg"/>
              <span v-else>Validate</span>
            </transition>
          </button>
        </div>
      </div>
      <div class="invalid-feedback" v-show="errors.has('contract')">{{ errors.first('contract') }}</div>
    </form> 

    <transition name="fade" mode="out-in">
      <div id="basicResults" key="results" v-if="state == 'results'" class="results mt-2">
        <Test :test="test[0]"/>
        <table class="table mt-2">
          <thead>
            <tr>
              <th class="row">ERC721</th>
              <th class="row">Metadata extension (optional)</th>
              <th class="row">Enumerable extension (optional)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Test :test="test[1]"/></td>
              <td><Test :test="test[2]"/></td>
              <td><Test :test="test[3]"/></td>
            </tr>
            <tr>
              <td><Test :test="test[4]"/></td>
              <td><Test :test="test[5]"/></td>
              <td><Test :test="test[6]"/></td>
            </tr>
            <tr>
              <td><Test :test="test[7]"/></td>
              <td><Test :test="test[8]"/></td>
              <td><Test :test="test[9]"/></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div key="invalid" v-if="state == 'invalid'" class="mt-3">
        <Test :test="sanity"/>
      </div>
      <div key="error" v-if="state == 'error'" class="mt-3">
        Unable to connect with a server. Check your internet connection.
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
        contract: '',
        state: "inital",
        status: "",
        sanity: { 
          id: 1,
          name: "Is address a contract",
          description: "Sanity checks Find the amount of value (ether) assigned to CONTRACT_ADDRESS, it should be greater than or equal to zero. Find the code_size of CONTRACT_ADDRESS, it should be greater than 0.",
          category: "ERC721",
          result: false,
          expected: true
        },
        test: [
          { 
            id: 1,
            name: "Is address a contract",
            description: "Sanity checks Find the amount of value (ether) assigned to CONTRACT_ADDRESS, it should be greater than or equal to zero. Find the code_size of CONTRACT_ADDRESS, it should be greater than 0.",
            category: "ERC721",
            result: false,
            expected: true
          },
          { 
            id: 2,
            name: "Does contract support ERC165",
            description: "Check interface 165.",
            category: "ERC721",
            result: null,
            expected: true
          },
          { 
            id: 4,
            name: "Does contract support ERC721Metadata",
            description: "Check interface ERC721Metadata.",
            category: "ERC721Metadata",
            result: null,
            expected: true || false
          },
          { 
            id: 5,
            name: "Does contract support ERC721Enumerable",
            description: "Check interface ERC721Enumerable.",
            category: "ERC721Enumerable",
            result: null,
            expected: true || false
          },
          { 
            id: 3,
            name: "Does contract support ERC721.",
            description: "Check interface ERC721.",
            category: "ERC721",
            result: null,
            expected: true
          },
          { 
            id: 7,
            name: "Contract name",
            description: "name() should not throw.",
            category: "ERC721Metadata",
            result: null,
            expected: true
          },
          { 
            id: 9,
            name: "Total supply of the contract",
            description: "totalSupply should be greater than 0.",
            category: "ERC721Enumerable",
            result: null,
            expected: true
          },
          { 
            id: 6,
            name: "Balance of zero address",
            description: "balanceOf(0) should throw.",
            category: "ERC721",
            result: null,
            expected: false
          },
          { 
            id: 8,
            name: "Contract symbol",
            description: "name() should not throw.",
            category: "ERC721Metadata",
            result: null,
            expected: true
          },
          { 
            id: 10,
            name: "Get zero indexed token.",
            description: "tokenByIndex(0) should not throw.",
            category: "ERC721Enumerable",
            result: null,
            expected: true
          }
        ]
      }
    },
    methods: {
      sanityCheck: async function() {
        try {
          if (await this.$validator.validate()) {
            if (!this.$route.query.address) {
              this.$router.push({ query: { address: this.contract }})
            }
            this.$store.dispatch('reset')
            this.status = "loading"
            let isContract = await this.$axios.get(`/basic?test=1&contract=${this.contract}&chainId=${this.chainId}`)
            isContract.data.data.result ? this.validate() : this.state = "invalid"
            this.status = ""
          }
        } catch (err) {
          console.log("Error:" + err)
          this.state = "error"
          this.status = ""
        }
      },
      validate: async function() {
        this.test.forEach(t => t.result = null)
        vueScroll.scrollTo('#basicResults')
        this.$store.commit('setContract', this.contract)
        this.state = "results"
        const promises = []
        this.test.forEach(t => promises.push(this.$axios.get(`/basic?test=${t.id}&contract=${this.contract}&chainId=${this.chainId}`)))
        const results = await Promise.all(promises)
        results.forEach((r, i) => { 
          this.test[i].result = r.data.data.result;
          this.test[i].gas = r.data.data.gas;
        })
        this.status = ""
      }
    },
    mounted() {
      const { address } = this.$route.query
      if (address) {
        this.contract = address
        this.sanityCheck()
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
  width: 33%;
}
</style>