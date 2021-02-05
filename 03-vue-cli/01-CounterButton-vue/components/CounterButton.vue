<template>
  <div>
    <button @click="increment" type="button">
      {{ count }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CounterButton',

  model: {
    prop: 'count',
    event: 'increment',
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    increment() {
      this.$emit('increment', this.count + 1);
    },
  },
};
</script>

<style></style>
