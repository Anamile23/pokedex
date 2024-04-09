<template>
  <div>
    <header class="header">
      <nav class="nav">
        <a href="#" class="logo"><img src="./img/Logo Pokemon.png" alt="" class="img"></a>
        <button class="nav-toggle" aria-label="Abrir Menu">
          <i class="fas fa-bars"></i>
        </button>
        <ul class="nav-menu">
          <li class="nav-menu-item"><router-link to="/" class="nav-menu-link nav-link">Inicio</router-link></li>
          <li class="nav-menu-item"><router-link to="/pokemon" class="nav-menu-link nav-link">Pokedex</router-link></li>
          <li class="nav-menu-item"><router-link to="/adivinaPoke" class="nav-menu-link nav-link">¿ Quién es este Pokemon ?</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
   
  </div>
</template>


<script setup>
import { ref } from 'vue'
import './style.css';

</script>

