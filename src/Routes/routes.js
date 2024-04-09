import home from "../components/home.vue"
import pokemon from "../components/pokemon.vue"
import adivinaPoke from "../components/adivinaPoke.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    { path: "/", component: home },
    { path: "/pokemon", component: pokemon },
    { path: "/adivinaPoke", component: adivinaPoke }
    
];

export const  router = createRouter({
    history:createWebHashHistory(),
    routes
})
