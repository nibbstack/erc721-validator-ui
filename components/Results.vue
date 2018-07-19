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
          <td><Icon passed/>Does contract support ERC165</td>
          <td><Icon failed/>Does contract support ERC721Metadata</td>
          <td><Icon passed/>Does contract support ERC721Enumerable</td>
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
  export default {
    components: {
      Icon
    }
  }
</script>

<style scoped lang="scss">
.table {
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  
  thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
  }

  td, th {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
}

thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
}

th {
    text-align: inherit;
}

tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}
</style>