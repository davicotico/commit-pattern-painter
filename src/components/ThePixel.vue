<script setup>
import { onMounted, useTemplateRef } from 'vue';

const pixelRef = useTemplateRef('pixelRef');

const props = defineProps({
  brush: Object,
  isMouseDown: Boolean,
});

const emit = defineEmits(['painted']);

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
