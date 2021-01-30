import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div><meetup-view :meetup="meetup" /></div>`,

  components: {
    MeetupView,
  },

  data() {
    return {
      meetup: {},
    };
  },

  async mounted() {
    this.meetup = await this.getMeetupData();
  },

  methods: {
    async getMeetupData() {
      return await fetchMeetup(MEETUP_ID);
    },
  },
};
