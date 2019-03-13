import Vue from 'vue'
import VueRouter from 'vue-router'

import Multiplayer from '../components/Multiplayer.vue'
import Computer from '../components/Computer'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/multiplayer',
            name: 'Multiplayer',
            component: Multiplayer  //Multiplayer component
        },
        {
            path: '/Computer',
            name: 'computer',
            component: Computer  //Computer component
        }
    ]
})
