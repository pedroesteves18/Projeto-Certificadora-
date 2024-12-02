<template>
  <div class="app">
    <MainHeader />
  </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue'

export default {
  name: 'App',
  components: {
    MainHeader
  }
}
</script>

<style>
body {
  margin: 0;
  padding-top: 150px;
  height: auto;
}
</style>
