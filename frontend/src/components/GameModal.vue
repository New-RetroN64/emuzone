<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  game: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

// Osobne stany dla kontrolek pokazujących 2 zagnieżdżone obiekty
const showTechSpecs = ref(false)
const showCreatorInfo = ref(false)

// Resetujemy kontrolki przy zmianie wybranej gry
watch(
  () => props.game,
  () => {
    showTechSpecs.value = false
    showCreatorInfo.value = false
  }
)
</script>

<template>
  <div v-if="game" class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-window">
      <div class="modal-header">
        <div>
          <span class="modal-id">Obiekt JSON #{{ game.id }}</span>
          <h2 class="modal-title">{{ game.title }}</h2>
        </div>
        <button class="close-btn" @click="emit('close')" aria-label="Zamknij okno">✕</button>
      </div>

      <div class="modal-content">
        <!-- Zewnętrzny zasób z internetu (Obrazek) -->
        <div class="external-resource-box">
          <img :src="game.imageUrl" :alt="game.title" class="modal-image" />
          <div class="resource-link-bar">
            <span>🌐 Zewnętrzny zasób (URL):</span>
            <a :href="game.imageUrl" target="_blank" rel="noopener noreferrer">
              {{ game.imageUrl }}
            </a>
          </div>
        </div>

        <!-- Podstawowe pary klucz-wartość z obiektu -->
        <h3 class="section-heading">Podstawowe pary klucz-wartość obiektu:</h3>
        <div class="kv-grid">
          <div class="kv-item">
            <span class="kv-key">id:</span>
            <span class="kv-val">{{ game.id }}</span>
          </div>
          <div class="kv-item">
            <span class="kv-key">title:</span>
            <span class="kv-val">{{ game.title }}</span>
          </div>
          <div class="kv-item">
            <span class="kv-key">releaseYear:</span>
            <span class="kv-val">{{ game.releaseYear }}</span>
          </div>
          <div class="kv-item">
            <span class="kv-key">platform:</span>
            <span class="kv-val">{{ game.platform }}</span>
          </div>
          <div class="kv-item">
            <span class="kv-key">genre:</span>
            <span class="kv-val">{{ game.genre }}</span>
          </div>
          <div class="kv-item">
            <span class="kv-key">rating:</span>
            <span class="kv-val">{{ game.rating }}</span>
          </div>
          <div class="kv-item">
            <span class="kv-key">players:</span>
            <span class="kv-val">{{ game.players }}</span>
          </div>
        </div>

        <!-- Osobne kontrolki dla 2 zagnieżdżonych obiektów -->
        <h3 class="section-heading">Obiekty zagnieżdżone (Osobne kontrolki):</h3>

        <div class="nested-controls">
          <!-- KONTROLKA 1: technicalSpecs -->
          <div class="nested-box">
            <button
              type="button"
              class="toggle-control-btn"
              :class="{ active: showTechSpecs }"
              @click="showTechSpecs = !showTechSpecs"
            >
              <span>🔧 Obiekt zagnieżdżony #1: <strong>technicalSpecs</strong></span>
              <span>{{ showTechSpecs ? 'Ukryj ▲' : 'Pokaż więcej ▼' }}</span>
            </button>

            <div v-if="showTechSpecs" class="nested-details">
              <div
                v-for="(value, key) in game.technicalSpecs"
                :key="key"
                class="nested-row"
              >
                <span class="nested-key">{{ key }}:</span>
                <span class="nested-val">{{ value }}</span>
              </div>
            </div>
          </div>

          <!-- KONTROLKA 2: creatorInfo -->
          <div class="nested-box">
            <button
              type="button"
              class="toggle-control-btn"
              :class="{ active: showCreatorInfo }"
              @click="showCreatorInfo = !showCreatorInfo"
            >
              <span>🏢 Obiekt zagnieżdżony #2: <strong>creatorInfo</strong></span>
              <span>{{ showCreatorInfo ? 'Ukryj ▲' : 'Pokaż więcej ▼' }}</span>
            </button>

            <div v-if="showCreatorInfo" class="nested-details">
              <div
                v-for="(value, key) in game.creatorInfo"
                :key="key"
                class="nested-row"
              >
                <span class="nested-key">{{ key }}:</span>
                <span class="nested-val">{{ value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="close-footer-btn" @click="emit('close')">
          Zamknij okno
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 50;
}

.modal-window {
  background: #1e293b;
  border: 1px solid #4f46e5;
  border-radius: 16px;
  max-width: 680px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  overflow: hidden;
}

.modal-header {
  padding: 1.1rem 1.4rem;
  background: #0f172a;
  border-bottom: 1px solid #334155;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-id {
  font-size: 0.75rem;
  color: #818cf8;
  font-family: monospace;
}

.modal-title {
  margin: 0.15rem 0 0 0;
  font-size: 1.35rem;
  color: #f8fafc;
}

.close-btn {
  background: #334155;
  color: #f8fafc;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
}

.close-btn:hover {
  background: #ef4444;
}

.modal-content {
  padding: 1.4rem;
  overflow-y: auto;
}

.external-resource-box {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #334155;
  margin-bottom: 1.25rem;
  background: #0f172a;
}

.modal-image {
  width: 100%;
  max-height: 240px;
  object-fit: cover;
  display: block;
}

.resource-link-bar {
  padding: 0.6rem 0.85rem;
  font-size: 0.75rem;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  word-break: break-all;
}

.resource-link-bar a {
  color: #38bdf8;
  text-decoration: underline;
}

.section-heading {
  font-size: 0.95rem;
  color: #cbd5e1;
  margin: 1.2rem 0 0.75rem 0;
  border-left: 3px solid #6366f1;
  padding-left: 0.6rem;
}

.kv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.6rem;
}

.kv-item {
  background: #0f172a;
  border: 1px solid #334155;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.kv-key {
  font-size: 0.75rem;
  font-family: monospace;
  color: #818cf8;
}

.kv-val {
  font-size: 0.9rem;
  font-weight: 600;
  color: #f1f5f9;
  margin-top: 0.15rem;
}

.nested-controls {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.nested-box {
  border: 1px solid #475569;
  border-radius: 10px;
  overflow: hidden;
}

.toggle-control-btn {
  width: 100%;
  background: #0f172a;
  color: #e2e8f0;
  border: none;
  padding: 0.85rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 0.88rem;
  text-align: left;
  transition: background 0.2s;
}

.toggle-control-btn:hover,
.toggle-control-btn.active {
  background: #312e81;
  color: #ffffff;
}

.nested-details {
  background: #131c31;
  padding: 0.85rem 1rem;
  border-top: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nested-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px dashed #334155;
  font-size: 0.85rem;
}

.nested-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.nested-key {
  font-family: monospace;
  color: #38bdf8;
}

.nested-val {
  color: #f8fafc;
  font-weight: 600;
}

.modal-footer {
  padding: 0.9rem 1.4rem;
  background: #0f172a;
  border-top: 1px solid #334155;
  display: flex;
  justify-content: flex-end;
}

.close-footer-btn {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.close-footer-btn:hover {
  background: #4338ca;
}
</style>
