<template>
  <svg class="icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414">
    <transition name="fade" mode="out-in">
      <path v-if="passed == false" d="M12.083.985c6.366 0 11.5 5.134 11.5 11.5s-5.134 11.5-11.5 11.5-11.5-5.134-11.5-11.5 5.134-11.5 11.5-11.5zm5.545 15.35l-3.851-3.851 3.902-3.851a.468.468 0 0 0 0-.616l-1.13-1.078c-.102-.103-.205-.155-.308-.155-.102 0-.154.052-.257.155l-3.902 3.799-3.901-3.799c-.103-.103-.155-.155-.257-.155-.103 0-.206.052-.308.155L6.537 8.017c-.154.155-.154.463 0 .616l3.902 3.851-3.902 3.902c-.103.052-.103.154-.103.257 0 .103 0 .206.103.308l1.079 1.13c.102.102.205.102.308.102.102 0 .205 0 .308-.102l3.85-3.902 3.902 3.851c.103.102.155.154.257.154.103 0 .206-.052.308-.154l1.079-1.079c.103-.052.154-.205.154-.308 0-.103-.051-.205-.154-.308z" fill="#f67069" fill-rule="nonzero"/>
      <path v-if="passed == true" d="M11.981.469c6.366 0 11.5 5.134 11.5 11.5s-5.134 11.5-11.5 11.5-11.5-5.134-11.5-11.5 5.134-11.5 11.5-11.5zm5.905 7.65c.051-.052.051-.103.051-.155 0-.052 0-.154-.051-.205l-1.592-1.232c-.052-.052-.155-.052-.206-.052-.051 0-.102 0-.154.052l-5.699 7.342-2.311-2.208c-.052-.052-.205-.155-.308-.155-.103 0-.154.103-.205.155l-1.335 1.334c-.052.052-.052.155-.052.206 0 .051 0 .102.052.154l.103.052 4.056 3.902c.052.051.154.154.257.154.103 0 .205-.103.257-.154l7.137-9.19z" fill="#41ff8b" fill-rule="nonzero"/>
      <path v-else  d="M13.672 23.353a11.5 11.5 0 0 0 9.877-11.384c0-6.352-5.149-11.5-11.5-11.5v2.875a8.625 8.625 0 0 1 1.217 17.163l.406 2.846z" fill="url(#spinner)">
        <animateTransform attributeType="xml" attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"/>
      </path>
    </transition>
    <defs>
      <linearGradient id="spinner" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(-135.605 11.52 -.725) scale(9.07301)">
        <stop offset="0" stop-color="#ced4da"/>
        <stop offset=".47" stop-color="#ced4da" stop-opacity=".227"/>
        <stop offset="1" stop-color="#ced4da" stop-opacity="0"/>
      </linearGradient>
    </defs>
  </svg>
</template>

<script>
  export default {
    props: {
      passed: Boolean
    }
  }
</script>

<style scoped>
.icon {
  display: inline-block;
  margin-right: 1rem;
  vertical-align: sub;
}
</style>