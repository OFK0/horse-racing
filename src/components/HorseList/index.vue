<template>
  <div class="horse-list">
    <div class="horse-list__header">
      {{ $t('horse-list.title') }}
    </div>
    <GameTable
      :columns="[
        { key: 'name', label: $t('common.name') },
        { key: 'condition', label: $t('common.condition'), width: 20 },
        { key: 'color', label: $t('common.color'), width: 40, centered: true },
      ]"
      :data="
        gameStore.horses
          .sort((a: Horse, b: Horse) => b.condition - a.condition)
          .map((horse: Horse) => ({
            name: `${horse.name} ${gameStore.inGameHorses.some((h) => h.id === horse.id) ? '(P)' : ''}`,
            condition: horse.condition,
            color: `<span class='color-bullet' style='background-color:${horse.color}'></span>`,
          }))
      "
      outer-height="494"
    />
  </div>
</template>

<script setup lang="ts">
import { useGameStore, type Horse } from '@/stores/game';
import GameTable from '@/components/GameTable/index.vue';

defineOptions({
  name: 'HorseList',
});

const gameStore = useGameStore();
</script>

<style lang="scss" scoped>
.horse-list {
  width: 300px;
  z-index: 99;
  overflow: hidden;

  &__header {
    font-size: 24px;
    padding: 10px 0;
    text-align: center;
    background-color: var(--color-gold);
    border-top: 2px solid var(--color-gold-light);
    border-left: 2px solid var(--color-gold-light);
    border-right: 2px solid var(--color-gold-dark);
    border-bottom: 2px solid var(--color-gold-dark);
  }
}
</style>
