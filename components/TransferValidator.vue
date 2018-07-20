<template>
  <div class="container">
    <h2>Transfer Validation</h2>
    <p class="intro">To run this test you need to approve Giver contract: <a href="https://etherscan.io/address/0xa0139F5Ab522c86D7F377336c50EEFCD6cAf696E" target="_blank" rel="noopener">0xa0139F5Ab522c86D7F377336c50EEFCD6cAf696E</a> for a token ID and input it bellow. The approved token <strong>WILL NOT</strong> get transfered during the test.</p>
    <p>There can be a business decision that transfers for a token are not enabled and by such all test would fail.</p>
    <form @submit.prevent="validate" novalidate>
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <div class="input-group-text">Token ID</div>
        </div>
        <input 
          v-model="approval" 
          v-validate="'required'"
          name="approval"
          type="text" 
          :class="{'is-invalid': errors.has('approval') }"
          data-vv-as="Giver contract"
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
      <div class="invalid-feedback" v-show="errors.has('approval')">{{ errors.first('approval') }}</div>
    </form> 

    <transition name="fade" mode="out-in">
      <div key="results" v-if="state == 'results'" class="results mt-3">
        <table class="table">
          <thead>
            <tr>
              <th class="row">ERC721</th>
              <th class="row">Enumerable extension (optional)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Test :test="test[0]"/></td>
              <td><Test :test="test[11]"/></td>
            </tr>
            <tr>
              <td><Test :test="test[1]"/></td>
              <td><Test :test="test[12]"/></td>
            </tr>
            <tr v-for="index in 9" :key="index">
              <td><Test :test="test[index + 1]"/></td>
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
import Results from '~/components/Results'
import Test from '~/components/Test'
import TransitionExpand from '~/components/TransitionExpand';

  export default {
    data () {
      return {
        approval: '',
        state: "inital",
        status: "",
        test: [
          { 
            id: 1,
            name: "Transfer without authorization",
            description: "transferFrom giver to self, this should throw because giver does not authorize the transaction.",
            category: "ERC721",
            result: null,
            expected: false
          },
          { 
            id: 2,
            name: "Transfer",
            description: "Get a token from giver, transferFrom self to a stub, check balanceOf() stub before and after transfer, it should be one more.",
            category: "ERC721",
            result: null,
            expected: true
          },
          { 
            id: 3,
            name: "Transfer to zero address",
            description: "Get a token from giver, transferFrom to zero address, should throw.",
            category: "ERC721",
            result: null,
            expected: false
          },
          { 
            id: 4,
            name: "Safetransfer with data",
            description: "Get a token from giver, safe transfer to stub by sending data ffff. Stub throws in callback if it does not receive ffff.",
            category: "ERC721",
            result: null,
            expected: true
          },
          { 
            id: 5,
            name: "Safetransfer without data",
            description: "Get a token from giver, safe transfer to stub using the default argument. Stub throws in callback if it does not receive \"\"",
            category: "ERC721",
            result: null,
            expected: true
          },
          { 
            id: 6,
            name: "Safetransfer to contract that cannot receive ERC721 token",
            description: "Get a token from giver, safe transfer to contract stud that does not implement token receiver, should throw. ",
            category: "ERC721",
            result: null,
            expected: false
          },
          { 
            id: 7,
            name: "Safetransfer with incorrect return",
            description: "Get a token from giver, safe transfer to stub, the stub does not return the correct magic value, the transfer must throw",
            category: "ERC721",
            result: null,
            expected: false
          },
          { 
            id: 8,
            name: "Approval",
            description: "Get a token from giver, approve stub, then check getApproved stub;",
            category: "ERC721",
            result: null,
            expected: true
          },
          { 
            id: 9,
            name: "Approve and transfer",
            description: "Get a token from giver, approve stub, then have stub transferFrom to stub2.",
            category: "ERC721",
            result: null,
            expected: true
          },
          { 
            id: 10,
            name: "Approval for all",
            description: "Get a token from giver, approveForAll to stub, then check isApprovedForAll.",
            category: "ERC721",
            result: null,
            expected: true
          },
          { 
            id: 11,
            name: "Approval for all and transfer",
            description: "Get a token from giver, approveFor All to stub, then have stub transferFrom to stub2.",
            category: "ERC721",
            result: null,
            expected: true
          },
          { 
            id: 12,
            name: "Getting token of owner by index",
            description: "Get token from giver, find balanceOf(self), tokenOfOwnerByIndex(0) should not throw.",
            category: "ERC721Enumerable",
            result: null,
            expected: true
          },
          { 
            id: 13,
            name: "Getting token of owner by unexistant index",
            description: "Get token from giver, find balanceOf(self), tokenOfOwnerByIndex(balanceOf(self)) should throw.",
            category: "ERC721Enumerable",
            result: null,
            expected: false
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
          this.test.forEach(t => promises.push(
            this.$axios.get(`/transfer?test=${t.id}&contract=${this.$store.state.contract}&token=${this.approval}&giver=${this.$store.state.giver}`)
          ))
          const results = await Promise.all(promises)
          results.forEach((r, i) => this.test[i].result = r.data.data)
          this.status = ""
        }
        catch (err) {
          console.log(err)
        }
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

.intro {
  max-width: 750px;
}

.input-group-append .btn {
  width: 135px;
}

</style>