<script setup>
import { ref } from 'vue';
import { useDark } from '@vueuse/core';
import BrushPalette from './components/BrushPalette.vue';
import CommitsCanva from './components/CommitsCanva.vue';
import { updateOutput1, updateOutput2 } from './utils/output';
import IconMoon from './components/icons/IconMoon.vue';
import IconSun from './components/icons/IconSun.vue';

const isDark = useDark({
  selector: 'html',
  attribute: 'data-bs-theme',
  valueDark: 'dark',
  valueLight: 'light',
});
const selectedBrushId = ref(0);

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
</script>
<template>
  <nav class="navbar navbar-expand-lg sticky-top border-bottom" :class="{ isDark: 'navbar-dark' }">
    <div class="container">
      <a class="navbar-brand" href="#">
        <strong>Commit Pattern Painter</strong>
      </a>
      <div class="ms-auto">
        <div
          class="btn-group btn-group-sm"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            v-model="isDark"
            type="radio"
            class="btn-check"
            id="rdoDark"
            :value="true"
            autocomplete="off"
          />
          <label class="btn btn-outline-success d-flex align-items-center" for="rdoDark">
            <icon-moon></icon-moon>
          </label>

          <input
            v-model="isDark"
            type="radio"
            class="btn-check"
            id="rdoLight"
            :value="false"
            autocomplete="off"
          />
          <label class="btn btn-outline-success d-flex align-items-center" for="rdoLight">
            <icon-sun></icon-sun>
          </label>
        </div>
      </div>
    </div>
  </nav>
  <div class="container mt-4">
    <div class="row my-2">
      <div class="col">
        <brush-palette v-model="selectedBrushId" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <commits-canva :brush-id="selectedBrushId" @painted="handlePixelPainted()" />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="card">
          <div class="card-header">Output 1</div>
          <div class="card-body p-1">
            <textarea id="output1" class="form-control w-100 textarea-output"></textarea>
          </div>
        </div>
        <div class="card mt-2">
          <div class="card-header">Output 2</div>
          <div class="card-body p-1">
            <textarea id="output2" class="form-control w-100 textarea-output"></textarea>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 pt-3">
        <h4>😃 Check out my projects</h4>
        <div class="list-group mt-3">
          <a
            href="https://davidticona.com/quiz4learn/"
            target="_blank"
            class="list-group-item list-group-item-action"
            >Quiz 4 Learn (Vue.js)</a
          >
          <a
            href="https://davidticona.com/demos/javascript-menu-editor/"
            target="_blank"
            class="list-group-item list-group-item-action"
            >JavaScript Menu Editor</a
          >
          <a
            href="https://davidticona.com/demos/javascript-iconpicker/"
            target="_blank"
            class="list-group-item list-group-item-action"
            >JavaScript Icon Picker</a
          >
          <a
            href="https://davidticona.com/demos/sortablerows/"
            target="_blank"
            class="list-group-item list-group-item-action"
            >JavaScript SortableRows</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
