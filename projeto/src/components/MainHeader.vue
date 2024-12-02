<template>
  <div class="header d-flex align-items-center justify-content-between px-5 py-3">
    <div class="BonsFluidos d-flex align-items-center">
      <img src="../assets/bonsFluidos.png" class="BonsFluidosImagem">
      <div>bons <br>fluidos</div>
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
.BonsFluidosImagem {
  width: 7rem;
  height: auto;
}

.BonsFluidos {
  color: #E11F4A;
  font-size: 45px;
  font-weight: 700;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.Noticias {
  color: white;
  font-weight: 730;
  font-size: 70px;
  pointer-events: none;
  user-select: none;
  text-align: center;
  margin-left: auto;
}

.barra {
  width: 100%;
  height: 2px;
  background-color: white;
  border: solid white 2px;
  border-radius: 1px;
  margin-bottom: 1rem;
}

.header {
  background-color: #F1B4C3;
  height: 120px;
  width: 100%;
  position: fixed;
  top: 0;
  justify-content: space-between;
}

.icons {
  padding-top: 3rem;
  padding-right: 6rem;
  margin-left: 4rem;
  align-items: center;
  margin-left: auto;
  display: flex;
  gap: 1rem;
}
.icons i.iconeYoutube{
  color: white;
  font-size: 4rem;
}

.icons i {
  color: white;
  font-size: 3rem;
}


@media (max-width: 1000px) {

  .BonsFluidos {
    font-size: 40px;
  }

  .Noticias {
    margin-left: 5rem;
    font-size: 50px;
  }

  .header {
    padding-right: 2rem;
  }

  .icons {
    padding-top: 1rem;
    padding-right: 3rem;
    padding-left: 3rem;
  }

}

@media (max-width: 870px) {
  .header {
    margin-right: 6rem;
  }

  .BonsFluidos {
    font-size: 30px;
    margin-left: -2rem;
  }

  .Noticias {
    margin-left: 4rem;
    font-size: 50px;
  }


  .icons {
    padding-top: 1rem;
    padding-right: 2rem;
    gap: 4rem;
  }


}

@media (max-width: 768px){

  .BonsFluidosImagem{
    width: 6rem;
    height: auto;
  }
  .BonsFluidos{
    font-size: 27px;
    margin-left: -2.5rem;
    gap:0;
  }
  
  .Noticias{
    margin-left: 1rem;
    font-size: 40px;
    padding-top: 1rem;
  }

  .icons i.iconeYoutube{
    color: white;
    font-size: 3rem;
  }
  
  .icons i {
    color: white;
    font-size: 2rem;
  }
  .icons {
    margin-left: -2rem;
    padding-right: 1rem;
  }
}

</style>