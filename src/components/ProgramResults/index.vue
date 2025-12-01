<template>
  <div class="program-results" ref="outerDivRef">
    <div
      v-if="gameStore.lapTables.length === 0"
      class="program-results__message"
    >
      {{ $t('lap-tables.game-not-started-yet') }}
    </div>
    <div
      class="program-results__lap"
      v-for="(result, resultIndex) in gameStore.lapTables"
      :key="resultIndex"
    >
      <div class="program-results__lap__header">
        <span>{{ $t('common.lap') }} {{ resultIndex + 1 }}</span>
        <span>{{ FIRST_ROUND_LENGTH + resultIndex * 200 }}m</span>
      </div>
      <GameTable
        :columns="[
          { key: 'position', label: $t('common.position'), width: 20 },
          { key: 'name', label: $t('common.name') },
          { key: 'time', label: $t('common.time'), width: 80 },
        ]"
        :data="
          result
            .sort((a: Horse, b: Horse) => {
              if (a.time === b.time) return b.elapsed - a.elapsed;
              return a.time - b.time;
            })
            .map((horse: Horse, index: number) => ({
              position: String(index + 1),
              name: `<span class='color-bullet' style='background-color:${horse.color}'></span> ${horse.name}`,
              time: Number(horse.time).toFixed(3),
            }))
        "
        outer-height="330"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore, FIRST_ROUND_LENGTH, type Horse } from '@/stores/game';
import GameTable from '@/components/GameTable/index.vue';
import { ref, watch } from 'vue';

defineOptions({
  name: 'ProgramResults',
});

const gameStore = useGameStore();
const outerDivRef = ref<HTMLDivElement | null>(null);

watch(
  () => gameStore.lapTables,
  () => {
    outerDivRef.value?.scrollTo(0, outerDivRef.value.scrollHeight);
  },
  { deep: true },
);
</script>

<style lang="scss" scoped>
.program-results {
  width: 300px;
  height: 374px;
  background-color: var(--color-brown);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-brown-dark);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-brown);
  }

  &__lap {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 20px;
      padding: 10px 10px;
      text-align: center;
      background-color: var(--color-gold);
      border-top: 2px solid var(--color-gold-light);
      border-left: 2px solid var(--color-gold-light);
      border-right: 2px solid var(--color-gold-dark);
      border-bottom: 2px solid var(--color-gold-dark);
    }
  }

  &__message {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
