<template>
  <div class="ListagemPage">
    <MainHeader />
    <ListagemBody />
  </div>
</template>

<script>
import MainHeader from '../../MainHeader.vue'
import ListagemBody from './ListagemBody.vue'


export default {
  name: 'ListagemPage',
  components: {
    MainHeader,
    ListagemBody,
  }
}
</script>

<style scoped>
.botoes-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}
</style>