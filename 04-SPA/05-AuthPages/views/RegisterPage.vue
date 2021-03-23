<template>
  <form @submit.prevent="onSubmitClick" class="form">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model="email" type="email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input v-model="fullName" type="text" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input v-model="passwordRepeat" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox">
        <input v-model="agreement" type="checkbox" />
        Я согласен с условиями <span></span>
      </label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link :to="{ name: 'login' }" class="link"> Войдите </router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

const messages = {
  email: 'Требуется ввести Email',
  fullName: 'Требуется ввести полное имя',
  password: 'Требуется ввести пароль',
  passwordRepeat: 'Пароли не совпадают',
  agreement: 'Требуется согласиться с условиями',
};

export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      fullName: '',
      password: '',
      passwordRepeat: '',
      agreement: false,
    };
  },
  methods: {
    async onSubmitClick() {
      let { email, fullName, password, passwordRepeat, agreement } = this;

      if (!email) {
        alert(messages.email);
        return;
      }
      if (!fullName) {
        alert(messages.fullName);
        return;
      }
      if (!password) {
        alert(messages.password);
        return;
      }
      if (password !== passwordRepeat) {
        alert(messages.passwordRepeat);
        return;
      }
      if (!agreement) {
        alert(messages.agreement);
        return;
      }

      const response = await register(email, fullName, password);
      if (!response.statusCode) {
        alert(response.id);
      } else {
        alert(response.message);
      }
    },
  },
};
</script>

<style scoped></style>
