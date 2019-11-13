<template>
  <div id="app">
    <!--<navbar />-->
    <router-view />
  </div>
</template>

<style lang="scss">

#app {
  font-family: $sans-serif;
  color: $txt-primary;
}

body {
  font-family: $sans-serif;
  color: $primary;
  background: $background-color;
  -webkit-text-size-adjust: 100%; //fix for iOS
}

.center {
  text-align: center;
}

</style>
