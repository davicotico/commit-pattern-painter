# Commit Pattern Painter

Aplicación interactiva desarrollada en Vue 3 que permite diseñar patrones de commits al estilo GitHub sobre un lienzo de píxeles. Los usuarios pueden pintar con distintos niveles de color (0–4), cargar datos desde un array para renderizar automáticamente patrones en el lienzo, trabajar en modo oscuro o claro, y exportar lo creado en formato de array o como filas de caracteres, facilitando su almacenamiento y reutilización en otros proyectos.

## Características

- Lienzo interactivo para pintar patrones de commits.
- Paleta de colores con 4 niveles [1–4) y cero (0) para borrar.
- Soporte para dark/light mode.
- Exportación de datos como array y como filas de caracteres.
- Importación de datos desde un array para renderizar patrones.
- Hecho con Vue 3 y componentes reutilizables.

## Instalación

```sh
npm install
```

## Ejecución

```sh
npm run dev
```

## Components Principales

### BrushPalette

Paleta de colores para seleccionnar el nivel de color para pintar en el lienzo.

```vue
<script setup>
const selectedBrushId = ref(0);
</script>
<template>
  <brush-palette v-model="selectedBrushId" />
</template>
```

### CommitsCanva

Lienzo interactivo donde se pintan o cargan patrones de commits.

```vue
<script setup>
const selectedBrushId = ref(0);
function handlePixelPainted() {
  // some action, for example:
  // updateOutput();
}
</script>
<template>
  <commits-canva :brush-id="selectedBrushId" @painted="handlePixelPainted()" ref="commits" />
</template>
```

## Tecnologías utilizadas

- Vue 3
- JavaScript
- Composition API
