<template>
  <div
    :class="{
      'horse-rider': true,
      'horse-rider--running':
        gameStore.isGameStarted && !gameStore.isGameStopped,
    }"
    :style="{
      transform: `translateX(${calculatedXinPx}px) scale(0.5)`,
    }"
    :data-elapsed="props.elapsed"
  ></div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { computed } from 'vue';

defineOptions({
  name: 'HorseRider',
});

const props = defineProps<{
  elapsed: number;
}>();

const gameStore = useGameStore();

const calculatedXinPx = computed(() => {
  if (!gameStore.isGameStarted) {
    return 0;
  }

  const runnerLaneWidth =
    document.querySelector('.runner-lane')?.clientWidth || 0;

  const currentRoundLength = gameStore.getCurrentRoundLength();

  return (props.elapsed * (runnerLaneWidth - 50)) / currentRoundLength;
});
</script>

<style scoped lang="scss">
.horse-rider {
  width: 128px;
  height: 148px;
  z-index: 11;
  background-image: url('/images/sprite-jockey-36.png');
  background-position: -389px 0px;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  transform-origin: left center;
  transform: scale(0.5);

  &--running {
    transition: transform 0.1s linear;
    opacity: 1;
    background-position-y: 0px;
    animation: playX 0.5s steps(6) infinite;
  }
}

@keyframes playX {
  from {
    background-position-x: 0px;
  }
  to {
    background-position-x: -764px;
  }
}
</style>
