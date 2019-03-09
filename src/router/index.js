import Vue from 'vue'
import VueRouter from 'vue-router'

import Multiplayer from '../components/Multiplayer'
import Computer from '../components/Computer'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/multiplayer',
            name: 'multiplayer',
            component: Multiplayer
        },
        {
            path: '/Computer',
            name: '/computer',
            component: Computer
        }
    ]
})
