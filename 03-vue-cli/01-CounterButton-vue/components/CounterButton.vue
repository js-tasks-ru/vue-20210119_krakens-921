<template>
  <div>
    <button @click="increment" type="button">
      {{ innerCount }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    innerCount() {
      return this.count || this.value;
    },
  },

  methods: {
    increment() {
      this.$emit('increment', this.innerCount + 1);
      this.$emit('input', this.innerCount + 1);
    },
  },
};
</script>

<style></style>
