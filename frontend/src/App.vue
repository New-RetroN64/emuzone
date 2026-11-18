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
          <h2 class="section-title">Biblioteka Gier</h2>
          <p class="section-desc">
            Wybierz tytuł z katalogu, aby poznać jego szczegóły.
          </p>
        </div>

        <div class="search-box">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Wyszukaj..."
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
  padding: 2rem 1.25rem 3.5rem;
}

.intro-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(255, 0, 127, 0.35);
}

.section-title {
  margin: 0 0 0.4rem 0;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}

.section-title span {
  color: #ff007f;
}

.section-desc {
  margin: 0;
  font-size: 0.92rem;
  color: #cbd5e1;
  max-width: 620px;
}

.search-box {
  width: 100%;
  max-width: 340px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #00f3ff;
  background: rgba(5, 5, 12, 0.85);
  color: #ffffff;
  font-size: 0.9rem;
  box-shadow: 0 0 12px rgba(0, 243, 255, 0.2);
  transition: all 0.2s;
}

.search-input::placeholder {
  color: #64748b;
}

.search-input:focus {
  outline: none;
  border-color: #ff007f;
  box-shadow: 0 0 16px rgba(255, 0, 127, 0.55);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
</style>
