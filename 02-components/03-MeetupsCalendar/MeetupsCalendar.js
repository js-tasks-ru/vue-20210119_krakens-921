const DAY_MS = 24 * 60 * 60 * 1000;

function lastMonthDay(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getAllDays(lastDay) {
  return Array.from({ length: lastDay }, (v, k) => k + 1);
}

function getPreviousWeekDays(date) {
  const dateObj = new Date(date);
  const dayWeekNum = dateObj.getDay();
  const lastPreviousMonthDay = lastMonthDay(new Date(date - 1));

  if (dayWeekNum !== 1) {
    const weekdays = Array.from({ length: (dayWeekNum || 7) - 1 }, (v, k) => {
      return {
        dayNum: lastPreviousMonthDay - k,
        isActive: false,
      };
    }).reverse();

    return weekdays;
  }
  return [];
}

function getLastWeekDays(date) {
  const dateObj = new Date(date);
  const dayWeekNum = dateObj.getDay();

  if (dayWeekNum !== 0) {
    const weekdays = Array.from({ length: 7 - dayWeekNum}, (v, k) => {
      return {
        dayNum: 1 + k,
        isActive: false,
      };
    });

    return weekdays;
  }
  return [];
}

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button @click="incrementMonth" class="rangepicker__selector-control-left"></button>
          <div>{{ title }}</div>
          <button @click="decrementMonth" class="rangepicker__selector-control-right"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div 
          v-for="calDay in meetupsWithInactiveDays"
          :key="calDay.date || calDay.dayNum"
          class="rangepicker__cell"
          :class="{
            'rangepicker__cell_inactive': !calDay.isActive,
          }"
        >
          {{ calDay.dayNum }}
          <template v-if="calDay.meetups">
            <a 
              v-for="meetup in calDay.meetups"
              :key="meetup.id"
              class="rangepicker__event"
            >
              {{ meetup.title }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentDate: new Date(),
    };
  },

  computed: {
    title() {
      const options = {
        month: 'long',
      };
      return `${this.currentDate.toLocaleString(
        navigator.language,
        options,
      )} ${this.currentDate.getFullYear()}`;
    },

    meetupsPerDay() {
      const lastDay = lastMonthDay(this.currentDate);
      const clearDays = getAllDays(lastDay);

      const meetupsInCurrentMonth = clearDays.map((day) => {
        const dayStart = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          day,
        ).getTime();
        const nextDay = dayStart + DAY_MS;

        const meetups = this.meetups.filter((meetup) => {
          return meetup.date >= dayStart && meetup.date < nextDay;
        });

        return {
          dayNum: day,
          date: dayStart,
          meetups,
          isActive: true,
        };
      });

      return meetupsInCurrentMonth;
    },

    meetupsWithInactiveDays() {
      let result = [];
      const firstWeek = getPreviousWeekDays(this.meetupsPerDay[0].date);

      let lastIndex = this.meetupsPerDay.length;
      let lastWeek = getLastWeekDays(this.meetupsPerDay[lastIndex - 1].date);

      result = [
        ...firstWeek,
        ...this.meetupsPerDay,
        ...lastWeek,
      ];

      return result;
    },
  },

  methods: {
    incrementMonth() {
      this.currentDate = new Date(
        this.currentDate.setMonth(this.currentDate.getMonth() - 1, 15),
      );
    },
    decrementMonth() {
      this.currentDate = new Date(
        this.currentDate.setMonth(this.currentDate.getMonth() + 1, 15),
      );
    },
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации

  // Методы понадобятся для переключения между месяцами
};
