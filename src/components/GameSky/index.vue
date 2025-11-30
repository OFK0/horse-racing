<template>
  <div class="sky-tile-background">
    <div class="sky-tile-background__bottom-gradient"></div>
    <div class="sky-tile-background__header-outer">
      <GameHeader />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameHeader from '@/components/GameHeader/index.vue';

defineOptions({
  name: 'GameSky',
});
</script>

<style scoped lang="scss">
.sky-tile-background {
  position: relative;
  height: 240px;
  width: 100%;
  background-color: #87ceeb;
  background-image: url('/images/sky.webp');
  background-position: bottom;
  background-repeat: repeat;
  image-rendering: pixelated;
  flex-shrink: 0;

  &__bottom-gradient {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(
      to bottom,
      rgba(135, 206, 235, 0) 0%,
      rgb(56 186 67) 100%
    );
    background-size: 32px;
  }

  &__header-outer {
    position: absolute;
    bottom: -12px;
    width: 100%;
  }
}
</style>
