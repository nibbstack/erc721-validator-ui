<template>
  <div class="container">
    <h2>Basic Validation</h2>
    <p>Tests can be done with valid <strong>contract address</strong></p>

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
          placeholder="Contract address">
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

    <transition-expand>
      <div v-if="state == 'results'" class="results mt-3">
        <table class="table">
          <thead>
            <tr>
              <th class="row">ERC721</th>
              <th class="row">ERC721 Metadata</th>
              <th class="row">ERC721 Enumerable</th>
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
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="state == 'invalid'" class="mt-3">
        <Test :test="sanity"/>
      </div>
      <div v-if="state == 'error'" class="mt-3">
        Something went wrong.
      </div>
    </transition-expand>

  </div>
</template>

<script>
import Results from '~/components/Results'
import Test from '~/components/Test'
import TransitionExpand from '~/components/TransitionExpand';

  export default {
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
            this.status = "loading"
            let isContract = await this.$axios.get(`/basic?test=1&contract=${this.contract}`)
            isContract.data.data ? this.validate() : this.state = "invalid"
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
        this.state = "results"
        const promises = []
        this.test.forEach(t => promises.push(
          this.$axios.get(`/basic?test=${t.id}&contract=${this.contract}`)
        ))
        const results = await Promise.all(promises)
        results.forEach((r, i) => this.test[i].result = r.data.data)
        this.status = ""
      }
    },
    components: {
      Results,
      Test,
      TransitionExpand
    }
  }
</script>

<style scoped lang="scss">
.invalid-feedback {
  margin-left: 43px;
}

.input-group-append .btn {
  width: 135px;
}

.row {
  width: 33%;
}
</style>