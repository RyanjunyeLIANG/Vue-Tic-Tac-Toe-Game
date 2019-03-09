<template>
    <div>
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
</template>

<script>
import Cell from './Cell.vue';

export default {
    name: 'Grid',
    components: { Cell },
    data() {
        return {
            player1Name: 'Player1',
            player2Name: 'Player2',
            actPlayer: 'O',
            gameStatus: 'onGoing',
            gameStatusColor: '',
            gameStatusMessage: `It's O's turn.`,
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
        }
    },

    methods: {
        changePlayer: function() {
            this.actPlayer = this.otherPlayer
            this.gameStatusMessage = `It's ${this.actPlayer}'s turn`
        },

        checkWinner: function() {
            if(this.moves >= 9) {
                this.gameStatus = 'Draw'
                this.gameStatusMessage = `It's a Draw!`
                Event.$emit('lockCells')
            }

            this.winConditions.forEach((wc) => {
                const [a,b,c] = wc;
                const cA = this.cells[a];
                const cB = this.cells[b];
                const cC = this.cells[c];

                if(cA && cA === cB && cA === cC) {
                    this.gameStatus = 'Completed'
                    Event.$emit('lockCells')
                }
            })
        },
    },

    watch: {
        gameStatus: function() {
            if(this.gameStatus === 'Completed') {
                this.gameStatusColor = 'winner'
                this.gameStatusMessage = `${this.actPlayer} player win!`
            }
        }    
    },

    created() {
        Event.$on('hit', (cellNumber) => {
            this.cells[cellNumber] = this.actPlayer
            this.moves++
            this.changePlayer()
            this.checkWinner()
        })

        Event.$on('boardReset', () => {
            this.actPlayer = 'O'
            this.gameStatus = 'onGoing',
            this.gameStatusMessage = `It's O's turn.`,
            this.gameStatusColor = '',
            this.moves = 0,
            this.cells = {
                1: '', 2: '', 3: '',
                4: '', 5: '', 6: '',
                7: '', 8: '', 9: ''
            }
        })
    },
}
</script>


<style>
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