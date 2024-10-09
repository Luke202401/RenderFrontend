<template>
    <div class="forgot-password">
      <h1>忘記密碼</h1>
      <form @submit.prevent="handleForgotPassword">
        <div class="form-group">
          <label for="account">帳號：</label>
          <input type="text" v-model="account" id="account" required />
        </div>
        <button type="submit">重置密碼</button>
        <div v-if="message" :class="{'success': isSuccess, 'error': !isSuccess}">
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
        message: '',
        isSuccess: false,
      };
    },
    methods: {
      async handleForgotPassword() {
        try {
          const response = await axios.post('http://localhost:8080/members/forgotPassword', {
            account: this.account,
          });
          this.message = response.data.message;
          this.isSuccess = response.data.status === 'success';
        } catch (error) {
          this.message = error.response.data.message || '發生錯誤，請稍後再試。';
          this.isSuccess = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  