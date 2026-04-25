<script setup>
import ThePixel from './ThePixel.vue';
defineProps({
  modelBrush: Object,
  isMouseDown: Boolean,
});
defineEmits(['painted']);
</script>
<template>
  <ul>
    <the-pixel
      v-for="i in 7"
      :key="i"
      :model-brush="modelBrush"
      :is-mouse-down="isMouseDown"
      @painted="$emit('painted')"
    ></the-pixel>
  </ul>
</template>
