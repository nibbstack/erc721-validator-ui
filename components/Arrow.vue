<template>
<div class="separator">
    <div class="container">
      <svg class="arrow" :class="{transparent: transparent}" width="150" height="24" viewBox="0 0 150 24" version="1" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2">
        <path class="bg" d="M149 0H1l71 23 77-23z"/>
        <path d="M5 2l67 21 73-21" fill="none" stroke="#7D8285" stroke-width="0.3"/>
      </svg>
    </div>
</div>
</template>

<script>
  export default {
    props: {
      transparent: {
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">
  .separator {
    border-top: 1px solid $gray-light;
  }

  .arrow {
    margin-top: -2px;

    .bg {
      fill: $light-blue-bg;
    }

    &.transparent {
      .bg {
        fill: $white;
      }
    }
  }
</style>