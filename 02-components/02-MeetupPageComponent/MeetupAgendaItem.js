import { agendaItemTitles, agendaItemIcons } from "./data.js";

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="iconUrl" />
      </div>
      
      <div class="meetup-agenda__item-col">
        {{ period }}
      </div>
      
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">
          {{ title }}
        </h5>
        
        <p v-if="agendaItem.type === 'talk'">
          <template v-if="agendaItem.speaker">
            <span>{{ agendaItem.speaker }}</span>
            <span class="meetup-agenda__dot"></span>
          </template>
          
          <span
            v-if="agendaItem.language"
            class="meetup-agenda__lang"
          > {{ agendaItem.language }} </span>
        </p>

        <p v-if="agendaItem.description">
          {{ agendaItem.description }}
        </p>
      </div>
    </div>`,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    period() {
      return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`;
    },
    title() {
      return this.agendaItem.title || agendaItemTitles[this.agendaItem.type];
    },
    iconUrl() {
      return `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`;
    },
  },
};
