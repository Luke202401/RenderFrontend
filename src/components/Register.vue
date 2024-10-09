<template>
  <div>
    <h1>註冊頁面</h1>
    
    <div class="input-container">
      <label for="email">電子郵件</label>
      <input v-model="email" type="email" id="email" />
      <button @click="sendVerificationCode">發送驗證碼</button>
     
    </div>

    <div class="input-container">
      <label for="verificationCode">驗證碼</label>
      <input type="text" v-model="verificationCode" id="verificationCode" />
    </div>

    <div class="input-container">
      <label for="account">帳號</label>
      <input type="text" v-model="account" @input="checkAccount" id="account" />
      <span class="result" v-if="accountExists !== null">
        {{ accountExists ? '已存在' : '可用' }}
      </span>
    </div>

    <div class="input-container">
      <label for="password">密碼</label>
      <input type="password" v-model="password" id="password" />
    </div>

    <div class="input-container">
      <label for="phone">電話</label>
      <input type="text" v-model="phone" id="phone" />
    </div>

    <button @click="register">註冊</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      verificationCode: '',
      message: '',
      account: '',
      accountExists: null,
      password: '',
      phone: '',
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
    },
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
    },
    async register() {
      if (!this.email || !this.verificationCode || !this.account || !this.password || !this.phone) {
        this.message = '請填寫所有欄位！';
        return;
      }

      try {
        const formData = {
          account: this.account,
          email: this.email,
          password: this.password,
          phone: this.phone,
        };

        const response = await axios.post(`http://localhost:8080/members/register?verificationCode=${this.verificationCode}`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          this.message = '註冊成功！';
          // 可以在這裡進一步處理，例如導向到其他頁面或清空表單
        } else {
          this.message = '註冊失敗，請再試一次。';
        }
      } catch (error) {
        if (error.response) {
          this.message = error.response.data.message || '發生錯誤，無法註冊。';
        } else {
          this.message = '發生錯誤，無法註冊。';
        }
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.input-container {
  margin-bottom: 15px;
}
</style>
