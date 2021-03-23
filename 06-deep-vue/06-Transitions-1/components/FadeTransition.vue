<template>
  <transition name="fade" v-bind="attrs" v-on="$listeners">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'FadeTransition',
  computed: {
    attrs() {
      return {
        mode: 'out-in',
        ...this.$attrs,
      };
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
