export const CounterButton = {
  template:
    '<button @click="increment" type="button">{{ count }}</button>',

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
