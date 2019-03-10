<template>
    <div id="app">
        <h1 class="buttonA"> {{ chooseName }} </h1> <!-- Show the random choosed name -->
        <div>Do you think you can beat me? </div>
        <div v-show="buttonShow"> <!-- buttons' container -->
            <a herf="#" v-on:click="gameStart" class="bttn2 buttonA">Start</a>
            <a herf="#" v-on:click="nameChange" class="bttn1 buttonA">Change name</a>
        </div>   
        <!-- board container -->
        <div class="chessBoard" v-show="boardShow">
            <div class="gameStatus" :class="gameStatusColor">
                {{ gameStatusMessage }}
            </div>
            <table class="grid">
                <tr>
                    <cellAi name="1" ref="cell1"></cellAi>
                    <cellAi name="2" ref="cell2"></cellAi>
                    <cellAi name="3" ref="cell3"></cellAi>
                </tr>
                <tr>
                    <cellAi name="4" ref="cell4"></cellAi>
                    <cellAi name="5" ref="cell5"></cellAi>
                    <cellAi name="6" ref="cell6"></cellAi>
                </tr>
                <tr>
                    <cellAi name="7" ref="cell7"></cellAi>
                    <cellAi name="8" ref="cell8"></cellAi>
                    <cellAi name="9" ref="cell9"></cellAi>
                </tr>
            </table>
        </div>
        <div class="flex" v-show="boardShow">  <!-- restart button -->
            <a v-on:click="restart" class="bttn1">Restart</a>
        </div>
    </div>
</template>

<script>
import CellAi from './CellAi.vue'

export default {
    name: 'Computer',
    components: { CellAi },
    data() {
        return {
            playerName: ['Ryan', 'Nicole', 'Chris', 'Christine', 'Faker', 'Bruce', 'Summer'], //Name pool array
            buttonShow: true,
            boardShow: false,
            chooseName: '',
            gameStatus: 'onGoing',
            gameStatusColor: '',
            actPlayer: 'O',
            turn: 'Player',
            gameStatusMessage: `Go ahead`,
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
        //OtherPlayer value support function for changePlayer()
        otherPlayer: function() {
            if(this.actPlayer === 'O') {
                return 'X'
            }
            return 'O'
        },

        //OtherTurn value support function for changePlayer()
        otherTurn: function() {
            if(this.turn === 'Player') {
                return 'Ai'
            }
            return 'Player'
        },

        //Define winner and comments
        winner: function() {
            if(this.turn === 'Player') {
                return 'You Win!!'
            }
            return `I beat you! ${this.chooseName}!`
        },

        //To find available cells and choose a random one between them for Ai
        randomAvailableNumber: function() {
            var moveArr = []
            var arr = []
            var i = 0
            for(let key in this.cells){
                moveArr.push(this.cells[key])
            }
            for(i=0;i<moveArr.length;i++) {
                if(!moveArr[i]) {
                    arr.push(i+1)
                }
            }           
            var rngN = Math.round(Math.random() * (arr.length-1))
            return arr[rngN]
        },
    },

    methods: {
        // Game start trigger
        gameStart: function() {
            this.boardShow = true
            this.buttonShow = false
        },

        // Random choose a name from the name pool
        nameChange: function() {
            let ranNumber = Math.round(Math.random() * (this.playerName.length-1))
            this.chooseName = this.playerName[ranNumber]
        },

        //Check the winner and the win conditions
        checkWinner: function() {
            if(this.moves >= 9) {
                this.gameStatus = 'Draw'
                this.gameStatusMessage = `It's a Draw!`
                Event.$emit('lockCellsAi')
            }

            this.winConditions.forEach((wc) => {
                const [a,b,c] = wc;
                const cellA = this.cells[a];
                const cellB = this.cells[b];
                const cellC = this.cells[c];

                if(cellA && cellA === cellB && cellA === cellC) {
                    this.gameStatus = 'Completed'
                        this.gameStatusMessage = `${this.winner}`
                    Event.$emit('lockCellsAi') //Fire lockCellAi event to CellAi component
                }
            })
        },

        //Reset the board for new game
        boardReset: function() {
            this.actPlayer = 'O'
            this.turn = 'Player'
            this.gameStatus = 'onGoing',
            this.gameStatusColor = '',
            this.gameStatusMessage = `Try again!` 
            this.moves = 0,
            this.cells = {
                1: '', 2: '', 3: '',
                4: '', 5: '', 6: '',
                7: '', 8: '', 9: ''
            }
        },

        //Ai move
        aiMove: function() {
            if(this.turn === 'Ai' && this.gameStatus === 'onGoing') {
                this.aiClick(this.randomAvailableNumber)
            }
        },

        //Triggered by restart button 
        restart: function() {
            this.boardReset()
            Event.$emit('clearCellsAi') // Fire clearCellsAi event to cellsAi component
        },

        //change Player and turn
        changePlayer: function() {
            if(this.gameStatus === 'onGoing') {
                this.actPlayer = this.otherPlayer
                this.turn = this.otherTurn
            }
        },

        //Similate a click to selected cell for AI
        aiClick: function(cellClick) {
            if(cellClick === 1) {
                this.$refs.cell1.hitAi()
            }
            else if(cellClick === 2) {
                this.$refs.cell2.hitAi()
            }
            else if(cellClick === 3) {
                this.$refs.cell3.hitAi()
            }
            else if(cellClick === 4) {
                this.$refs.cell4.hitAi()
            }
            else if(cellClick === 5) {
                this.$refs.cell5.hitAi()
            }
            else if(cellClick === 6) {
                this.$refs.cell6.hitAi()
            }
            else if(cellClick === 7) {
                this.$refs.cell7.hitAi()
            }
            else if(cellClick === 8) {
                this.$refs.cell8.hitAi()
            }
            else if(cellClick === 9) {
                this.$refs.cell9.hitAi()
            }
        },
    },

    //Watch the data change to perform certain changes
    watch: {
        //gameStatus data watch to change the status window color
        gameStatus: function() {
            if(this.gameStatus === 'Completed') {
                this.gameStatusColor = 'winner'
            }
        },
    },

    //Initiate the first time random name choose and constantly listen hitAi event
    created() {
        this.nameChange()
        Event.$on('hitAi', (cellNumber) => {
            this.cells[cellNumber] = this.actPlayer
            this.moves++
            this.checkWinner()
            this.changePlayer()
            this.aiMove()
        })
    },
}
</script>


<style lang="scss">

$font:'Source Sans Pro', sans-serif;
$forth:rgba(10, 184, 77, 0.979);
$fifth:rgb(29, 26, 26);

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

table {
    text-align: center;
    width: 100%;
}

.buttonA {
    margin-top: 50px;
}

.table1 {
    width: 100%;
    margin-top: 40px;
    margin-bottom: 10px;
    margin-left: 25px;
}

.table2 {
    width: 100%;
    margin-top: 40px;
    margin-bottom: 30px;
}

.flex {
  min-height:2vh;
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

a.bttn2 {
  color:$fifth;
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

.bttn2 {
  font-size:18px;
  letter-spacing:2px;
  text-transform:uppercase;
  display:inline-block;
  text-align:center;
  width:270px;
  font-weight:bold;
  padding:14px 0px;
  border:3px solid $fifth;
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
    background-color:$fifth;
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

.chessBoard {
    margin-top: 50px
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

.player {
    font-size: 1.4em;
    font-weight: bold;
}

//winner color for status window
.winner {
    color: firebrick;
}
</style>
