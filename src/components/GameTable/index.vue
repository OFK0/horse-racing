<template>
  <div class="game-table-outer" :style="{ height: `${outerHeight}px` }">
    <table class="game-table">
      <thead class="game-table__header">
        <tr>
          <th
            v-for="column in props.columns"
            :key="column.key"
            :style="
              column.width ? { width: getColumnWidth(column.width) } : undefined
            "
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in props.data" :key="rowIndex">
          <td
            v-for="column in props.columns"
            :key="column.key"
            v-html="row[column.key]"
            :style="{
              ...(column.centered ? { textAlign: 'center' } : {}),
            }"
          ></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'GameTable',
});

export interface Column {
  key: string;
  label: string;
  width?: string | number;
  centered?: boolean;
}

export interface Data {
  [key: string]: string | number | null;
}

const props = withDefaults(
  defineProps<{
    columns: Array<Column>;
    data: Array<Data>;
    outerHeight?: number | string;
  }>(),
  {
    outerHeight: 400,
  },
);

const getColumnWidth = (width: string | number) => {
  return typeof width === 'number' ? `${width}px` : width;
};
</script>

<style scoped lang="scss">
.game-table-outer {
  position: relative;
  height: 400px;
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
}

.game-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: var(--color-brown-dark);

  &__header {
    position: sticky;
    top: 0;
    z-index: 2;
  }

  th,
  td {
    border: 1px solid var(--color-brown-dark);
    background-color: var(--color-brown);
    padding: 6px;
    font-weight: normal;
    font-size: 16px;
  }

  th {
    background-color: var(--color-brown-dark);
    color: white;
  }
}
</style>
