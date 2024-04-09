<template>
    <div class="container">
      <div>
        <p style="font-family: Chiller" class="pok">¿ Quien es este Pokémon ?</p>
        <input v-model="respuesta" placeholder="Nombre pokemon" />
        <button @click="verificarRespuesta" class="boton">Cick</button>
      </div>
      <div>
        <div v-if="pokemonActual">
          <p style="color: #f5f550d3"> Pokémon: {{ pokemonActual.name }}</p>
          <img v-if="pokemonActualImagen" :src="pokemonActualImagen" :class="{ pokemon: !adivinado, silueta: adivinado }" alt="Pokemon">
        </div>
        <button @click="cambiarPokemon" class="boton">Cambiar Pokémon</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Swal from 'sweetalert2';
  import axios from 'axios';
  
  const respuesta = ref('');
  const pokemonActual = ref(null);
  const pokemonActualImagen = ref('');
  let listaPokemons = [];
  const adivinado = ref(false);
  
  const obtenerNombresPokemons = async () => {
    try {
      const respuesta = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
      listaPokemons = respuesta.data.results.map(pokemon => pokemon.name);
    } catch (error) {
      console.error('Error fetching Pokémon names:', error);
    }
  };
  
  const obtenerPokemon = async (nombre) => {
    try {
      const respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
      pokemonActual.value = respuesta.data;
      pokemonActualImagen.value = respuesta.data.sprites.other['official-artwork'].front_shiny;
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  
  };
  
  const verificarRespuesta = () => {
    if (respuesta.value.toLowerCase() === pokemonActual.value.name) {
      Swal.fire('FELICIDADES! GANASTE!');
      adivinado.value = true;
    } else {
      Swal.fire('VUELVE A INTENTARLO');
    }
  };
  
  const cambiarPokemon = () => {
  const indice = Math.floor(Math.random() * listaPokemons.length);
  obtenerPokemon(listaPokemons[indice]);
  adivinado.value = false; 
  pokemonActual.value = null; 
  pokemonActualImagen.value = ''; 

};
  

  onMounted(() => {
    obtenerNombresPokemons();
    cambiarPokemon();
  });
  </script>
  
  <style scoped>
  
 
  .container {
    width: 100%;
    height: 100%;
    
  
    display: grid;
    justify-content: center;
    
  }
  
  .pokemon {
    filter: brightness(0); 
    

  }
  .pok{
    
  font-size: 50px;
  font-weight: bold;
  }
  .adivinado .pokemon {
    filter: none; 
    color: rgb(245, 245, 245);
    box-shadow: none; 
  }
  </style>
  