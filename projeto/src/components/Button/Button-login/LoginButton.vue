
<template>
    <button @click="goToLogin" class="login-button">
      Login
    </button>
  </template>
  
  <script>
  export default {
    name: 'LoginButton',
    methods: {
      goToLogin() {
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .login-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 25px;
    background-color: #dd6482; 
    color: white;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .login-button:hover {
    background-color: #c04d6a; 
    transform: translateY(-2px);
  }
  
  .login-button:active {
    background-color: #a83d56; 
    transform: translateY(0);
  }
  </style>