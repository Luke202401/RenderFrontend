<template>
  <div>
    <h1>會員顯示全部</h1>
    <ul v-if="members.length">
      <li v-for="member in members" :key="member.memberId">
        {{ member.account }} - {{ member.email }}
      </li>
    </ul>
    <p v-else>沒有會員資料</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Members',
  data() {
    return {
      members: [],
    };
  },
  created() {
    this.fetchMembers();
  },
  methods: {
    async fetchMembers() {
      try {
        const response = await axios.get('https://renderbackend-fu53.onrender.com/api/users');
        this.members = response.data;
      } catch (error) {
        console.error('獲取會員資料失敗:', error);
      }
    },
  },
}
</script>

<style scoped>
/* 可以在這裡添加一些樣式 */
</style>
