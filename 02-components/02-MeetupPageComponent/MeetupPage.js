import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div><meetup-view v-if="meetup.id" :meetup="meetup" /></div>`,

  components: {
    MeetupView,
  },

  data() {
    return {
      meetup: {
        id: null,
        title: '',
        description: '',
        imageId: null,
        date: null,
        organizer: '',
        place: '',
        agenda: [],
      },
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
