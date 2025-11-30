import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GameTable from '../index.vue';
import type { Column, Data } from '../index.vue';

describe('GameTable', () => {
  const defaultColumns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
  ];

  const defaultData: Data[] = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
  ];

  it('renders table with correct structure', () => {
    const wrapper = mount(GameTable, {
      props: {
        columns: defaultColumns,
        data: defaultData,
      },
    });

    expect(wrapper.find('.game-table').exists()).toBe(true);
    expect(wrapper.find('.game-table__header').exists()).toBe(true);
    expect(wrapper.find('tbody').exists()).toBe(true);
  });

  it('renders all columns', () => {
    const wrapper = mount(GameTable, {
      props: {
        columns: defaultColumns,
        data: defaultData,
      },
    });

    const headers = wrapper.findAll('th');
    expect(headers).toHaveLength(2);
    expect(headers[0]?.text()).toBe('Name');
    expect(headers[1]?.text()).toBe('Age');
  });

  it('renders all rows', () => {
    const wrapper = mount(GameTable, {
      props: {
        columns: defaultColumns,
        data: defaultData,
      },
    });

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(2);
  });

  it('renders correct data in cells', () => {
    const wrapper = mount(GameTable, {
      props: {
        columns: defaultColumns,
        data: defaultData,
      },
    });

    const cells = wrapper.findAll('td');
    expect(cells[0]?.text()).toBe('John');
    expect(cells[1]?.text()).toBe('25');
    expect(cells[2]?.text()).toBe('Jane');
    expect(cells[3]?.text()).toBe('30');
  });

  it('applies outer height to container', () => {
    const wrapper = mount(GameTable, {
      props: {
        columns: defaultColumns,
        data: defaultData,
        outerHeight: 500,
      },
    });

    expect(wrapper.find('.game-table-outer').attributes('style')).toContain(
      'height: 500px',
    );
  });

  it('uses default outer height when not provided', () => {
    const wrapper = mount(GameTable, {
      props: {
        columns: defaultColumns,
        data: defaultData,
      },
    });

    expect(wrapper.find('.game-table-outer').attributes('style')).toContain(
      'height: 400px',
    );
  });

  it('applies custom width to columns', () => {
    const columns: Column[] = [
      { key: 'name', label: 'Name', width: 150 },
      { key: 'age', label: 'Age', width: '100px' },
    ];

    const wrapper = mount(GameTable, {
      props: {
        columns: columns,
        data: defaultData,
      },
    });

    const headers = wrapper.findAll('th');
    expect(headers[0]?.attributes('style')).toContain('width: 150px');
    expect(headers[1]?.attributes('style')).toContain('width: 100px');
  });

  it('applies centered style to columns marked as centered', () => {
    const columns: Column[] = [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age', centered: true },
    ];

    const wrapper = mount(GameTable, {
      props: {
        columns: columns,
        data: defaultData,
      },
    });

    const cells = wrapper.findAll('td');

    expect(cells[1]?.attributes('style')).toContain('text-align: center');
  });

  it('renders HTML content in cells with v-html', () => {
    const dataWithHtml: Data[] = [
      {
        name: '<span class="highlight">John</span>',
        age: 25,
      },
    ];

    const wrapper = mount(GameTable, {
      props: {
        columns: defaultColumns,
        data: dataWithHtml,
      },
    });

    expect(wrapper.find('.highlight').exists()).toBe(true);
    expect(wrapper.find('.highlight').text()).toBe('John');
  });

  it('handles empty data array', () => {
    const wrapper = mount(GameTable, {
      props: {
        columns: defaultColumns,
        data: [],
      },
    });

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(0);
  });

  it('handles multiple columns and rows', () => {
    const columns: Column[] = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'status', label: 'Status', centered: true },
    ];

    const data: Data[] = [
      { id: 1, name: 'John', email: 'john@example.com', status: 'Active' },
      { id: 2, name: 'Jane', email: 'jane@example.com', status: 'Inactive' },
      { id: 3, name: 'Bob', email: 'bob@example.com', status: 'Active' },
    ];

    const wrapper = mount(GameTable, {
      props: {
        columns: columns,
        data: data,
      },
    });

    expect(wrapper.findAll('th')).toHaveLength(4);
    expect(wrapper.findAll('tbody tr')).toHaveLength(3);
  });
});
