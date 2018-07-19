<template>
  <div class="container">
    <h2>Basic Validation</h2>
    <p>Tests can be done with valid <strong>contract address</strong></p>

    <div class="input-group input-group-lg">
      <div class="input-group-prepend">
        <div class="input-group-text">Ξ</div>
      </div>
      <input type="text" class="form-control" placeholder="Contract address">
      <div class="input-group-append">
        <button class="btn btn-primary" type="button">Validate</button>
      </div>
    </div>

    <Results />

  </div>
</template>

<script>
import Results from '~/components/Results.vue'
  export default {
    components: {
      Results
    }
  }
</script>

<style scoped>

</style>