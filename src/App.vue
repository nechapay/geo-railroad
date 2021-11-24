<template>
  <div id="app" class="content-container fill">
    <transition name="fade-start">
      <start-page @start="handleStart" v-show="!started && !ended" :title="title" />
    </transition>
    <transition name="fade-start">
      <rail-map v-show="started" @end="handleEnd" />
    </transition>
    <transition name="fade-start">
      <end-page v-show="ended" :score="score" />
    </transition>
    <copyright />
  </div>
</template>

<script>
import Copyright from './components/Copyright.vue'
import EndPage from './components/EndPage.vue'
import RailMap from './components/RailMap.vue'
import StartPage from './components/StartPage.vue'
export default {
  name: 'App',
  components: { RailMap, Copyright, StartPage, EndPage },
  data() {
    return {
      started: false,
      ended: false,
      title: 'ИГРА - ПОБЕДА',
      score: 0
    }
  },
  methods: {
    handleStart() {
      this.started = true
    },
    handleEnd(score) {
      this.score = score
      this.ended = true
    }
  }
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

.fade-start-enter-active,
.fade-start-leave-active {
  transition: opacity 1s;
}
.fade-start-enter, .fade-start-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  font-size: 300%;
  color: black;
}

.dialog__content {
  height: 90%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.dialog__content--text {
  width: 60%;
  height: 100%;
  font-size: 130%;
  text-align: justify;
  text-indent: 5%;
  padding: 1%;
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

.dialog__content--wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 1%;
}

.dialog__content--wrapper-img {
  width: 100%;
  height: 80%;
}

.dialog__content--wrapper-img img {
  max-width: 100%;
  max-height: 100%;
}

.dialog__content--wrapper-text {
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

.dialog__content--info {
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog__content--btns-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.btn {
  padding: 10px 20px;
  background: linear-gradient(to bottom, #87e0fd 0%, #53cbf1 40%, #05abe0 100%);
  font-size: 110%;
  border: 1px solid black;
  color: black;
  cursor: pointer;
  transition-duration: 0.2s;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.76);
}

.btn:hover {
  background: linear-gradient(to bottom, #f0f9ff 0%, #cbebff 47%, #a1dbff 100%);
  border: 1px solid black;
  color: black;
  box-shadow: none;
}
.btn:active {
  box-shadow: none;
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

.final-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.final-text {
  text-align: center;
  margin-bottom: 3%;
}

.final-images {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  height: 90%;
  width: 100%;
  padding: 2%;
}

.image-wrapper {
  width: 46%;
  height: 46%;
  margin: 1%;
}

.image-wrapper img {
  max-height: 100%;
  max-width: 100%;
}
</style>
