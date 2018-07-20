<template>
  <div class="test">
    <div class="test__icon"><Icon :passed="test.result"/></div>
    <div class="test__body">
      <div class="name">{{ test.name }}</div>
      <div v-if="!test.result" class="description">{{ test.description }}</div>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/StatusIcon'
  export default {
    props: {
      test: Object
    },
    components: {
      Icon
    }
  }
</script>

<style scoped lang="scss">
.test {
  display: flex;
  &__icon {}

  &__body {
    .description {
      max-width: 550px;
      padding-top: 1rem;
      font-size: 13px;
      font-family: $primary-font;
    }
  }
}
</style>