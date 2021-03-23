<template>
  <AppInput v-bind="attrs" v-on="listeners" :value="this.innerValue">
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: {
    AppInput,
  },

  props: {
    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {},
    type: {
      type: String,
      default: 'date',
      validator(val) {
        return ['date', 'time', 'datetime-local'].includes(val);
      },
    },
    valueAsNumber: Number,
    valueAsDate: Date,
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: ($event) => {
          if ($event.length < 9) $event = `1970-01-01T${$event}`;

          this.$emit('input', $event);
          this.$emit('update:valueAsNumber', +new Date($event + 'Z'));
          this.$emit('update:valueAsDate', new Date($event + 'Z'));
        },
      };
    },
    attrs() {
      return {
        ...this.$attrs,
        type: this.type,
      };
    },
    innerValue() {
      const value =
        (this.valueAsNumber && new Date(this.valueAsNumber).toISOString()) ||
        (this.valueAsDate && this.valueAsDate.toISOString());

      if (!value) return this.value;

      switch (this.type) {
        case 'date':
          return value.slice(0, 10);
        case 'time':
          return this.$attrs.step % 60
            ? value.slice(11, 19)
            : value.slice(11, 16);
        case 'datetime-local':
          return value.slice(0, 19);
      }

      return '';
    },
  },
};
</script>

<style scoped></style>
