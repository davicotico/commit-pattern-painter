<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ColumnPixel from './ColumnPixel.vue';
import { useDark } from '@vueuse/core';

const isDark = useDark({
  selector: 'html',
  attribute: 'data-bs-theme',
  valueDark: 'dark',
  valueLight: 'light',
});

defineEmits(['painted']);
defineProps({
  brush: Object,
});
const isMouseDown = ref(false);

onMounted(() => {
  document.addEventListener('mousedown', handleGlobalMouseDown);
  document.addEventListener('mouseup', handleGlobalMouseUp);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleGlobalMouseDown);
  document.removeEventListener('mouseup', handleGlobalMouseUp);
});

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
