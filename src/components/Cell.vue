<template>
    <td class="cell" v-on:click="hit">{{ mark }}</td>
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
      hit() {
        if(!this.cellLocked) {
          this.mark = this.$parent.actPlayer
            this.cellLocked = true

          Event.$emit('hit', this.name)
        }
      }
    },

    created() {
      Event.$on('clearCells', () => {
        this.cellLocked = false
        this.mark = ''
      })

      Event.$on('lockCells', () => {
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
