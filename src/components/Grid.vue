<template>
    <div id="app">
        <div>
            <h1>{{ msg }}</h1>
            <div v-show="entryShow">
                <input v-model="player1[0]" placeholder="player1's Name">
                <input v-model="player2[0]" placeholder="player2's Name">
                <p>Player1 Name: {{ player1[0] }}</p>
                <p>Player2 Name: {{ player2[0] }}</p>
            </div>
            <div>
            </div>
        </div>        
        <button v-on:click="gameStart" v-show="buttonShow">Start</button>
        <div v-show="componentShow">
            <p>{{ player1 }}</p><span>{{ actPlayer }}</span>
            <div class="gameStatus" :class="gameStatusColor">
                {{ gameStatusMessage }}
            </div>
            <table class="grid">
                <tr>
                    <cell name="1"></cell>
                    <cell name="2"></cell>
                    <cell name="3"></cell>
                </tr>
                <tr>
                    <cell name="4"></cell>
                    <cell name="5"></cell>
                    <cell name="6"></cell>
                </tr>
                <tr>
                    <cell name="7"></cell>
                    <cell name="8"></cell>
                    <cell name="9"></cell>
                </tr>
            </table>
        </div>
        <div class="flex" v-show="gridShow">
            <a v-on:click="restart" class="bttn1">Restart</a>
        </div>
    </div>
</template>

<script>
import Cell from './Cell.vue'

export default {
    name: 'Grid',
    components: { Cell },
    data() {
        return {
            msg: "Tic Tac Toc test",
            buttonShow: true,
            componentShow: false,
            entryShow: true,
            gridShow: false,
            player1: ['', ''],
            player2: ['', ''],
            actPlayer: 'O',
            actName: '',
            gameStatus: 'onGoing',
            gameStatusColor: '',
            gameStatusMessage: ``,
            moves: 0,
            cells: {
                1: '', 2: '', 3: '',
                4: '', 5: '', 6: '',
                7: '', 8: '', 9: ''
            },
            winConditions: [
                [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
                [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
                [1, 5, 9], [3, 5, 7]             // diagonals
            ],
        }
    },

    computed: {
        otherPlayer: function() {
            if(this.actPlayer === 'O') {
                return 'X'
            }
            return 'O'
        },
    },

    methods: {
        gameStart: function() {
            this.buttonShow = false
            this.componentShow = true
            this.entryShow = false
            this.gridShow = true
            this.gameStatus = 'onGoing'
            this.shapeSelect()
            this.verifyPlayer()
        },

        verifyPlayer: function() {
            if(this.actPlayer === this.player1[1]) {
                this.actName = this.player1[0]
            }
            else {
                this.actName = this.player2[0]
            }
            this.gameStatusMessage = `${this.actPlayer}, ${this.actName}'s turn`
        },

        shapeSelect: function() {
            let randomNumber = Math.round(Math.random() * 1)
            if(randomNumber === 1) {
                this.player1[1] = 'X'
                this.player2[1] = 'O'
            }
            else {
                this.player1[1] = 'O'
                this.player2[1] = 'X'
            }
        },

        checkWinner: function() {
            if(this.moves >= 9) {
                this.gameStatus = 'Draw'
                this.gameStatusMessage = `It's a Draw!`
                Event.$emit('lockCells')
            }

            this.winConditions.forEach((wc) => {
                const [a,b,c] = wc;
                const cellA = this.cells[a];
                const cellB = this.cells[b];
                const cellC = this.cells[c];

                if(cellA && cellA === cellB && cellA === cellC) {
                    this.gameStatus = 'Completed'
                        this.gameStatusMessage = `${this.actPlayer}, ${this.actName} win!`
                    Event.$emit('lockCells')
                }
            })
        },

        changePlayer: function() {
            if(this.gameStatus === 'onGoing') {
                this.actPlayer = this.otherPlayer
                this.verifyPlayer()
            }
        },

        boardReset: function() {
            this.actPlayer = 'O'
            this.gameStatus = 'onGoing',
            this.gameStatusColor = '',
            this.gameStatusMessage = `${this.actPlayer}, ${this.actName}'s turn` 
            this.moves = 0,
            this.cells = {
                1: '', 2: '', 3: '',
                4: '', 5: '', 6: '',
                7: '', 8: '', 9: ''
            }
        },

        restart: function() {
            this.boardReset()
            Event.$emit('clearCells')
        },
    },

    watch: {
        gameStatus: function() {
            if(this.gameStatus === 'Completed') {
                this.gameStatusColor = 'winner'
            }
        },
    },

    created() {
        Event.$on('hit', (cellNumber) => {
            this.cells[cellNumber] = this.actPlayer
            this.moves++
            this.checkWinner()
            this.changePlayer()
        })
    },
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

.grid {
  background-color: #34495e;
  color: #fff;
  width: 100%;
  border-collapse: collapse;
}

.gameStatus {
  margin: 0px;
  padding: 15px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #f1c40f;
  color: #fff;	
  font-size: 1.4em;
  font-weight: bold;
}

.winner {
    color: firebrick;
}
</style>