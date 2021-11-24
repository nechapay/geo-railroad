<template>
  <div class="start-page fill">
    <span class="start-page__title">{{ title }} </span>

    <button class="start-page__button btn" @click="handleStart">Начать</button>
  </div>
</template>

<script>
export default {
  props: ['title'],
  methods: {
    handleStart() {
      this.$emit('start')
    }
  }
}
</script>

<style scoped>
.start-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-repeat: no-repeat;
  background-image: url('/img/start-bg.jpg');
  background-size: cover;
}

.start-page__title {
  margin: 10%;
  color: white;
  font-size: 650%;
  filter: drop-shadow(1px 1px 2px black);
  font-weight: bolder;
  color: #d5ad6d;
}

.start-page__button {
  padding: 15px 30px;
  font-size: 200%;
}
</style>