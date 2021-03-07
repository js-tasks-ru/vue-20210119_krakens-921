<template>
  <div
    class="input-group"
    :class="{
      'input-group_icon': hasLeftSlot || hasRightSlot,
      'input-group_icon-left': hasLeftSlot,
      'input-group_icon-right': hasRightSlot,
    }"
  >
    <slot name="left-icon"></slot>

    <component
      class="form-control"
      :is="inputType"
      :class="{
        'form-control_sm': small,
        'form-control_rounded': rounded,
      }"
      v-bind="$attrs"
      v-bind:value.prop="value"
      v-on="customListeners"
    />

    <slot name="right-icon"></slot>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  inheritAttrs: false,
  data() {
    return {
      hasLeftSlot: null,
      hasRightSlot: null,
    };
  },
  mounted() {
    this.hasLeftSlot = !!this.$slots['left-icon'];
    this.hasRightSlot = !!this.$slots['right-icon'];
  },
  updated() {
    this.hasLeftSlot = !!this.$slots['left-icon'];
    this.hasRightSlot = !!this.$slots['right-icon'];
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    multiline: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
    },
  },
  computed: {
    inputType() {
      return this.multiline ? 'textarea' : 'input';
    },
    customListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: (event) => {
          vm.$emit('input', event.target.value);
        },
        change: (event) => {
          vm.$emit('change', event.target.value);
        },
      });
    },
  },
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon:last-child {
  right: 16px;
}
</style>
