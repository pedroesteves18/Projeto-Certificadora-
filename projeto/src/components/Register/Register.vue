<!-- filepath: /c:/Users/Igor/Desktop/Projeto-Certificadora--main/projeto/src/components/Register/Register.vue -->
<template>
  <div class="RegisterPage">
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label>Confirm Password:</label>
          <input type="password" v-model="confirmPassword" required />
        </div>
        <button type="submit" class="register-button">Register</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/usuarios/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        console.log('Registro bem-sucedido:', response.data);
        this.$router.push('/login');
      } catch (error) {
        console.error('Erro no registro:', error.response ? error.response.data : error.message);
        this.errorMessage = 'Erro no registro: ' + (error.response ? error.response.data.error : error.message);
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

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #F1B4C3, #dd6482); /* Fundo rosa */
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

.RegisterPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.register-container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 400px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.register-container:hover {
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
  font-family: 'Poppins', sans-serif; /* Fonte moderna para os rótulos */
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

.register-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 25px;
  background-color: #dd6482; /* Cor de fundo rosa */
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.register-button:hover {
  background-color: #c04d6a; /* Cor mais escura para o hover */
  transform: translateY(-2px);
}

.register-button:active {
  background-color: #a83d56; /* Cor mais escura para o active */
  transform: translateY(0);
}

.error-message {
  color: #ff4d4d;
  margin-top: 1rem;
  font-weight: 500;
}
</style>