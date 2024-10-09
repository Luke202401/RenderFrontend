<template>
    <div>
      <h1>首頁</h1>
      <nav>
        <ul>
          <li><router-link to="/members">會員顯示全部</router-link></li>
          <li><router-link to="/register">會員註冊</router-link></li>
          <li><router-link to="/login">會員登入</router-link></li>
          <li><router-link to="/forgotPassword">忘記密碼</router-link></li>
          <li><router-link to="/test">測試頁面</router-link></li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
  }
  </script>
  