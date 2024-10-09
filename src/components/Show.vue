<template>
    <div class="show-container">
      <h2>會員資料</h2>
      <div v-if="member">
        <p>帳號: {{ member.account }}</p>
        <p>帳號: {{ member.email }}</p>
        <p>帳號: {{ member.phone }}</p>
        <p>帳號: {{ member.createdAt }}</p>
      </div>
      <div v-else>
        <p>沒有找到會員資料。</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        member: null,
      };
    },
    mounted() {
      // 從 localStorage 讀取會員資料
      const memberData = localStorage.getItem('loggedInMember');
      if (memberData) {
        this.member = JSON.parse(memberData);
      }
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  