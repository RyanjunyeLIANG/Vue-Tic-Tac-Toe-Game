<template>
<div>
    <h1>{{ msg }}</h1> <!--- Receive data.msg value  --->
    <div class="flex"> <!--- router-link buttons container  --->
        <router-link to="/multiplayer" class="bttn">Multiplayer</router-link>
        <span>     </span>
        <router-link to="/computer" class="bttn-dark">A.I</router-link>
    </div>
    <keep-alive><router-view></router-view></keep-alive> <!--- components view and keep it stay in the browser when switch the router  --->
</div>
</template>

<script>
export default {
    name: 'app',
    data() {
      return {
        msg: "Tic Tac Toc", //header message send to <h1>
      }
    }
}
</script>


<style lang="scss">

$font:'Source Sans Pro', sans-serif; 
$primary:#FF0072;
$second:#644cad;
$third:#4426a8;
  
*,
*::before,
*::after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

html, body{
    height:100%;
    width: 100%;
}

body {
  padding:0px;
  margin:0;
  font-family:$font;
  background: #F5F0FF;
  -webkit-font-smoothing: antialiased;
}

h1 {
  font-size: 40px;
  text-align: center;
}

.dark {
  background:#24252A;
}

.flex {
  min-height:50vh;
  display:flex;
  align-items:center;
  justify-content:center;
}

a.bttn {
  color:$primary;
  margin-right: 50px;
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

a.bttn-dark {
  color:$second;
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


.bttn {
  font-size:18px;
  letter-spacing:2px;
  text-transform:uppercase;
  display:inline-block;
  text-align:center;
  width:270px;
  font-weight:bold;
  padding:14px 0px;
  border:3px solid $primary;
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
    background-color:$primary;
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

.bttn-dark {
  font-size:18px;
  letter-spacing:2px;
  text-transform:uppercase;
  display:inline-block;
  text-align:center;
  width:270px;
  font-weight:bold;
  padding:14px 0px;
  border:3px solid $second;
  border-radius:2px;
  position:relative;
  box-shadow: 0 2px 10px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.1);
  z-index:2;
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
    background-color:$second;
    z-index:-1;
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
      -webkit-transition:0.5s all ease;
      transition:0.5s all ease;
      left:0;
      right:0;
      opacity:1;
    }
  }
}
</style>
