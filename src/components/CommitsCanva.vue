<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ColumnPixel from './ColumnPixel.vue';

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
  <div id="square-canva" class="commits-canva">
    <ul>
      <li v-for="i in 45" :key="i">
        <column-pixel :brush="brush" :is-mouse-down="isMouseDown" @painted="$emit('painted')" />
      </li>
    </ul>
  </div>
</template>
