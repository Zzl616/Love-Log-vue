
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

html, body {
    height: 100%;
    margin: 0;
}

</style>