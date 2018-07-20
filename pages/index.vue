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
            <li>For <strong>Step 3</strong> you will need to approve a giver contract for a NFT <br/><i>(the token won't be transfered)</i></li>
          </ul>
        </p>

        <p>Example smart contracts you can test:</p>
        <ul>
          <li><strong>CryptoKitties:</strong> 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d </li>
          <li><strong>0xcert KYC token:</strong> 0xb57756d92bd170a66b4f361eafbfd13e625372c2 </li>
          <li><strong>Decentraland:</strong> 0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d </li>
        </ul>
      </div>
    </div>

    <Arrow/>
    <BasicValidator/>
    <!-- <Arrow :transparent="true" class="mt-3" />
    <TokenValidator/>
    <Arrow :transparent="true" class="mt-3" />
    <TransferValidator/> -->
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
    background-size: 200px;
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
    max-width: 800px;
  }
}

</style>