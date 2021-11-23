<template>
  <div id="app" class="content-container fill">
    <rail-map />
    <copyright />
  </div>
</template>

<script>
import Copyright from './components/Copyright.vue'
import RailMap from './components/RailMap.vue'
export default {
  name: 'App',
  components: { RailMap, Copyright }
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

@font-face {
  font-family: 'DINPro';
  src: url('/fonts/DINPro.ttf');
}

#app {
  font-family: DINPro, Avenir, Helvetica, Arial, sans-serif;
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
  background-repeat: no-repeat;
  background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.9)), url('/img/bg.jpg');
  background-size: cover;
}

.fill {
  width: 100%;
  height: 100%;
}

.svg-container {
  border: 1px solid black;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.733);
  margin-top: 5%;
  height: 600px;
  /* background-repeat: no-repeat;
  background-image: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5)), url('/img/map-bg.jpg');
  background-size: cover; */
}
.station {
  fill: #faa;
  stroke: url(#mainGradient);
  stroke-width: 0.5;
  cursor: pointer;
  transition-duration: 0.2s;
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
}

.station.disabled {
  fill: grey;
  cursor: default;
}

.station.completed {
  cursor: default;
}

.station:hover {
  fill: #afa;
}

.station.disabled:hover {
  fill: grey;
}

.road {
  stroke: url(#mainGradient);
  stroke-width: 5;
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
}

.station-border {
  stroke-opacity: 0.3;
  fill: none;
  stroke: grey;
}

.sub-station {
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
}

.sub-station__circle {
  fill: url(#mainGradient);
  stroke: black;
  stroke-width: 0.2;
  cursor: pointer;
  transition-duration: 0.2s;
}

.sub-station:hover .sub-station__circle {
  stroke: red;
}

.sub-station__text {
  font-size: 15px;
  cursor: pointer;
  transform: translateY(4.6px);
}

.sub-station__line {
  stroke: black;
  stroke-width: 1;
}

.dialog__container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.61);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.dialog__wrapper {
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 3px;
}

.dialog__header {
  height: 20%;
  width: 100%;
}

.dialog__content {
  height: 80%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.dialog__content--text {
  width: 60%;
  height: 100%;
}

.dialog__content--img {
  width: 60%;
  height: 100%;
  padding: 1%;
}
.dialog__content--img img {
  border-radius: 1%;
  max-width: 100%;
  max-height: 100%;
}

.dialog__content--wraper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 1%;
}

.dialog__content--wraper-img {
  width: 100%;
  height: 80%;
}

.dialog__content--wraper-img img {
  max-width: 100%;
  max-height: 100%;
}

.dialog__content--wraper-text {
  width: 100%;
  height: 20%;
  text-align: left;
  text-indent: 20px;
  padding: 1%;
}

.dialog__content--controls {
  width: 40%;
  height: 100%;
  display: flex;
  padding: 1%;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

.btn {
  padding: 10px 20px;
  background: rgb(84, 84, 238);
  border: 1px solid black;
  color: white;
  cursor: pointer;
  transition-duration: 0.2s;
  align-self: flex-end;
}

.btn:hover {
  background: #afa;
  color: black;
}

.radio-group {
  display: flex;
  flex-direction: column;
  padding: 1%;
  border: 1px solid black;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 1%;
}

.stop-left {
  stop-color: rgba(45, 197, 83, 0.8);
}

.stop-right {
  stop-color: rgb(138, 240, 135);
}

#node_0 {
  fill: url(#imageStar);
}

#node_1 {
  fill: url(#imageFluger);
}

#node_1.disabled {
  fill: url(#imageFluger2);
}

#node_2 {
  fill: url(#imageCompas);
}

#node_2.disabled {
  fill: url(#imageCompas2);
}

#node_3 {
  fill: url(#imageShip);
}

#node_3.disabled {
  fill: url(#imageShip2);
}

#node_4 {
  fill: url(#imageRubeg);
}

#node_4.disabled {
  fill: url(#imageRubeg2);
}

#node_5 {
  fill: url(#imageRama);
}

#node_5.disabled {
  fill: url(#imageRama2);
}
</style>
