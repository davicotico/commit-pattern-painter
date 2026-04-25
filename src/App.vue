<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import BrushPalette from './components/BrushPalette.vue';
import ColumnPixel from './components/ColumnPixel.vue';

const modelBrush = ref({ id: 0, color: '#eee' });
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

function handlePixelPainted() {
  updateOutput();
}

function updateOutput() {
  let data = [[], [], [], [], [], [], []];
  let columns = document.querySelectorAll('#square-canva > ul > li');
  columns.forEach((col, x) => {
    let cells = col.querySelectorAll('.pixel');
    cells.forEach((cell, y) => {
      let brush = cell.dataset.brush || 0;
      data[y][x] = brush;
    });
  });
  updateOutput1(data);
  updateOutput2(data);
}
function updateOutput1(data) {
  document.getElementById('output1').value =
    '[[' + data.map((row) => row.join()).join('],\n[') + ']]';
}
function updateOutput2(data) {
  document.getElementById('output2').value = data.map((row) => row.join('')).join('\n');
}
</script>
<template>
  <div class="container">
    <div class="row my-2">
      <div class="col">
        <brush-palette v-model="modelBrush" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div id="square-canva" class="commits-canva">
          <ul>
            <li v-for="i in 45" :key="i">
              <column-pixel
                :model-brush="modelBrush"
                :is-mouse-down="isMouseDown"
                @painted="handlePixelPainted()"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <div class="card">
          <div class="card-header">Output 1</div>
          <div class="card-body p-1">
            <textarea id="output1" class="form-control w-100 textarea-output"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-2">
      <div class="col-8">
        <div class="card">
          <div class="card-header">Output 2</div>
          <div class="card-body p-1">
            <textarea id="output2" class="form-control w-100 textarea-output"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
