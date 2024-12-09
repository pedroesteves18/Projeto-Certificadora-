<template>
  <div id="app">
    <nav>
        <router-link to="/cadastro"></router-link>
    </nav>
    <nav>
        <router-link to="noticias"></router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

}
</script>

