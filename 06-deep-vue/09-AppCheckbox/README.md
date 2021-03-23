# AppCheckbox

По большей части решение аналогично `AppInput` - `TransparentWrapper` обёртки над input. Но есть несколько особенностей:
1. `checkbox` работает сложнее, чем простой `input[type=text]`, имея особую обработку для `v-model`.  
Простейший способ повторить то же поведение — это не разбивать `v-model` на параметр+событие, а также использовать `v-model`.  
Чтобы реализовать это, можно передать простое вычисляемое свойство с геттером, возвращающим текущее значение, и сеттером, который порождает событие с тем же значением.
2. `value` нельзя передать списком атрибутов через `v-bind="$attrs"`, так как он должен быть передан как свойство элемента, а не просто атрибут. Для этого его требуется передать отдельно.
3. Похожая проблема есть с `v-on="$listeners"`, в котором `change` будет конфликтовать с порождённым `change` в сеттере. Его требуется удалить из обработчиков событий.

```html
<template>
  <label class="checkbox">
    <input
      type="checkbox"
      v-model="model"
      v-bind="$attrs"
      :value="value"
      v-on="listeners"
    />
    <slot />
    <span></span>
  </label>
</template>

<script>
  export default {
    name: 'AppCheckbox',
    inheritAttrs: false,

    props: {
      checked: [Array, Boolean],
      value: {},
    },

    model: {
      prop: 'checked',
      event: 'change',
    },

    computed: {
      model: {
        get() {
          return this.checked;
        },
        set(value) {
          this.$emit('change', value);
        },
      },

      listeners() {
        const listeners = { ...this.$listeners };
        delete listeners.change;
        return listeners;
      },
    },
  };
</script>

<style scoped></style>
```
