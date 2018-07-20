<template>
  <div class="page">
    <div class="header">
      <div class="container">
        <img class="logo" src="logo.svg" alt="">
        <h1>ERC721 Validator</h1>
        <p class="intro">
          This is a validator that checks if a smart contract fully follows the <a href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md" target="_blank" rel="noopener">ERC721 standard</a>. <br/>
          Validator is divided in 3 steps depending on the information and actions needed: 
          <ul>
            <li>For <strong>Step 1</strong> you only need the contract address.</li>
            <li>For <strong>Step 2</strong> you also need a valid id of any NFT.</li>
            <li>For <strong>Step 3</strong> you will need to approve a giver contract for a NFT (the token will never be transfered!).</li>
          </ul>
        </p>
      </div>
    </div>

    <Arrow/>
    <BasicValidator/>
    <Arrow :transparent="true" class="mt-3" />
    <TokenValidator/>
    <Arrow :transparent="true" class="mt-3" />
    <TransferValidator/>
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
  padding: 5rem 0 3rem;

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