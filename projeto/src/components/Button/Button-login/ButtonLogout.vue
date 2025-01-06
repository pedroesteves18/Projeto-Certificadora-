<template>
  <button @click="logout" class="logout-button">Logout</button>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'ButtonLogout',
  setup() {
    const $router = useRouter();

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      $router.push('/noticias').then(() => {
        window.location.reload();
      });
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
.logout-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.logout-button:hover {
  background-color: #e60000;
  transform: translateY(-2px);
}

.logout-button:active {
  background-color: #cc0000;
  transform: translateY(0);
}
</style>
