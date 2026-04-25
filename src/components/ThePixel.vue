<script setup>
import { useTemplateRef } from 'vue';

const pixelRef = useTemplateRef('pixelRef');

const props = defineProps({
  modelBrush: Object,
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
  if (pixelRef.value && props.modelBrush) {
    pixelRef.value.style.backgroundColor = props.modelBrush.color;
    pixelRef.value.dataset.brush = props.modelBrush.id;
    emit('painted');
  }
}
</script>
<template>
  <li ref="pixelRef" class="pixel" @mousedown="handleMouseDown" @mouseover="handleMouseOver"></li>
</template>
