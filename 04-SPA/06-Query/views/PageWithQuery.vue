<template>
  <div class="container">
    <meetups-view
      :view.sync="view"
      :date.sync="date"
      :participation.sync="participation"
      :search.sync="search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

// router.push
// Этот метод добавляет новую запись в историю навигации,
// что позволяет клику пользователя по кнопке "назад" в браузере сработать привычным образом.

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },
  computed:{
    view: {
      get() {
        return this.$route.query.view || 'list';
      },
      set(view) {
        this.updateQuery('view', view, 'list');
      },
    },
    date: {
      get() {
        return this.$route.query.date || 'all';
      },
      set(date) {
        this.updateQuery('date', date, 'all');
      },
    },
    participation: {
      get() {
        return this.$route.query.participation || 'all';
      },
      set(participation) {
        this.updateQuery('participation', participation, 'all');
      },
    },
    search: {
      get() {
        return this.$route.query.search || '';
      },
      set(search) {
        this.updateQuery('search', search, '');
      },
    },
  },
  methods: {
    updateQuery(field, value, defaultValue) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          [field]: value === defaultValue ? undefined : value,
        },
      });
    },
  },
};
</script>

<style scoped></style>
