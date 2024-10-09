<template>
    <div>
      <h1>測試頁面</h1>
      <div class="input-container">
        <input 
          type="text" 
          v-model="account" 
          @input="checkAccount" 
          placeholder="輸入帳號"
        />
        <span class="result" v-if="accountExists !== null">
          {{ accountExists ? '已存在' : '可用' }}
        </span>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Test',
    data() {
      return {
        account: '',
        accountExists: null,
      };
    },
    methods: {
      async checkAccount() {
        if (this.account) {
          try {
            const response = await axios.get(`http://localhost:8080/members/checkAccount?account=${this.account}`);
            this.accountExists = response.data; 
          } catch (error) {
            console.error('檢查帳號時發生錯誤:', error.response ? error.response.data : error.message);
            this.accountExists = null;
          }
        } else {
          this.accountExists = null;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .input-container {
    display: flex;
    align-items: center;
  }
  
  
  </style>
  