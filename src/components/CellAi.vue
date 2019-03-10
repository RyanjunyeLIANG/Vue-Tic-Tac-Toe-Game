<template>
    <td class="cell" v-on:click="hitAi">{{ mark }}</td>
</template>

<script>
  export default {
    props: ['name'],
    data() {
      return {
        cellLocked: false,
        mark: '',
      }
    },
    methods: {
      hitAi() {
        if(!this.cellLocked) {
          this.mark = this.$parent.actPlayer
            this.cellLocked = true

          Event.$emit('hitAi', this.name)
        }
      }
    },

    created() {
      Event.$on('clearCellsAi', () => {
        this.cellLocked = false
        this.mark = ''
      })

      Event.$on('lockCellsAi', () => {
        this.cellLocked = true
      })
    },

  }
</script>

<style>
.cell {
  width: 33.333%;
  height: 90px;
  border: 6px solid #2c3e50;
  font-size: 3.5em;
  font-family: 'Gochi Hand', sans-serif;
}

.cell:hover {
    background-color: #7f8c8d;
}

.cell::after {
  content: '';
  display: block;
}

.cell:first-of-type {
  border-left-color: transparent;
  border-top-color: transparent;
}

.cell:nth-of-type(2) {
  border-top-color: transparent;
}

.cell:nth-of-type(3) {
  border-right-color: transparent;
  border-top-color: transparent;
}

tr:nth-of-type(3) .cell {
  border-bottom-color: transparent;
}
</style>
