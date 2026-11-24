<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  game: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const showTechSpecs = ref(false)
const showCreatorInfo = ref(false)

const techLabels = {
  rozdzielczosc: 'Rozdzielczość obrazu',
  ukladDzwiekowy: 'Układ dźwiękowy',
  rozmiarNosnika: 'Nośnik i rozmiar',
  plynnoscAnimacji: 'Płynność animacji'
}

const creatorLabels = {
  producent: 'Producent',
  wydawca: 'Wydawca',
  glownyProjektant: 'Główny projektant',
  krajPochodzenia: 'Kraj pochodzenia'
}

const formatLabel = (key, dictionary) => {
  return dictionary[key] || key
}

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
          <span class="modal-platform-tag">{{ game.platform }}</span>
          <h2 class="modal-title">{{ game.title }}</h2>
        </div>
      </div>

      <div class="modal-content">
        <div class="boxart-showcase">
          <img :src="game.imageUrl" :alt="game.title" class="modal-image" />
          <div class="resource-link-bar">
            <a :href="game.imageUrl" target="_blank" rel="noopener noreferrer">
              Oryginalny rozmiar↗
            </a>
          </div>
        </div>

        <h3 class="section-heading">Szczegóły</h3>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Tytuł:</span>
            <span class="detail-value">{{ game.title }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Rok wydania:</span>
            <span class="detail-value">{{ game.releaseYear }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Platforma:</span>
            <span class="detail-value">{{ game.platform }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Gatunek:</span>
            <span class="detail-value">{{ game.genre }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Średnia ocen:</span>
            <span class="detail-value highlight-pink">⭐ {{ game.rating }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Ilość graczy:</span>
            <span class="detail-value">{{ game.players }}</span>
          </div>
        </div>

        <h3 class="section-heading">Dodatkowe informacje</h3>

        <div class="nested-controls">
          <div class="nested-box">
            <button
              type="button"
              class="toggle-control-btn"
              :class="{ active: showTechSpecs }"
              @click="showTechSpecs = !showTechSpecs"
            >
              <span>⚡ Specyfikacja</span>
              <span class="toggle-action">{{ showTechSpecs ? 'Ukryj ▲' : 'Pokaż więcej ▼' }}</span>
            </button>

            <div v-if="showTechSpecs" class="nested-details">
              <div
                v-for="(value, key) in game.technicalSpecs"
                :key="key"
                class="nested-row"
              >
                <span class="nested-key">{{ formatLabel(key, techLabels) }}:</span>
                <span class="nested-val">{{ value }}</span>
              </div>
            </div>
          </div>

          <div class="nested-box">
            <button
              type="button"
              class="toggle-control-btn"
              :class="{ active: showCreatorInfo }"
              @click="showCreatorInfo = !showCreatorInfo"
            >
              <span>🎮 Twórcy i wydanie</span>
              <span class="toggle-action">{{ showCreatorInfo ? 'Ukryj ▲' : 'Pokaż więcej ▼' }}</span>
            </button>

            <div v-if="showCreatorInfo" class="nested-details">
              <div
                v-for="(value, key) in game.creatorInfo"
                :key="key"
                class="nested-row"
              >
                <span class="nested-key">{{ formatLabel(key, creatorLabels) }}:</span>
                <span class="nested-val">{{ value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="close-footer-btn" @click="emit('close')">
          Zamknij
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 2, 8, 0.88);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 50;
}

.modal-window {
  background: #070710;
  border: 2px solid #00f3ff;
  border-radius: 14px;
  max-width: 680px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 30px rgba(0, 243, 255, 0.35), 0 0 60px rgba(255, 0, 127, 0.2);
  overflow: hidden;
}

.modal-header {
  padding: 1.1rem 1.4rem;
  background: #04040a;
  border-bottom: 1px solid rgba(0, 243, 255, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-platform-tag {
  font-size: 0.75rem;
  color: #ff007f;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 700;
}

.modal-title {
  margin: 0.2rem 0 0 0;
  font-size: 1.45rem;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}

.close-btn {
  background: transparent;
  color: #00f3ff;
  border: 1px solid #00f3ff;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #ff007f;
  border-color: #ff007f;
  color: #ffffff;
  box-shadow: 0 0 12px #ff007f;
}

.modal-content {
  padding: 1.4rem;
  overflow-y: auto;
}

.boxart-showcase {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(0, 243, 255, 0.25);
  margin-bottom: 1.4rem;
  background: radial-gradient(circle at center, rgba(255, 0, 127, 0.12) 0%, #030308 85%);
  padding-top: 1rem;
}

.modal-image {
  width: 100%;
  max-height: 320px;
  object-fit: contain;
  display: block;
  padding: 0 1rem 1rem;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.9));
}

.resource-link-bar {
  padding: 0.6rem 0.9rem;
  background: rgba(0, 0, 0, 0.6);
  border-top: 1px solid rgba(0, 243, 255, 0.15);
  text-align: center;
  font-size: 0.8rem;
}

.resource-link-bar a {
  color: #00f3ff;
  text-decoration: none;
  font-weight: 600;
}

.resource-link-bar a:hover {
  color: #ff007f;
  text-decoration: underline;
}

.section-heading {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #00f3ff;
  margin: 1.25rem 0 0.8rem 0;
  border-left: 3px solid #ff007f;
  padding-left: 0.65rem;
  text-shadow: 0 0 8px rgba(0, 243, 255, 0.4);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.7rem;
}

.detail-item {
  background: rgba(12, 12, 24, 0.9);
  border: 1px solid rgba(0, 243, 255, 0.2);
  padding: 0.7rem 0.9rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #94a3b8;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: #f8fafc;
  margin-top: 0.2rem;
}

.highlight-pink {
  color: #ff007f;
  text-shadow: 0 0 8px rgba(255, 0, 127, 0.4);
}

.nested-controls {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.nested-box {
  border: 1px solid rgba(255, 0, 127, 0.45);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(255, 0, 127, 0.1);
}

.toggle-control-btn {
  width: 100%;
  background: rgba(15, 10, 28, 0.95);
  color: #ffffff;
  border: none;
  padding: 0.9rem 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-align: left;
  transition: all 0.2s;
}

.toggle-action {
  color: #ff007f;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.toggle-control-btn:hover,
.toggle-control-btn.active {
  background: rgba(255, 0, 127, 0.18);
  color: #00f3ff;
}

.nested-details {
  background: #05050c;
  padding: 0.9rem 1.1rem;
  border-top: 1px solid rgba(255, 0, 127, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.nested-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 0.45rem;
  border-bottom: 1px dashed rgba(0, 243, 255, 0.2);
  font-size: 0.88rem;
}

.nested-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.nested-key {
  color: #00f3ff;
}

.nested-val {
  color: #ffffff;
  font-weight: 600;
}

.modal-footer {
  padding: 0.9rem 1.4rem;
  background: #04040a;
  border-top: 1px solid rgba(0, 243, 255, 0.3);
  display: flex;
  justify-content: flex-end;
}

.close-footer-btn {
  background: transparent;
  color: #00f3ff;
  border: 1px solid #00f3ff;
  padding: 0.6rem 1.6rem;
  border-radius: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s;
}

.close-footer-btn:hover {
  background: #00f3ff;
  color: #05050a;
  box-shadow: 0 0 15px #00f3ff;
}
</style>
