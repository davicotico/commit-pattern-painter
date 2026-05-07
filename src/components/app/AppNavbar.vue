<script setup>
import IconMoon from './icons/IconMoon.vue';
import IconSun from './icons/IconSun.vue';
const isDark = defineModel();
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
</template>
