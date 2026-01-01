<script setup>
import { pages } from '../data.js';

const firstPage = pages[0];
</script>

<template>
  <div class="sheet sheet-single home">
    <h1 class="page-title home-title" tabindex="-1">Marie</h1>
    <p v-if="firstPage"><a class="open-link" :href="`#/page/${firstPage.slug}`">Ouvrir le cahier</a></p>
  </div>
</template>
