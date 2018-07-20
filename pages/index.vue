<template>
  <div class="page">
    <div class="header">
      <div class="container">
        <h1>ERC721 Validator</h1>
        <p class="intro">
          This is a validator that checks if a smart contract fully follows the <a href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md" target="_blank" rel="noopener">ERC721 standard</a>. <br/>
          Validator is divided in 3 steps depending on the information and actions needed: 
          <ul>
            <li>For <strong>Basic validation</strong> you only need the contract address.</li>
            <li>For <strong>Token validation</strong> you also need a valid ID of any NFT.</li>
            <li>For <strong>Transfer validation</strong> you need to approve a token NFT</li>
          </ul>
        </p>

        <p>Example smart contracts you can test:</p>
        <ul>
          <li><strong>CryptoKitties: </strong><a href="https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d" target="_blank" rel="noopener">0x06012c8cf97BEaD5deAe237070F9587f8E7A266d</a> </li>
          <li><strong>0xcert erc721 implementation: </strong> <a href="https://etherscan.io/address/0xf176d7bcdD07f8e474877095870685Ef0CCcCb2D" target="_blank" rel="noopener">0xf176d7bcdD07f8e474877095870685Ef0CCcCb2D</a>, <strong>Token ID</strong>: 1, <strong>Approved token ID:</strong> 1</li>
          <li><strong>Decentraland: </strong><a href="https://etherscan.io/address/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d" target="_blank" rel="noopener">0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d</a> </li>
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

  a {
    color: $base;
    
    &:hover {
      color: $primary;
    }
  }

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