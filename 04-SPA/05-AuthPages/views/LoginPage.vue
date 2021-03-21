<template>
  <form @submit.prevent="onSubmitClick" class="form">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          v-model="email"
          type="email"
          placeholder="demo@email"
          class="form-control"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="form-control"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link class="link" :to="{ name: 'register' }">
        Зарегистрируйтесь
      </router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

const messages = {
  email: 'Требуется ввести Email',
  password: 'Требуется ввести пароль',
  loginError: 'Неверные учетные данные',
};

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async onSubmitClick() {
      let { email, password } = this;
      if (!email) {
        alert(messages.email);
        return;
      }
      if (!password) {
        alert(messages.password);
        return;
      }

      const response = await login(email, password);
      if (!response.statusCode) {
        alert(response.fullname);
      } else {
        alert(messages.loginError);
      }
    },
  },
};
</script>

<style scoped></style>
