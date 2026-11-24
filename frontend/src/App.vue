<script setup>
import { ref, computed, onMounted } from 'vue'
import { GAMES_JSON_URL } from './config.js'
import NavbarHeader from './components/NavbarHeader.vue'
import GameCard from './components/GameCard.vue'
import GameModal from './components/GameModal.vue'

const CACHE_KEY = 'emuzone_external_games_cache'

const games = ref([])
const searchQuery = ref('')
const selectedGame = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

const fetchGames = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(GAMES_JSON_URL)

    if (!response.ok) {
      throw new Error(`Serwer zwrócił błąd HTTP: ${response.status}`)
    }

    const data = await response.json()
    games.value = Array.isArray(data) ? data : []

    localStorage.setItem(CACHE_KEY, JSON.stringify(games.value))
  } catch (error) {
    console.warn('Brak połączenia z zewnętrznym hostem, sprawdzam pamięć podręczną...', error)

    const cachedGames = localStorage.getItem(CACHE_KEY)
    if (cachedGames) {
      games.value = JSON.parse(cachedGames)
    } else {
      errorMessage.value =
        'Nie udało się pobrać katalogu gier z zewnętrznego serwera. Sprawdź połączenie z internetem oraz poprawność linku w pliku config.js.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchGames()
})

const filteredGames = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return games.value
  return games.value.filter(
    (g) =>
      g.title?.toLowerCase().includes(q) ||
      g.platform?.toLowerCase().includes(q) ||
      g.genre?.toLowerCase().includes(q)
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
            :disabled="isLoading || !!errorMessage"
          />
        </div>
      </section>

      <div v-if="isLoading" class="state-panel">
        <div class="neon-spinner"></div>
        <p class="state-text">Łączenie z bazą katalogu...</p>
      </div>

      <div v-else-if="errorMessage" class="state-panel error-panel">
        <p class="error-text">{{ errorMessage }}</p>
        <button type="button" class="retry-btn" @click="fetchGames">
          Spróbuj ponownie
        </button>
      </div>

      <div v-else-if="filteredGames.length === 0" class="state-panel">
        <p class="state-text">Nie znaleziono gier pasujących do zapytania "{{ searchQuery }}".</p>
      </div>

      <section v-else class="games-grid">
        <GameCard
          v-for="(game, index) in filteredGames"
          :key="game.id ?? index"
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

.state-panel {
  background: rgba(5, 5, 12, 0.85);
  border: 1px solid rgba(0, 243, 255, 0.4);
  border-radius: 12px;
  padding: 3rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 0 16px rgba(0, 243, 255, 0.15);
}

.error-panel {
  border-color: rgba(255, 0, 127, 0.6);
  box-shadow: 0 0 18px rgba(255, 0, 127, 0.25);
}

.state-text {
  margin: 0;
  color: #00f3ff;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
}

.error-text {
  margin: 0;
  color: #cbd5e1;
  max-width: 500px;
  line-height: 1.5;
}

.neon-spinner {
  width: 44px;
  height: 44px;
  border: 3px solid rgba(0, 243, 255, 0.15);
  border-top-color: #00f3ff;
  border-right-color: #ff007f;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.4);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.retry-btn {
  padding: 0.65rem 1.5rem;
  background: rgba(5, 5, 12, 0.85);
  color: #00f3ff;
  border: 1px solid #00f3ff;
  border-radius: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0 12px rgba(0, 243, 255, 0.2);
}

.retry-btn:hover {
  background: #ff007f;
  border-color: #ff007f;
  color: #ffffff;
  box-shadow: 0 0 16px rgba(255, 0, 127, 0.55);
}
</style>

