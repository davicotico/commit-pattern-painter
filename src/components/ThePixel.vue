<script setup>
import { inject, watch } from 'vue';
import { onMounted, useTemplateRef } from 'vue';
import { indexedColors } from '@/data/palettes';

const isDark = inject('isDark');
const pixelRef = useTemplateRef('pixelRef');

const emit = defineEmits(['painted']);
const props = defineProps({
  brush: Object,
  isMouseDown: Boolean,
});

watch(isDark, () => {
  const colorId = getColorId();
  let mode = isDark.value ? 'dark' : 'light';
  pixelRef.value.style.backgroundColor = indexedColors[mode][colorId];
});

function getColorId() {
  return parseInt(pixelRef.value.dataset.brush || '0');
}

function handleMouseDown() {
  paintPixel();
}

function handleMouseOver() {
  if (props.isMouseDown) {
    paintPixel();
  }
}

function paintPixel() {
  if (pixelRef.value && props.brush) {
    pixelRef.value.style.backgroundColor = props.brush.color;
    pixelRef.value.dataset.brush = props.brush.id;
    emit('painted');
  }
}
onMounted(() => {
  /* let valor = { id: 4, color: '#1e6823' };
  pixelRef.value.style.backgroundColor = valor.color;
  pixelRef.value.dataset.brush = valor.id; */
});
</script>
<template>
  <li ref="pixelRef" class="pixel" @mousedown="handleMouseDown" @mouseover="handleMouseOver"></li>
</template>
