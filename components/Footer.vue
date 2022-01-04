<template>
<footer>
  <div class="container">
    <div class="row">
      <div class="copyright">Powered by <a href="https://nibbstack.com">Nibbstack</a> &copy; 2021</div>
      <div><a href="https://nibbstack.com/?goto=subscribe" target="_blank" rel="noopener">Subscribe for updates</a></div>
      <!-- <div>Accepting donations: <a target="_blank" href="https://etherscan.io/address/0x...">0xF9196F9f176fd2eF9243E8960817d5FbE63D79aa</a></div> -->
      <div><a href="https://github.com/nibbstack/erc721-validator" target="_blank" rel="noopener">ERC721 validator on GitHub</a></div>
    </div>
  </div>
</footer>
</template>

<style scoped lang="scss">
@import '~assets/scss/_config';

footer {
  margin-top: 4rem;
  border-top: 1px solid $gray-light;
  padding: 2rem 0;
  font-size: .9rem;
  color: $gray;

  a {
     color: $gray;
  }
  
  .row {
    display: flex;
    justify-content: space-between;
  }
}
</style>