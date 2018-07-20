<template>
  <div class="page">
    <div class="header">
      <div class="container">
        <h1>ERC721 Validator</h1>
        <p class="intro">
          This is a validator that checks if a smart contract fully follows the <a href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md" target="_blank" rel="noopener">ERC721 standard</a>. <br/>
          Validator is divided in 3 steps depending on the information and actions needed: 
          <ul>
            <li>For <strong>Step 1</strong> you only need the contract address.</li>
            <li>For <strong>Step 2</strong> you also need a valid id of any NFT.</li>
            <li><strong>Step 2:</strong> To run this test you need to approve Giver contract: <a href="https://etherscan.io/address/0xa0139F5Ab522c86D7F377336c50EEFCD6cAf696E" target="_blank" rel="noopener">0xa0139F5Ab522c86D7F377336c50EEFCD6cAf696E</a> for a token ID and input the token id bellow. The approved token <strong>WILL NOT</strong> get transfered during the test.</li>
          </ul>
        </p>

        <p>Example smart contracts you can test:</p>
        <ul>
          <li><strong>CryptoKitties:</strong> 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d </li>
          <li><strong>0xcert erc721 implementation: </strong> <a href="https://etherscan.io/address/0xf176d7bcdD07f8e474877095870685Ef0CCcCb2D" target="_blank" rel="noopener">0xf176d7bcdD07f8e474877095870685Ef0CCcCb2D</a>, <strong>Token ID</strong>: 1, <strong>Approval ID:</strong> 1</li>
          <li><strong>Decentraland:</strong> 0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d </li>
        </ul>
      </div>
    </div>

    <Arrow/>
    <BasicValidator/>

    <transition-group name="fade">
      <div v-if="$store.state.contract" class="tokenValidator" key="tokenValidator">
        <Arrow :transparent="true" class="mt-3" />
        <TokenValidator/>
      </div>

      <div v-if="$store.state.token" class="transferValidator" key="TransferValidator">
        <Arrow :transparent="true" class="mt-3" />
        <TransferValidator/>
      </div>
    </transition-group>

    <Footer/>
  </div>
</template>

<script>
import Arrow from '~/components/Arrow.vue'
import BasicValidator from '~/components/BasicValidator.vue'
import TokenValidator from '~/components/TokenValidator.vue'
import TransferValidator from '~/components/TransferValidator.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Arrow,
    BasicValidator,
    TokenValidator,
    TransferValidator,
    Footer
  }
}
</script>

<style scoped lang="scss">
.header {
  background: $light-blue-bg;
  padding: 4rem 0 3rem;

  h1 {
    font-size: 36px;
  }

  > .container {
    background: url('/validator-logo.svg') no-repeat right 3.4rem;
    background-size: 180px;
  }

  .logo {
    display: inline-block;
    margin-right: 1rem;
    vertical-align: sub;
  }

  h1 {
    display: inline-block;
  }

  .intro {
    max-width: 650px;
  }
}

</style>