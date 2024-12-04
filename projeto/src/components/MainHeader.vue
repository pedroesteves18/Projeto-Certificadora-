<template>
  
  <div class="header d-flex align-items-center justify-content-between px-5 py-3">

    <div class="BonsFluidos d-flex align-items-center">
      <a href="">
      <img src="../assets/bonsFluidos.png" class="BonsFluidosImagem">
      </a>
      <a href="" style=""><div>bons <br>fluidos</div></a>
    </div>
    <div class="Noticias text-center">
      <div>Notícias</div>
      <div class="barra"></div>
    </div>
    <div class="icons d-flex gap-4">
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
.BonsFluidosImagem {
  width: 7vh;
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
  color: white;
  font-weight: 730;
  font-size: 7vh;
  pointer-events: none;
  user-select: none;
  text-align: center;
  margin-left: auto;
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

.header {
  background-color: #F1B4C3;
  height: 12vh;
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
}

.icons {
  padding-top: 4vh;
  padding-right: 6vh;
  margin-left: 4vh;
  align-items: center;
  margin-left: auto;
  display: flex;
  gap: 1vh;
}
.icons i.iconeYoutube{
  color: white;
  font-size: 6vh;
}

.icons i {
  color: white;
  font-size: 4vh;
}


@media (max-width: 1000px) {

  .BonsFluidos {
    font-size: 4vh;
  }

  .Noticias {
    margin-left: 25vh;
    font-size: 6vh;
  }

  .header {
    padding-right: 2vh;
  }

  .icons {
    padding-top: 1vh;
    padding-right: 3vh;
    padding-left: 3vh;
  }

}

@media (max-width: 870px) {
  .header {
    margin-right: 6vh;
  }

  .BonsFluidos {
    font-size: 3vh;
    margin-left: -2vh;
  }

  .Noticias {
    margin-right: 3vh;
    margin-left: 22vh;
    font-size: 6vh;
  }


  .icons {
    padding-top: 1vh;
    padding-right: 2vh;
    gap: 4vh;
  }


}

@media (max-width: 768px){

  .BonsFluidosImagem{
    width: 10vh;
    height: auto;
  }
  .BonsFluidos{
    font-size: 3vh;
    margin-left: -2.5vh;
    gap:0;
  }
  
  .Noticias{
    margin-left: 1vh;
    font-size: 7vh;
  }

  .icons i.iconeYoutube{
    color: white;
    font-size: 6vh;
  }
  
  .icons i {
    color: white;
    font-size: 5vh;
    gap: 0;
  }
  .icons {
    margin-left: -2vh;
  }
}


</style>