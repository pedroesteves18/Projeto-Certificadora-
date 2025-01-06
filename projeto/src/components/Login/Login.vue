<template>
  <div class="LoginPage">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit" class="login-button">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
      <p class="registro-mensagem">Não tem uma conta? <a href="/register">Registre-se</a></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:3000/usuarios/login', {
          username: this.username,
          password: this.password
        });
        console.log('Login bem-sucedido:', response.data);
        localStorage.setItem('token', response.data.token);
        this.$router.push('/noticias');
      } catch (error) {
        console.error('Erro no login:', error.response ? error.response.data : error.message);
        this.errorMessage = 'Erro no login: ' + (error.response ? error.response.data.error : error.message);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  width: 100%;
  height: 100%;
}

.LoginPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.login-container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 400px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 700;
  font-size: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
  font-family: 'Poppins', sans-serif; 
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #dd6482; /* Cor de foco rosa */
  outline: none;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
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

.error-message {
  color: #ff4d4d;
  margin-top: 1rem;
  font-weight: 500;
}

.registro-mensagem {
  margin-top: 1rem;
  font-size: 1rem;
  color: #555;
}

.registro-mensagem a {
  color: #dd6482;
  text-decoration: none;
  font-weight: bold;
}

.registro-mensagem a:hover {
  text-decoration: underline;
}
</style>