<template>
  <div class="star-page fill">
    <span class="start-page__title">{{ title }} </span>
    <button class="start-page__button" @click="handleStart">Начать</button>
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
  align-items: flex-start;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-repeat: no-repeat;
  background-image: url('/img/start-bg.jpg');
  background-size: cover;
}

.start-page__title {
  margin-top: 5%;
}

.start-page__button {
  padding: 15px 30px;
}
</style>