<template>
    <div>
      <h1>發送驗證碼</h1>
      <input v-model="email" type="email" placeholder="請輸入電子郵件" />
      <button @click="sendVerificationCode">發送驗證碼</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        message: '',
      };
    },
    methods: {
        async sendVerificationCode() {
  try {
    const formData = new FormData();
    formData.append('email', this.email);

    const response = await axios.post('http://localhost:8080/members/sendVerificationCode', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.status === 200) {
      this.message = '驗證碼已成功發送！';
    } else {
      this.message = '發送失敗，請再試一次。';
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      this.message = '無效的請求，請檢查輸入格式。';
    } else {
      this.message = '發生錯誤，無法發送驗證碼。';
    }
    console.error(error);
  }
}
,
    },
  };
  </script>
  
  <style scoped>
  input {
    margin-bottom: 10px;
    padding: 8px;
    width: 300px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  