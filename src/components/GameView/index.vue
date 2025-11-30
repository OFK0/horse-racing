<template>
  <div class="game-view">
    <RunnerLane
      v-for="(horse, index) in getLanesOrHorses"
      :key="horse.id"
      :number="index + 1"
      :color="horse.color"
    >
      <HorseRider :elapsed="horse.elapsed" />
    </RunnerLane>
    <div class="current-lap-indicator">
      {{ $t('common.lap') }}: {{ gameStore.currentRoundIndex + 1 }}
    </div>
    <div class="horse-list-outer">
      <HorseList />
    </div>
    <div class="program-side-outer">
      <BaseButton
        block
        class="program-side-outer__button"
        variant="primary"
        :active="showingTable === 'program'"
        @click="showingTable = 'program'"
        >{{ $t('common.program') }}</BaseButton
      >

      <ProgramTable v-show="showingTable === 'program'" />

      <BaseButton
        block
        class="program-side-outer__button"
        variant="primary"
        :active="showingTable === 'results'"
        @click="showingTable = 'results'"
        >{{ $t('common.live-results') }}</BaseButton
      >

      <ProgramResults v-show="showingTable === 'results'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RunnerLane from '../RunnerLane/index.vue';
import HorseList from '../HorseList/index.vue';
import HorseRider from '../HorseRider/index.vue';
import ProgramResults from '../ProgramResults/index.vue';
import ProgramTable from '../ProgramTable/index.vue';
import BaseButton from '../BaseButton/index.vue';
import { useGameStore } from '@/stores/game';
import { computed, ref } from 'vue';

defineOptions({
  name: 'GameView',
});

const showingTable = ref<'program' | 'results'>('program');

const gameStore = useGameStore();

const getLanesOrHorses = computed(() => {
  return gameStore.inGameHorses.length > 0
    ? gameStore.inGameHorses
    : Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        elapsed: 0,
        color: '#fff',
      }));
});
</script>

<style scoped lang="scss">
.game-view {
  position: relative;
  z-index: 99;
  width: 800px;
  height: 100%;
  margin: 0 auto;
  padding-top: 80px;
  padding-left: 24px;
}

.horse-list-outer {
  position: absolute;
  top: 80px;
  left: -320px;
}

.program-side-outer {
  position: absolute;
  top: 80px;
  right: -340px;

  &__button {
    margin: 20px 0;

    &:first-child {
      margin-top: 0;
    }
  }
}

.current-lap-indicator {
  margin-top: 10px;
  color: white;
  font-size: 24px;
}
</style>
