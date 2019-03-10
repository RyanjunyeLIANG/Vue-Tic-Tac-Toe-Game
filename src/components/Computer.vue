<template>
    <div>
        <h1> Under construction </h1>
        <h2> {{ randomNumber }} </h2>
        <button v-on:click="getRandomNumber">Get Number</button>
    </div>
</template>


<script>
export default {
    name: 'computer',
    data() {
        return {
            randomNumber: 0,
        }
    },

    methods: {
        getRandomNumber: function() {
            this.randomNumber = Math.round(Math.random() * 1)
        }
    },
}
</script>
