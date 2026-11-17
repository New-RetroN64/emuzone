<script setup>
import { ref, computed } from 'vue'
import gamesData from './data/games.json'
import NavbarHeader from './components/NavbarHeader.vue'
import GameCard from './components/GameCard.vue'
import GameModal from './components/GameModal.vue'

const games = ref(gamesData)
const searchQuery = ref('')
const selectedGame = ref(null)

const filteredGames = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return games.value
  return games.value.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.platform.toLowerCase().includes(q) ||
      g.genre.toLowerCase().includes(q)
  )
})

const openGameModal = (game) => {
  selectedGame.value = game
}

const closeGameModal = () => {
  selectedGame.value = null
}
</script>

<template>
  <div class="app-layout">
    <NavbarHeader />

    <main class="main-container">
      <section class="intro-bar">
        <div>
          <h2 class="section-title">Katalog Gier ({{ filteredGames.length }} / {{ games.length }})</h2>
          <p class="section-desc">
            Dotknij dowolnego elementu z listy, aby otworzyć okno z pełną zawartością obiektu JSON oraz kontrolkami obiektów zagnieżdżonych.
          </p>
        </div>

        <div class="search-box">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Szukaj gry lub platformy..."
            class="search-input"
          />
        </div>
      </section>

      <section class="games-grid">
        <GameCard
          v-for="game in filteredGames"
          :key="game.id"
          :game="game"
          @select="openGameModal"
        />
      </section>
    </main>

    <GameModal :game="selectedGame" @close="closeGameModal" />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 3rem;
}

.intro-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.section-title {
  margin: 0 0 0.35rem 0;
  font-size: 1.4rem;
  color: #f8fafc;
}

.section-desc {
  margin: 0;
  font-size: 0.9rem;
  color: #94a3b8;
  max-width: 650px;
}

.search-box {
  width: 100%;
  max-width: 320px;
}

.search-input {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #f8fafc;
  font-size: 0.9rem;
}

.search-input:focus {
  outline: 2px solid #6366f1;
  border-color: transparent;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.25rem;
}
</style>