<template>
  
  <div class="header">

    <div class="BonsFluidos d-flex align-items-center">
      <a href="http://localhost:8080/noticias" >
      <img src="../assets/bonsFluidos.png" class="BonsFluidosImagem">
      </a>
      <a href="http://localhost:8080/noticias" style=""><div>bons <br>fluidos</div></a>
    </div>
    <div class="Noticias">
      <div>Notícias</div>
      <div class="barra"></div>
    </div>
    <div class="icons">
      <a href="https://www.utfpr.edu.br/campus/cornelioprocopio/extensao/atividades-extensao/projeto-de-extensao-bons-fluidos">
        <i class="bi bi-globe"></i>
      </a>
      <a href="https://www.instagram.com/bonsfluidosutfpr/">
        <i class="bi bi-instagram"></i>
      </a>
      <a href="https://www.youtube.com/watch?v=Qcam2EaApXk">
        <i class="iconeYoutube bi bi-youtube"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainHeader'
}
</script>

<style scoped>
a {
  text-decoration: none; 
  color: inherit; 
}

.header {
  background-color: #F1B4C3;
  height: 12vh;
  width: 100%;
  position: fixed;
  padding-left: 2vh;
  top: 0;
  display: flex;
  flex-direction: row;
}

.BonsFluidosImagem {
  width: 10vh;
  height: auto;
}

.BonsFluidos {
  color: #E11F4A;
  font-size: 4.5vh;
  font-weight: 700;
  display: flex;
  gap: 1vh;
  align-items: center;
}

.Noticias {
  padding-left: 48vh;
  color: white;
  font-weight: 730;
  margin-right: 10vh;
  font-size: 9vh;
  pointer-events: none;
  user-select: none;
  text-align: center;
}

.barra {
  margin-top: -0.8vh;
  width: 100%;
  height: 0.2vh;
  background-color: white;
  border: solid white 0.2vh;
  border-radius: 0.1vh;
  margin-bottom: 1vh;
}

.icons {
  padding-top: 4vh;
  padding-right: 20vh;
  align-items: center;
  margin-left: auto;
  display: flex;
  gap: 3vh;
}
.icons i.iconeYoutube{
  color: white;
  font-size: 7vh;
}

.icons i {
  color: white;
  font-size: 5vh;
}


@media (max-width: 1000px) {
  .BonsFluidosImagem {
    width: 11vh;
    height: auto;
  }
  .BonsFluidos {
    font-size: 5vh;
  }

  .Noticias {
    font-size: 9vh;
    padding-left: 14vh;
    margin-right: 5vh;
  }

  .header {
    padding-right: 2vh;
  }

}



</style>