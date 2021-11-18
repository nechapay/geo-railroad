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

.svg-container {
  border: 1px solid black;
}
.station {
  fill: #faa;
  stroke: black;
  stroke-width: 1;
  cursor: pointer;
  transition-duration: 0.2s;
}

.station:hover {
  fill: #afa;
}

.road {
  stroke: black;
  stroke-width: 5;
}

.station-border {
  stroke-opacity: 0.3;
  fill: none;
  stroke: grey;
}

.sub-station__circle {
  fill: #faa;
  stroke: black;
  stroke-width: 1;
  cursor: pointer;
  transition-duration: 0.2s;
}

.sub-station__text {
  font-size: 15px;
  transform: translateY(4.6px);
}

.sub-station__line {
  stroke: black;
  stroke-width: 1;
}
</style>
