<template>
<footer>
  <div class="container">
    <div class="row">
      <div class="copyright">Powered by <a href="https://0xcert.org">0xcert</a> &copy; 2018</div>
      <div><a href="https://github.com/0xcert/erc721-validator" target="_blank" rel="noopener">ERC721 validator on GitHub</a></div>
    </div>
  </div>
</footer>
</template>

<script>
  export default {
    
  }
</script>

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