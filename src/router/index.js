import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Members from '../components/Members.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import Test from '../components/Test.vue';
import Show from '../components/Show.vue';
import ForgotPassword from '../components/ForgotPassword.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/members', component: Members },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/test', component: Test },
  { path: '/forgotPassword', component: ForgotPassword },
  { path: '/show', name: 'Show', component: Show, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
