<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      origin: '',
      desination: '',
      date: null,
      results: []
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #fafafa;
  font-family: 'Montserrat', sans-serif;
}
.display-1,
.title,
.headline,
.subheading,
.body-2,
.body-1,
.display-2 {
  font-family: 'Montserrat', sans-serif !important;
}
</style>
