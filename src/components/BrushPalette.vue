<script setup>
import { ref } from 'vue';

const palette = ref([
  { id: 0, color: '#eee' },
  { id: 1, color: '#d6e685' },
  { id: 2, color: '#8cc665' },
  { id: 3, color: '#44a340' },
  { id: 4, color: '#1e6823' },
]);

const brush = defineModel();
</script>
<template>
  <label class="radio-container mx-1" v-for="item in palette" :key="item.id">
    <input
      type="radio"
      v-model="brush"
      :value="item"
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
