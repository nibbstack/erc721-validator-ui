<template>
  <div class="results mt-3">
    <table class="table">
      <thead>
        <tr>
          <th>ERC721</th>
          <th>ERC721 Metadata</th>
          <th>ERC721 Enumerable</th>
        </tr>
      </thead>

      <tbody>

        <tr>
          <td><Icon :passed="{data: null}"/>Does contract support ERC165</td>
          <td><Icon :passed="{data: true}"/>Does contract support ERC721Metadata</td>
          <td><Icon :passed="{data: false}"/>Does contract support ERC721Enumerable</td>
        </tr>
        <tr>
          <td><Icon passed/>Does contract support ERC721</td>
          <td><Icon passed/>Contract name</td>
          <td><Icon passed/>Total supply of the contract</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Icon from '~/components/StatusIcon'

  // tests: [
  //   { 
  //     id: 1,
  //     name: "Is address a contract",
  //     description: "Sanity checks should be greater than 0.",
  //     category: "ERC721",
  //     result: null,
  //     expected: true
  //   }
  // ]

  export default {
    props: {
      data: Array
    },
    components: {
      Icon
    }
  }
</script>

<style scoped lang="scss">

</style>