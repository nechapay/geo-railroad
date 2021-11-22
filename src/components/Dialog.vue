<template>
  <div class="dialog__container fill">
    <div class="dialog__wrapper">
      <div class="dialog__header">
        <span>{{ head }}</span>
        <span v-show="resultVisible">{{ answer }}</span>
      </div>
      <div class="dialog__content">
        <div class="dialog__content--text" v-if="!isShowImage" v-html="question.title"></div>
        <div class="dialog__content--img" v-else>
          <img :src="image" />
        </div>
        <div class="dialog__content--controls">
          <div v-for="(answer, index) in question.answers" :key="index" class="radio-group">
            <label v-for="item in answer" :key="item.id">
              <input type="radio" :id="item.id" :value="item" v-model="selected[index]" @change="handleRadio" />
              {{ item.title }}
            </label>
          </div>
          <div class="btns-container">
            <button class="btn" @click="btnClick" v-show="isAnswerButtonVisible">Ответить</button>
            <button class="btn" @click="closeHandle" v-show="closeVisible">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: ['question', 'head'],
  data() {
    return {
      selected: [],
      result: false,
      ansBtnVisible: false,
      imgVisible: false,
      closeVisible: false,
      resultVisible: false
    }
  },
  computed: {
    isAnswerButtonVisible() {
      return this.ansBtnVisible
    },
    image() {
      return `img\\${this.question.img}`
    },
    isShowImage() {
      return this.imgVisible
    },
    answer() {
      return this.result ? 'Верно' : 'Неверно'
    },
    isCloseVisible() {
      return this.closeVisible
    }
  },
  methods: {
    btnClick() {
      this.ansBtnVisible = false
      this.result = this.selected[0].correct
      for (let i = 1; i < this.selected.length; i++) {
        this.result = this.result && this.selected[i].correct
      }
      if (!_.isNil(this.question.img)) {
        this.imgVisible = true
      }
      this.resultVisible = true
      setTimeout(() => {
        this.closeVisible = true
      }, 1000)
    },
    closeHandle() {
      this.imgVisible = false
      this.closeVisible = false
      this.resultVisible = false
      this.selected = []
      this.$emit('close', this.result)
    },
    handleRadio() {
      if (this.selected.length === this.question.answers.length && !this.resultVisible) {
        this.ansBtnVisible = true
      }
    }
  }
}
</script>

<style scoped>
</style>