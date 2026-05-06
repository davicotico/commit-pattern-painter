<script setup>
import { ref, onMounted, onUnmounted, provide, watchEffect } from 'vue';
import ThePixel from './ThePixel.vue';
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

defineExpose({ loadData });

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

const pixelElements = {};
function setPixelRef(key, component) {
  if (component && component.pixelRef) {
    pixelElements[key] = component.pixelRef.value || component.pixelRef;
  }
}

function loadData(data) {
  if (!data.length) {
    console.error('data is not an array');
    return;
  }
  for (let i = 0; i < 45; i++) {
    for (let j = 0; j < 7; j++) {
      const el = pixelElements[`${i}_${j}`];
      if (el) {
        const br = getBrushById(data[j][i]);
        el.style.backgroundColor = br.color;
        el.dataset.brush = br.id;
      }
    }
  }
}
function getBrushById(id) {
  const modo = isDark.value ? 'dark' : 'light';
  return {
    id,
    color: indexedColors[modo][id],
  };
}
</script>
<template>
  <div id="square-canva" class="commits-canva" :class="{ dark: isDark }">
    <ul>
      <li v-for="(_, i) in 45" :key="i">
        <ul>
          <the-pixel
            :ref="(el) => setPixelRef(`${i}_${j}`, el)"
            v-for="(_j, j) in 7"
            :key="j"
            :brush="brush"
            :is-mouse-down="isMouseDown"
            @painted="$emit('painted')"
          ></the-pixel>
        </ul>
      </li>
    </ul>
  </div>
</template>
