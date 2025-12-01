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
    <div
      :class="{
        'horse-list-outer': true,
        'horse-list-outer--show-mobile': showHorseListMobile,
      }"
    >
      <div class="horse-list-outer__inner">
        <div class="horse-list-outer__inner__toggle-button-outer">
          <BaseButton
            variant="secondary"
            :active="showHorseListMobile"
            @click="showHorseListMobile = !showHorseListMobile"
            >{{ $t('horse-list.title') }}</BaseButton
          >
        </div>
        <HorseList />
      </div>
    </div>
    <div
      :class="{
        'program-side-outer': true,
        'program-side-outer--show-mobile': showProgramTableMobile,
      }"
    >
      <div class="program-side-outer__inner">
        <div class="program-side-outer__inner__toggle-button-outer">
          <BaseButton
            variant="secondary"
            :active="showProgramTableMobile"
            @click="showProgramTableMobile = !showProgramTableMobile"
            >{{ $t('common.program') }}</BaseButton
          >
        </div>

        <BaseButton
          block
          class="program-side-outer__button"
          variant="primary"
          :active="showingTable === 'program'"
          @click="
            showingTable = showingTable === 'program' ? 'results' : 'program'
          "
          >{{ $t('common.program') }}</BaseButton
        >

        <ProgramTable v-show="showingTable === 'program'" />

        <BaseButton
          block
          class="program-side-outer__button"
          variant="primary"
          :active="showingTable === 'results'"
          @click="
            showingTable = showingTable === 'results' ? 'program' : 'results'
          "
          >{{ $t('common.live-results') }}</BaseButton
        >

        <ProgramResults v-show="showingTable === 'results'" />
      </div>
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
const showHorseListMobile = ref<boolean>(false);
const showProgramTableMobile = ref<boolean>(false);

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
  width: 90vw;
  height: 100%;
  margin: 0 auto;
  padding: 40px 10px 40px 10px;

  @include xxl {
    width: 800px;
    padding-top: 80px;
    padding-left: 0;
    padding-bottom: 0;
  }
}

.horse-list-outer {
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  transition: transform 0.2s ease;

  @include xxl {
    position: absolute;
    top: 80px;
    left: -320px;
    transform: translateX(0);
  }

  &--show-mobile {
    transform: translateX(0);
  }

  &__inner {
    position: relative;
    height: 100%;

    &__toggle-button-outer {
      position: absolute;
      top: 0;
      right: 0;
      transform: translateX(62%) translateY(180px) rotate(-90deg);

      @include xxl {
        display: none;
      }
    }
  }
}

.program-side-outer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  background-color: $brown;
  padding: 8px;
  height: 100vh;
  transform: translateX(100%);
  transition: transform 0.2s ease;

  @include xxl {
    position: absolute;
    top: 80px;
    right: -340px;
    background-color: transparent;
    padding: 0;
    transform: translateX(0);
  }

  &--show-mobile {
    transform: translateX(0);
  }

  &__inner {
    position: relative;
    height: 100%;

    &__toggle-button-outer {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateX(-75%) translateY(120px) rotate(-90deg);

      @include xxl {
        display: none;
      }
    }
  }

  &__button {
    margin: 20px 0;

    &:nth-child(2) {
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
