<template>
<footer>
  <div class="container">
    <div class="row">
      <div class="copyright">Powered by <a href="https://0xcert.org">0xcert</a> &copy; 2018</div>
      <div><a href="https://0xcert.org/?goto=subscribe" target="_blank" rel="noopener">Subscribe for updates</a></div>
      <div>Accepting donations: <a href="https://etherscan.io/address/0xf9196f9f176fd2ef9243e8960817d5fbe63d79aa">0xF9196F9f176fd2eF9243E8960817d5FbE63D79aa</a></div>
      <div><a href="https://github.com/0xcert/erc721-validator" target="_blank" rel="noopener">ERC721 validator on GitHub</a></div>
    </div>
  </div>
</footer>
</template>

<style scoped lang="scss">

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