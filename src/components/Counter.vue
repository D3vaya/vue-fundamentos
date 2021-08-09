<template>
  <div>
    <h2>{{ cutsomTitle }}</h2>
    <p>{{ counter }} <sup>2</sup> = {{ getSquareCounter }}</p>
    <div>
      <button @click="increment">+1</button>
      <button @click="decrement">-1</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    start: {
      type: Number,
      default: 100,
      validator(value) {
        return value >= 0;
      },
    },
  },
  data() {
    return {
      counter: this.start,
    };
  },
  methods: {
    increment() {
      this.counter = this.counter + 1;
    },
    decrement() {
      this.counter = this.counter - 1;
    },

    getSquareValue() {
      console.log("getSquareValue");
      return this.counter * this.counter;
    },
  },
  computed: {
    getSquareCounter() {
      console.log("getSquareCounter");
      return this.counter * this.counter;
    },
    cutsomTitle() {
      return this.title || "Counter";
    },
  },
};
</script>
<style>
button {
  background-color: #63db87;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  border: none;
  margin: 0 5px;
  padding: 10px 15px;
  transition: 0.3s ease-in-out;
}
button:hover {
  background-color: #5aa67b;
  transition: 0.3s ease-in-out;
}
</style>
