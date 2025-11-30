<template>
  <div class="program-table">
    <div
      v-if="gameStore.programTable.length === 0"
      class="program-table__message"
    >
      {{ $t('program-table.program-not-generated-yet') }}
    </div>
    <div
      class="program-table__lap"
      v-for="(result, resultIndex) in gameStore.programTable"
      :key="resultIndex"
    >
      <div class="program-table__lap__header">
        <span
          >{{ $t('common.lap') }} {{ resultIndex + 1 }}
          {{ gameStore.currentRoundIndex > resultIndex ? '✓' : '' }}</span
        >
        <span>{{ FIRST_ROUND_LENGTH + resultIndex * 200 }}m</span>
      </div>
      <GameTable
        :columns="[
          { key: 'position', label: $t('common.position'), width: 20 },
          { key: 'name', label: $t('common.name') },
        ]"
        :data="
          result
            .sort((a: Horse, b: Horse) => a.name.localeCompare(b.name))
            .map((horse: Horse, index: number) => ({
              position: String(index + 1),
              name: `<span class='color-bullet' style='background-color:${horse.color}'></span> ${horse.name}`,
            }))
        "
        outer-height="320"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore, FIRST_ROUND_LENGTH, type Horse } from '@/stores/game';
import GameTable from '@/components/GameTable/index.vue';

defineOptions({
  name: 'ProgramTable',
});

const gameStore = useGameStore();
</script>

<style lang="scss" scoped>
.program-table {
  width: 300px;
  height: 500px;
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
