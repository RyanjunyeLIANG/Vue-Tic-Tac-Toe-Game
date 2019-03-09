<template>
  <div class="scoreBoard">
    <div id="app">
      <h1>{{ msg }}</h1>
      <grid></grid>
      <div class="flex">
        <a v-on:click="restart" class="bttn1">Restart</a>
      </div>
    </div>
  </div>
</template>

<script>
import Grid from './Grid';

export default {
  components: { Grid },
  name: 'multiplayer',
  data () {
    return {
      msg: "Tic Tac Toc test",
    } 
  },

  methods: {
    restart: function() {
      Event.$emit('clearCells')
      Event.$emit('boardReset')
    }
  }
}
</script>

<style lang="scss">

$font:'Source Sans Pro', sans-serif;
$forth:rgba(10, 184, 77, 0.979);

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 0 auto;
  max-width: 270px;
  color: #34495e;
}
  
*,
*::before,
*::after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  padding:0px;
  margin:0;
  font-family:$font;
  background: #F5F0FF;
  -webkit-font-smoothing: antialiased;
}

.flex {
  min-height:20vh;
  display:flex;
  align-items:center;
  justify-content:center;
}

a.bttn1 {
  color:$forth;
  text-decoration:none;
  -webkit-transition:0.3s all ease;
  transition:0.3s ease all;
  &:hover {
    color:#FFF;
  }
  &:focus {
    color:#FFF;
  }
}

.bttn1 {
  font-size:18px;
  letter-spacing:2px;
  text-transform:uppercase;
  display:inline-block;
  text-align:center;
  width:270px;
  font-weight:bold;
  padding:14px 0px;
  border:3px solid $forth;
  border-radius:2px;
  position:relative;
  box-shadow: 0 2px 10px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.1);
  &:before {
    -webkit-transition:0.5s all ease;
    transition:0.5s all ease;
    position:absolute;
    top:0;
    left:50%;
    right:50%;
    bottom:0;
    opacity:0;
    content:'';
    background-color:$forth;
    z-index:-2;
  }
  &:hover {
    &:before {
      -webkit-transition:0.5s all ease;
      transition:0.5s all ease;
      left:0;
      right:0;
      opacity:1;
    }
  }
  &:focus {
    &:before {
      transition:0.5s all ease;
      left:0;
      right:0;
      opacity:1;
    }
  }
}
</style>
