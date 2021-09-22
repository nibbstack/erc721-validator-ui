<template>
  <div class="container">
    <h2>Transfer Validation</h2>
    <p class="intro">Approve the Giver contract: <a :href="this.explorerLinks[this.chainId] + this.giverContracts[this.chainId]" target="_blank" rel="noopener">{{ this.giverContracts[this.chainId] }}</a> for a token ID and input it bellow. The approved token <strong>WILL NOT</strong> get transfered during the test.</p>
    <p class="smaller">There can be a business decision that transfers for a token are not enabled and by such all test will fail.</p>
    <form @submit.prevent="sanityCheck" novalidate>
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
      <div id="transferResults" key="results" v-if="state == 'results'" class="results mt-3">
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

      <div key="invalid" v-if="state == 'invalid'" class="mt-3">
        <Test :test="sanity"/>
      </div>
    </transition>

  </div>
</template>

<script>
import Test from '~/components/Test'
import vueScroll from 'vue-scrollto'

  export default {
     props: {
      chainId: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        approval: '',
        state: "inital",
        status: "",
        giverContracts: {
          1: '0xa0139F5Ab522c86D7F377336c50EEFCD6cAf696E',
          3: '0x0867cd9331287d18cb7cd40eb00628ea842d1bca',
          4: '0x40Bf8f5F5Deb968744CA5fD29321Cb9D456C2877'
        },
        explorerLinks: {
          1: 'https://etherscan.io/address/',
          3: 'https://ropsten.etherscan.io/address/',
          4: 'https://rinkeby.etherscan.io/address/'
        },
        sanity: { 
          id: 14,
          name: "Transfer unsuccesfull",
          description: "NFT with above id is either not approved, contract has disabled transfers or transfers don’t work at all.",
          category: "ERC721",
          result: false,
          expected: true
        },
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
      sanityCheck: async function() {
        try {
          if (await this.$validator.validate()) {
            this.status = "loading"
            let isTransfer = await this.$axios.get(`/transfer?test=14&contract=${this.$store.state.contract}&token=${this.approval}&giver=${this.giverContracts[this.chainId]}&chainId=${this.chainId}`)
            isTransfer.data.data ? this.validate() : this.state = "invalid"
            this.status = ""
          }
        } catch (err) {
          console.log("Error:" + err)
          this.state = "error"
          this.status = ""
        }
      },
      validate: async function() {
        try {
          this.status = "loading"
          this.test.forEach(t => t.result = null)
          this.state = "results"
          const promises = []
          this.test.forEach(t => promises.push(this.$axios.get(`/transfer?test=${t.id}&contract=${this.$store.state.contract}&token=${this.approval}&giver=${this.giverContracts[this.chainId]}&chainId=${this.chainId}`)))
          const results = await Promise.all(promises)
          vueScroll.scrollTo('#transferResults')
          results.forEach((r, i) => { 
            this.test[i].result = r.data.data.result;
            this.test[i].gas = r.data.data.gas;
          })
          this.status = ""
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
.intro {
  max-width: 700px;
}

.smaller {
  font-size: 13px;
}
</style>