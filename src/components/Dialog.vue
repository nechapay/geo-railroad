<template>
  <div class="dialog__container fill">
    <div class="dialog__wrapper">
      <div class="dialog__header">
        <span class="dialog__header-text">{{ head }}</span>
      </div>
      <div class="dialog__content">
        <transition name="fade">
          <div class="dialog__content--text" v-if="!isShowImage" v-html="question.title"></div>
          <div class="dialog__content--img" v-else>
            <img :src="image" />
          </div>
        </transition>

        <div class="dialog__content--controls">
          <div v-for="(answer, index) in question.answers" :key="index" class="radio-group">
            <label v-for="item in answer" :key="item.id">
              <input type="radio" :id="item.id" :value="item" v-model="selected[index]" @change="handleRadio" />
              <span>{{ item.title }}</span>
            </label>
          </div>
          <div class="dialog__content--info">
            <transition name="fade">
              <span v-show="resultVisible" :class="style" class="dialog__result">{{ answer }}</span>
            </transition>
          </div>

          <div class="dialog__content--btns-container">
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
      resultVisible: false,
      style: {
        correct: false
      }
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
      this.style.correct = this.result
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
.dialog__header-text {
  width: 95%;
  border-bottom: 1px solid black;
}

.dialog__result {
  color: red;
  font-size: 200%;
}

.correct {
  color: green;
}

label {
  display: flex;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.375em;
}
label input {
  position: absolute;
  left: -9999px;
}
label input:checked + span {
  background-color: #d6d6e5;
}
label input:checked + span:before {
  box-shadow: inset 0 0 0 0.4375em #28b9e7;
}
label span {
  display: flex;
  align-items: center;
  padding: 0.375em 0.75em 0.375em 0.375em;
  border-radius: 99em;
  transition: 0.25s ease;
  font-size: 100%;
  text-align: left;
}
label span:hover {
  background-color: #d6d6e5;
}
label span:before {
  display: flex;
  flex-shrink: 0;
  content: '';
  background-color: #fff;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  margin-right: 0.375em;
  transition: 0.25s ease;
  box-shadow: inset 0 0 0 0.125em #28b9e7;
}
</style>