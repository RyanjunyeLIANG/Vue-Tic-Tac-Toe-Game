<template>
    <div id="app">
        <div>
            <!--- Player names input  --->
            <div v-show="entryShow" class="table2">
                <div class="alert alert-info" v-show="errorShow">{{ error }}</div>
                <input type="text" class="form-control" maxlength="10" v-model="player1[0]" placeholder="player1's Name">
                <p></p>
                <input type="text" class="form-control" maxlength="10" v-model="player2[0]" placeholder="player2's Name">
                <p></p>
            </div>
            <div>
            </div>
        </div>      
        <a class="bttn2" v-on:click="checkInput" v-show="buttonShow">Start</a>   <!--- Start button  --->  
        <div v-show="componentShow">
            <div class="table1">    <!--- Table of players' information  --->  
                <table>
                    <tr>
                        <th>
                            <tr :class="player1Background">Player1</tr>
                            <tr class="player" :class="player1Background"> {{ player1[0] }} </tr>
                        </th>
                        <th>
                            <tr :class="player1Background">Symbol</tr>
                            <tr class="player" :class="player1Background">{{ player1[1] }}</tr>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <tr :class="player2Background">Player2</tr>
                            <tr class="player" :class="player2Background"> {{ player2[0] }} </tr>
                        </th>
                        <th>
                            <tr :class="player2Background">Symbol</tr>
                            <tr class="player" :class="player2Background">{{ player2[1] }}</tr>
                        </th>
                    </tr>
                </table>
            </div>
            <div class="gameStatus" :class="gameStatusColor">   <!--- Game Status window  --->  
                {{ gameStatusMessage }}
            </div>
            <!--- Board grid  --->  
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
        <div class="flex" v-show="gridShow">    <!--- Restart button --->  
            <a v-on:click="restart" class="bttn1">Restart</a>
        </div>
    </div>
</template>

<script>
import Cell from './Cell.vue'

export default {
    name: 'Multiplayer',
    components: { Cell },
    data() {
        return {
            error: '',
            errorShow: false,
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
            player1Background: 'highLight',
            player2Background: '',
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
        //OtherPlayer value support function for changePlayer()
        otherPlayer: function() {
            if(this.actPlayer === 'O') {
                return 'X'
            }
            return 'O'
        },
    },

    methods: {
        //Input check function
        checkInput: function() {
            if(this.player1[0] && this.player2[0]) {
                this.gameStart()
            }
            if(this.player2[0] && !this.player1[0]) {
                this.error = 'Please enter a name for Player 1'
                this.errorShow = true
            }
            if(this.player1[0] && !this.player2[0]) {
                this.error = 'Please enter a name for Player 2'
                this.errorShow = true
            }
            if(!this.player1[0] && !this.player2[0]) {
                this.error = 'Please name for both Players'
                this.errorShow = true
            }
        },

        //game Start trigger function
        gameStart: function() {
            this.buttonShow = false
            this.componentShow = true
            this.entryShow = false
            this.gridShow = true
            this.gameStatus = 'onGoing'
            this.shapeSelect()
            this.verifyPlayer()
        },

        //Player verification
        verifyPlayer: function() {
            if(this.actPlayer === this.player1[1]) {
                this.actName = this.player1[0]
            }
            else {
                this.actName = this.player2[0]
            }
            this.gameStatusMessage = `${this.actName}'s turn`
        },

        //Random shape arragement function
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

        //Check the winner and win condition
        checkWinner: function() {
            if(this.moves >= 9) {
                this.gameStatus = 'Draw'
                this.gameStatusMessage = `It's a Draw!`
                Event.$emit('lockCells') //Lockcells event fire to trigger each cells components to call functions, event listen at Cell.vue
            }

            //Win condition check
            this.winConditions.forEach((wc) => {
                const [a,b,c] = wc;
                const cellA = this.cells[a];
                const cellB = this.cells[b];
                const cellC = this.cells[c];

                if(cellA && cellA === cellB && cellA === cellC) {
                    this.gameStatus = 'Completed'
                        this.gameStatusMessage = `${this.actName} win!`
                    Event.$emit('lockCells')
                }
            })
        },

        //change active player after clicked
        changePlayer: function() {
            if(this.gameStatus === 'onGoing') {
                this.actPlayer = this.otherPlayer
                this.verifyPlayer()
            }
        },

        //Reset the reletive data of the board for new game
        boardReset: function() {
            this.actPlayer = 'O'
            this.gameStatus = 'onGoing',
            this.gameStatusColor = '',
            this.gameStatusMessage = `${this.actName}'s turn` 
            this.moves = 0,
            this.cells = {
                1: '', 2: '', 3: '',
                4: '', 5: '', 6: '',
                7: '', 8: '', 9: ''
            }
        },

        //Restart button click trigger function
        restart: function() {
            this.boardReset()
            Event.$emit('clearCells')
        },
    },

    //Watch data change to perform certain changes
    watch: {
        //Watch gameStatus's value change to change the status window background color
        gameStatus: function() {
            if(this.gameStatus === 'Completed') {
                this.gameStatusColor = 'winner'
            }
        },

        //Watch actPlayer's value change to change the color of the player's information
        actPlayer: function() {
            if(this.actPlayer === this.player1[1]) {
                this.player1Background = 'highLight'
                this.player2Background = ''
            }
            else {
                this.player2Background = 'highLight'
                this.player1Background = ''
            }
        },
    },

    //Initial the event to constantly listen "hit" event from Cell.vue
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
    vertical-align: middle;
    width: 100%;
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
    color:#2c3e50
}

//Status window text color change
.winner {
    color: firebrick;
}

//Player information text color change
.highLight {
    text-decoration: underline red;
    color: red;
}
</style>