<template>
  <div id="app">
    <div id="input">
      <h1>Wiki Text</h1>
      <textarea v-model="input"></textarea>
    </div>
    <div id="output">
      <h1>Markdown</h1>
      <textarea>{{ output }}</textarea>
    </div>
  </div>
</template>

<script>
  const wiki2md = require('wikitext2markdown');

  export default {
    name: 'app',
    data() {
      return {
        input: '',
      };
    },
    computed: {
      output() {
        return wiki2md(this.input);
      },
    },
  };
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: inline-flex;
  }

  #input {
    width: 50vw;
    height: 100vh;
  }

  #output {
    width: 50vw;
    height: 100vh;
  }

  textarea {
    height: calc(100vh - 9em);
    width: 99%;
  }

  h1 {
    text-align: center;
  }
</style>
