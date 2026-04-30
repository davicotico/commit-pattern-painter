<script setup>
import ThePixel from './ThePixel.vue';
defineProps({
  brush: Object,
  isMouseDown: Boolean,
});
defineEmits(['painted']);
</script>
<template>
  <ul>
    <the-pixel
      v-for="i in 7"
      :key="i"
      :brush="brush"
      :is-mouse-down="isMouseDown"
      @painted="$emit('painted')"
    ></the-pixel>
  </ul>
</template>
