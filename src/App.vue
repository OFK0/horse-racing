<template>
  <div class="app-root">
    <div class="grass-tile-background">
      <GameSky />
      <GameView />
      <HorizontalDirectionIndicator />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameSky from './components/GameSky/index.vue';
import GameView from './components/GameView/index.vue';
import HorizontalDirectionIndicator from './components/HorizontalDirectionIndicator/index.vue';
</script>

<style scoped lang="scss">
.app-root {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;

  @include xxl {
    min-height: 100vh;
  }
}

.grass-tile-background {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: rgb(56 186 67);
  background-image: url('/images/grass_tile_128.png');
  background-size: 32px;
  background-repeat: repeat;
  image-rendering: pixelated;
}
</style>
