<script>
export default {
  name: 'NodesPagination',
  props: {
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: null,
    },
  },
  render(createElement) {
    if (this.perPage === null) return createElement('div', this.$slots.default);

    const lastNodeIndex = this.page * this.perPage;
    const firstNodeIndex = lastNodeIndex - this.perPage;
    const nodeList = this.$slots.default.slice(firstNodeIndex, lastNodeIndex);

    return createElement('div', nodeList);
  },
};
</script>

<style scoped></style>
