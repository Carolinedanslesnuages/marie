<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { fieldLabel, pages } from '../data.js';
import { formatSchoolDate, lifespan, splitNotes } from '../format.js';

const props = defineProps({ index: { type: Number, required: true } });

const woman = computed(() => pages[props.index]);
const previousWoman = computed(() => pages[props.index - 1]);
const nextWoman = computed(() => pages[props.index + 1]);

/** The notes flow over the two pages: the left one starts with the entry header. */
const halves = computed(() => splitNotes(woman.value.notes));

// The page turns forward or backward, depending on where the reader goes.
const turnDirection = ref('turn-forward');
watch(() => props.index, (newIndex, oldIndex) => {
  turnDirection.value = newIndex >= oldIndex ? 'turn-forward' : 'turn-backward';
});

/** "Olivier Blanc, Olympe de Gouges, Syros, 1981" */
const sourceText = (source) => [source.author, source.title, source.publisher, source.year].filter(Boolean).join(', ');

/** Left and right arrows turn the pages, except while typing in a field. */
function turnWithArrows(event) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.target.closest?.('input, textarea, select, [contenteditable]')) return;
  const target = event.key === 'ArrowRight' ? nextWoman.value : event.key === 'ArrowLeft' ? previousWoman.value : null;
  if (!target) return;
  event.preventDefault();
  location.hash = `#/page/${target.slug}`;
}
onMounted(() => window.addEventListener('keydown', turnWithArrows));
onBeforeUnmount(() => window.removeEventListener('keydown', turnWithArrows));
</script>

<template>
  <div class="book">
    <Transition :name="turnDirection" mode="out-in">
      <article :key="woman.slug" class="spread">
        <section class="sheet sheet-left" aria-label="Page de gauche">
          <dl class="entry-header">
            <div><dt>Entrée</dt><dd>n° {{ index + 1 }}</dd></div>
            <div><dt>Date</dt><dd><time :datetime="woman.published">{{ formatSchoolDate(woman.published) }}</time></dd></div>
            <div><dt>Discipline</dt><dd>{{ fieldLabel(woman.field) }}</dd></div>
          </dl>
          <h1 class="page-title" tabindex="-1">{{ woman.name }}</h1>
          <p class="identity">{{ lifespan(woman) }} · {{ woman.country }}</p>
          <p v-for="paragraph in halves.left" :key="paragraph.slice(0, 30)">{{ paragraph }}</p>
        </section>
        <section class="sheet sheet-right" aria-label="Page de droite">
          <p v-for="paragraph in halves.right" :key="paragraph.slice(0, 30)">{{ paragraph }}</p>
          <h2>Références</h2>
          <ul class="sources">
            <li v-for="source in woman.sources" :key="source.title">
              <a v-if="source.url" :href="source.url">{{ sourceText(source) }}</a>
              <template v-else>{{ sourceText(source) }}</template>
            </li>
          </ul>
          <p class="visa" aria-hidden="true">Visa :</p>
        </section>
      </article>
    </Transition>
  </div>

  <nav class="page-turn" aria-label="Tourner les pages">
    <a v-if="previousWoman" :href="`#/page/${previousWoman.slug}`" rel="prev">
      <span aria-hidden="true">←</span> Entrée précédente : {{ previousWoman.name }}
    </a>
    <p class="page-number">Entrée {{ index + 1 }} sur {{ pages.length }}</p>
    <a v-if="nextWoman" :href="`#/page/${nextWoman.slug}`" rel="next">
      Entrée suivante : {{ nextWoman.name }} <span aria-hidden="true">→</span>
    </a>
  </nav>
  <p class="keyboard-hint">Astuce : les flèches gauche et droite du clavier tournent aussi les pages.</p>
</template>
