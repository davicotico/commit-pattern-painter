<script setup>
import { ref, useTemplateRef } from 'vue';
import { useDark } from '@vueuse/core';
import BrushPalette from './components/BrushPalette.vue';
import CommitCanvas from './components//CommitCanvas.vue';
import { updateOutput1, updateOutput2 } from './utils/output';
import { HOLA_MUNDO } from './utils/constants';
import IconGithub from './components/icons/IconGithub.vue';

const isDark = useDark({
  selector: 'html',
  attribute: 'data-bs-theme',
  valueDark: 'dark',
  valueLight: 'light',
});
const commits = useTemplateRef('commits');

const selectedBrushId = ref(0);
const input = ref(JSON.stringify(HOLA_MUNDO));

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
function loadData() {
  commits.value.loadData(JSON.parse(input.value));
}
function clear() {
  commits.value.clear();
}
</script>
<template>
  <main>
    <div class="px-4 pt-2 mt-3 mb-1 text-center">
      <h1 class="display-5 fw-bold text-body-emphasis">Commit Pattern Painter</h1>
      <div class="col-lg-8 mx-auto">
        <p class="lead mb-4">
          With this project you can learn <strong>A LOT about Vue.js Components</strong>
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a
            href="https://github.com/davicotico/commit-pattern-painter"
            target="_blank"
            class="btn btn-success gap-3 d-flex align-items-center"
          >
            <icon-github /> View on Github
          </a>
        </div>
        <div class="col-1 mx-auto mt-5">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="chkTheme"
              v-model="isDark"
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">Dark</label>
          </div>
        </div>
      </div>
    </div>
  </main>
  <div class="container mt-4">
    <div class="row my-2">
      <div class="col">
        <brush-palette v-model="selectedBrushId" />
      </div>
    </div>
    <div class="row mb-2">
      <div class="col">
        <commit-canvas :brush-id="selectedBrushId" @painted="handlePixelPainted()" ref="commits" />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="card mb-2">
          <div class="card-header">
            <button type="button" class="btn btn-primary me-2" @click="loadData()">
              Load Data from this Input
            </button>
            <button type="button" class="btn btn-secondary" @click="clear()">Clear</button>
          </div>
          <div class="card-body p-1">
            <textarea class="form-control w-100" v-model="input"></textarea>
          </div>
        </div>
        <div class="card">
          <div class="card-header fw-semibold">Output 1</div>
          <div class="card-body p-1">
            <textarea id="output1" class="form-control w-100 textarea-output"></textarea>
          </div>
        </div>
        <div class="card mt-2">
          <div class="card-header fw-semibold">Output 2</div>
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
