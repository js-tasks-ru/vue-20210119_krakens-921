import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(imageId) {
  return `${API_URL}/images/${imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',
  data() {
    return {
      meetup: {
        id: null,
        title: '',
        description: '',
        imageId: 1,
        date: null,
        organizer: '',
        place: '',
        agenda: [],
      },
    };
  },

  mounted() {
    this.getMeetup(1);
  },

  agendaDefaultTitle: agendaItemTitles,
  agendaIcon: agendaItemIcons,

  computed: {
    meetupImageUrl() {
      return getMeetupCoverLink(this.meetup.imageId);
    },
    localMeetupDate() {
      const options = { day: 'numeric', month: 'short', year: 'numeric'  };
      return new Date(this.meetup.date).toLocaleString('RU-ru', options);
    },
    meetupICODate() {
      return new Date(this.meetup.date).toISOString().slice(0,10);
    },
    meetupCoverBG() {
      return this.meetup.imageId !== null ? `--bg-url: url(${this.meetupImageUrl})` : '';
    },
  },

  methods: {
    async getMeetup(meetupId) {
      this.meetup = await (await fetch(`${API_URL}/meetups/${meetupId}`)).json();
    },
  },
});
