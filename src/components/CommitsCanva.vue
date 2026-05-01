<script setup>
import { ref, onMounted, onUnmounted, provide, watchEffect } from 'vue';
import ColumnPixel from './ColumnPixel.vue';
import { useDark } from '@vueuse/core';
import { indexedColors } from '@/data/palettes';

const isDark = useDark({
  selector: 'html',
  attribute: 'data-bs-theme',
  valueDark: 'dark',
  valueLight: 'light',
});

provide('isDark', isDark);

defineEmits(['painted']);
const props = defineProps({
  brushId: Number,
});
const isMouseDown = ref(false);
const brush = ref();

watchEffect(() => {
  brush.value = getBrush();
});

onMounted(() => {
  brush.value = getBrush();
  document.addEventListener('mousedown', handleGlobalMouseDown);
  document.addEventListener('mouseup', handleGlobalMouseUp);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleGlobalMouseDown);
  document.removeEventListener('mouseup', handleGlobalMouseUp);
});

function getBrush() {
  const modo = isDark.value ? 'dark' : 'light';
  return {
    id: props.brushId,
    color: indexedColors[modo][props.brushId],
  };
}

function handleGlobalMouseDown() {
  isMouseDown.value = true;
}

function handleGlobalMouseUp() {
  isMouseDown.value = false;
}
</script>
<template>
  <div id="square-canva" class="commits-canva" :class="{ dark: isDark }">
    <ul>
      <li v-for="i in 45" :key="i">
        <column-pixel :brush="brush" :is-mouse-down="isMouseDown" @painted="$emit('painted')" />
      </li>
    </ul>
  </div>
</template>
