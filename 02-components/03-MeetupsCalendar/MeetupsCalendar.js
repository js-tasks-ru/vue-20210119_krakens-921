const DAY_MS = 24*60*60*1000;

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

  if(dayWeekNum !== 1) {
    const weekdays = Array.from({ length: dayWeekNum - 1 }, (v, k) => {
      return {
        dayNum: lastPreviousMonthDay - k,
        isActive: false
      };
    }).reverse();

    return {
      weekdays,
      dayWeekNum,
    };
  }
  return false;
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
        <div class="rangepicker__cell rangepicker__cell_inactive">28</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">29</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">30</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">31</div>
        <div class="rangepicker__cell">
          1
          <a class="rangepicker__event">Митап</a>
          <a class="rangepicker__event">Митап</a>
        </div>
        <div class="rangepicker__cell">2</div>
        <div class="rangepicker__cell">3</div>
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
      return `${this.currentDate.toLocaleString(navigator.language, options)} ${this.currentDate.getFullYear()}`;
    },

    meetupsPerDay() {
      const lastDay = lastMonthDay(this.currentDate);
      const clearDays = getAllDays(lastDay);

      const meetupsInCurrentMonth = clearDays.map((day) => {
        const dayStart = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day).getTime();
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

    meetupsPerWeek() {
      let result = [];
      const firstWeek = getPreviousWeekDays(this.meetupsPerDay[0].date);

      if(firstWeek) {
        result.push([...firstWeek.weekdays, ...this.meetupsPerDay.slice(0, 8 - firstWeek.dayWeekNum)]);
      }

      return result;
    },
  },

  methods: {
    incrementMonth() {
      this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
    },
    decrementMonth() {
      this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
    },
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации

  // Методы понадобятся для переключения между месяцами
};
