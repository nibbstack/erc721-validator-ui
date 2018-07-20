<template>
  <div class="test">
    <div class="test__icon"><Icon :passed="test.result"/></div>
    <div class="test__body">
      <div class="name">{{ test.name }}</div>
      <div :class="{show : !test.result && test.result != null}" class="description">{{ test.description }}</div>
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
      display: none;
      max-width: 550px;
      padding-top: .5rem;
      font-size: 13px;
      font-family: $primary-font;

      &.show {
        display: block
      }
    }
  }
}
</style>