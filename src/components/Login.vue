<template>
  <div class="login-container">
    <h2>登入</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="account">帳號:</label>
        <input type="text" id="account" v-model="account" required />
      </div>
      <div>
        <label for="password">密碼:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">登入</button>
      <div v-if="message" :class="{'success': success, 'error': !success}">
        {{ message }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      account: '',
      password: '',
      message: '',
      success: false,
    };
  },
  methods: {
    async handleLogin() {
  try {
    const formData = new FormData();
    formData.append('account', this.account);
    formData.append('password', this.password);

    const response = await axios.post('http://localhost:8080/members/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    this.success = response.data.success;
    this.message = response.data.message;

    if (this.success) {
      // 存儲會員資料到 Vuex 或 LocalStorage
      localStorage.setItem('loggedInMember', JSON.stringify(response.data.member));
      this.$router.push('/show'); // 假設 /show 是 Show.vue 的路由
    }
  } catch (error) {
    this.success = false;
    this.message = error.response?.data?.message || '登入失敗，請稍後再試';
  }
},

  },
};
</script>

<style scoped>

</style>
