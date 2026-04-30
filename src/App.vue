<script setup>
import { ref } from 'vue';
import { useDark } from '@vueuse/core';
import BrushPalette from './components/BrushPalette.vue';
import CommitsCanva from './components/CommitsCanva.vue';

const isDark = useDark({
  selector: 'html',
  attribute: 'data-bs-theme',
  valueDark: 'dark',
  valueLight: 'light',
});
const selectedBrush = ref({ id: 0, color: '#eee' });

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
  <nav class="navbar navbar-expand-lg sticky-top border-bottom" :class="{ isDark: 'navbar-dark' }">
    <div class="container">
      <a class="navbar-brand" href="#">
        <strong>Commit Pattern Painter</strong>
      </a>
      <div class="ms-auto">
        <button
          class="btn btn-outline-secondary"
          @click="isDark = !isDark"
          :title="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
        >
          {{ isDark ? 'Claro' : 'Oscuro' }}
        </button>
      </div>
    </div>
  </nav>
  <div class="container mt-4">
    <div class="row my-2">
      <div class="col">
        <brush-palette v-model="selectedBrush" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <commits-canva :brush="selectedBrush" @painted="handlePixelPainted()" />
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
