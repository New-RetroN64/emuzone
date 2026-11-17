<script setup>
defineProps({
  game: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])
</script>

<template>
  <article class="game-card" @click="$emit('select', game)">
    <div class="card-image-wrapper">
      <img :src="game.imageUrl" :alt="game.title" class="card-image" loading="lazy" />
      <span class="card-year">{{ game.releaseYear }}</span>
      <span class="card-rating">⭐ {{ game.rating }}</span>
    </div>

    <div class="card-body">
      <span class="card-platform">{{ game.platform }}</span>
      <h2 class="card-title">{{ game.title }}</h2>
      <p class="card-genre">{{ game.genre }} • {{ game.players }}</p>

      <button type="button" class="card-btn">
        Pokaż zawartość obiektu →
      </button>
    </div>
  </article>
</template>

<style scoped>
.game-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.game-card:hover {
  transform: translateY(-4px);
  border-color: #6366f1;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.35);
}

.card-image-wrapper {
  position: relative;
  height: 180px;
  background: #0f172a;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-year {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(15, 23, 42, 0.85);
  color: #e2e8f0;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
}

.card-rating {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(79, 70, 229, 0.9);
  color: #ffffff;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
}

.card-body {
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-platform {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #818cf8;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.card-title {
  font-size: 1.2rem;
  color: #f8fafc;
  margin: 0 0 0.4rem 0;
}

.card-genre {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0 0 1rem 0;
}

.card-btn {
  margin-top: auto;
  width: 100%;
  padding: 0.65rem;
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
  border: 1px solid rgba(99, 102, 241, 0.35);
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;
}

.game-card:hover .card-btn {
  background: #4f46e5;
  color: #ffffff;
}
</style>
