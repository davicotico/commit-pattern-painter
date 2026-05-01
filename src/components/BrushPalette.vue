<script setup>
import { computed } from 'vue';
import { greenLight, greenDark } from '@/data/palettes';
import { useDark } from '@vueuse/core';

const isDark = useDark({
  selector: 'html',
  attribute: 'data-bs-theme',
  valueDark: 'dark',
  valueLight: 'light',
});

const palette = computed(() => (isDark.value ? greenDark : greenLight));
const brushId = defineModel();
</script>
<template>
  <label class="radio-container mx-1" v-for="item in palette" :key="item.id">
    <input
      type="radio"
      v-model="brushId"
      :value="item.id"
      class="custom-radio"
      :style="{ backgroundColor: item.color }"
    />
  </label>
</template>
<style scoped>
.custom-radio {
  appearance: none;
  -webkit-appearance: none;
  width: 50px;
  height: 50px;
  border: 2px solid #ccc;
  /*border-radius: 50%; */
  position: relative;
  cursor: pointer;
  transition: 0.3s;
  vertical-align: middle;
}

.custom-radio:checked {
  border-color: #29d;
}

.custom-radio::after {
  content: '✓';
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 12px;
  color: white;
  background-color: #29d;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: scale(0);
  transition: 0.3s;
}

.custom-radio:checked::after {
  opacity: 1;
  transform: scale(1);
}
</style>
