<script>
export default {
  name: 'FadeTransitionGroup',
  render(createElement) {
    const slotNodes = this.$slots.default.map((node) => {
      node.data.class = {
        'fade-list-item': true,
        ...node.data.class,
      };

      return node;
    });

    return createElement(
      'transition-group',
      {
        class: {
          'fade-list': true,
        },
        props: {
          name: 'fade-list',
        },
        attrs: this.$attrs,
        on: this.$listeners,
      },
      slotNodes,
    );
  },
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
