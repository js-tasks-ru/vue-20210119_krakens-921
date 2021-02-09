export const MeetupCover = {
  template:
    `<div class="meetup-cover" :style="bgUrl">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,

  props: {
    link: String,
    title: {
      type: String,
      default: '',
    },
  },

  computed: {
    bgUrl() {
      return this.link ? `--bg-url: url('${this.link}')` : '';
    },
  },
};
