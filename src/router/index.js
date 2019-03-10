import Vue from 'vue'
import VueRouter from 'vue-router'

import Grid from '../components/Grid.vue'
import Computer from '../components/Computer'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/multiplayer',
            name: 'grid',
            component: Grid
        },
        {
            path: '/Computer',
            name: 'computer',
            component: Computer
        }
    ]
})
