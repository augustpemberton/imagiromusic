<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<style lang="scss">

#app {
  font-family: $sans-serif;
  color: $txt-primary;
  min-height: 100vh;
}

body {
  margin: 0px;
  font-family: $sans-serif;
  color: $primary;
  background: $background-color;
  -webkit-text-size-adjust: 100%; //fix for iOS
  min-height: 150vh;
}

.center {
  text-align: center;
}

</style>
