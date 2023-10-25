<!--
 * @Copyright: 
 * @file name: File name
 * @Data: Do not edit
 * @LastEditor: 
 * @LastData: 
 * @Describe: 
-->

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
    flex-direction: column; 
    min-height: 100vh;
    width: 100vw;
}

html, body {
    height: 100vh;
    width: 100vw;
    margin: 0;
}

</style>