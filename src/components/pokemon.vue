<template>
  <div class="tipo_pokemon">
    <div class="contenedor-busqueda">
      <input type="text" placeholder="Ingrese el ID o Nombre del Pokemon" class="busc" v-model="id">
      <button @click="traer()" class="lupa"><i class="fas fa-search"></i></button>
    </div>
    <div class="cuerpo" v-if="aparecer">
      <div class="datos">
        <div class="primera_parte">
          <div class="otros_datos">
            <p class="tipo_poke">
              <span v-for="(typeData, index) in pokemon.types" :key="index">
                <img :src="getTipoImagen(typeData.type.name)" alt="">
                <span :style="{ ...typeStyles[typeData.type.name] }">
                  {{ index === 0 ? typeData.type.name.charAt(0).toUpperCase() + typeData.type.name.slice(1) :
                    ' ' + typeData.type.name.charAt(0).toUpperCase() + typeData.type.name.slice(1) }}
                </span>
                <template v-if="index !== pokemon.types.length - 1">&nbsp;</template>
              </span>
            </p>
            <h2 class="nombre_poke"><strong>{{ pokemon.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
              : '' }}</strong></h2>
            <div class="poke_datos">
              <p><strong>Altura:</strong></p>
              <p>{{ pokemon.height / 10 }} M</p>
            </div>
            <div class="poke_datos">
              <p><strong>Peso:</strong></p>
              <p>{{ pokemon.weight / 10 }} kg</p>
            </div>
          </div>
          <div class="pimagen">
            <div class="fotopoke" :style="{ 'background-image': 'url(' + (pokemon.sprites?.other['official-artwork'].front_shiny || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/1.gif') + ')' }">
            </div>
            <h1 class="id_poke">#{{ pokemon && pokemon.id ? (pokemon.id < 1000 ? pokemon.id.toString().padStart(3, '0') :
              pokemon.id) : '' }}</h1>
          </div>
        </div>
      </div>
      <div class="stats q-pa-md">
        <h2 class="estadisticas"><strong>Estadisticas:</strong></h2>
        <ul>
          <li v-if="pokemon.stats && pokemon.stats.length" v-for="(group, groupIndex) in Math.ceil(pokemon.stats.length / 3)" :key="groupIndex">
            <span v-for="(stat, statIndex) in pokemon.stats.slice(groupIndex * 3, groupIndex * 3 + 3)" :key="statIndex">
              <div class="stat-info">
                <span class="stat-name">{{ stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1) }}:</span>
                <span class="bar-progres">{{ stat.base_stat }} </span>
              </div>
              <q-linear-progress
                stripe
               size="30px"
               :value="stat.base_stat / 255"
               class="progress-bar"
               color="red"
               gradient="primary"
              />
            </span>
          </li>
        </ul>
      </div>
     
    </div>
    <br>
    <img src="../img/pokemon_logo.png" alt="" style="width: 400px" v-show="mostrarLogo" class="pokebola">

  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const pokemon = ref({});
const id = ref('');
const aparecer = ref(false);
const mostrarLogo= ref(true)

const typeStyles = {
  normal: { background: '#705358', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  fighting: { background: '#993E23', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  flying: { background: '#44677A', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  poison: { background: '#A040A1', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  ground: { background: '#DEBF66', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  rock: { background: '#8B3E22', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  bug: { background: '#729F3F', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  ghost: { background: '#493963', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  steel: { background: '#787887', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  fire: { background: '#DE4815', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  water: { background: '#318BCF', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  grass: { background: '#52A95F', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  electric: { background: '#F0C421', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  psychic: { background: '#EF488F', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  ice: { background: '#8ED3F4', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  dragon: { background: '#7038F8', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  dark: { background: '#5A5366', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' },
  fairy: { background: '#EE90E6', padding: '8px 10px', borderRadius: '20px', fontWeight: 'bold', border: '1px solid #A3A7A8' }
};

function ocultarLogo() {
  mostrarLogo.value = false;
}
async function traer() {
  try {
    const datos = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id.value}`);
    pokemon.value = datos.data;
    aparecer.value = true;
    console.log(datos.data);
  } catch (error) {
    console.error('Error al obtener datos del Pokémon:', error);
  }
  limpiar();
}

function getTipoImagen(tipo) {
  return `../img/png/Tipo ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}.png`;
}

function limpiar() {
  id.value = '';
}
</script>
 <style scoped>
 
 </style>
