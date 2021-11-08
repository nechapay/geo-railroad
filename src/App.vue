<template>
  <div id="app" class="content-container fill">
    <rail-map />
  </div>
</template>

<script>
import RailMap from './components/RailMap.vue'
export default {
  name: 'App',
  components: { RailMap }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
}

.fill {
  width: 100%;
  height: 100%;
}
</style>
