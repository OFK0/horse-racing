<template>
  <div class="app-root">
    <div class="grass-tile-background">
      <GameSky />
      <GameView />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameSky from './components/GameSky/index.vue';
import GameView from './components/GameView/index.vue';
</script>

<style scoped lang="scss">
.app-root {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.grass-tile-background {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(56 186 67);
  background-image: url('/images/grass_tile_128.png');
  background-size: 32px;
  background-repeat: repeat;
  image-rendering: pixelated;
}
</style>
