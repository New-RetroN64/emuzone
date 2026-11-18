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
    </div>

    <div class="card-body">
      <span class="card-platform">{{ game.platform }}</span>
      <h2 class="card-title">{{ game.title }}</h2>
      <p class="card-genre">{{ game.genre }}</p>

      <button type="button" class="card-btn">
        Szczegóły
      </button>
    </div>
  </article>
</template>

<style scoped>
.game-card {
  background: rgba(8, 8, 18, 0.9);
  border: 1px solid rgba(0, 243, 255, 0.35);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.08);
}

.game-card:hover {
  border-color: #ff007f;
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.45), 0 0 35px rgba(0, 243, 255, 0.2);
}

.card-image-wrapper {
  position: relative;
  height: 260px;
  padding: 1rem;
  background: radial-gradient(circle at center, rgba(0, 243, 255, 0.14) 0%, #05050a 85%);
  border-bottom: 1px solid rgba(0, 243, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.85));
  transition: transform 0.25s ease;
}

.card-year {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(5, 5, 12, 0.9);
  color: #00f3ff;
  border: 1px solid #00f3ff;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 0 8px rgba(0, 243, 255, 0.3);
}

.card-rating {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(5, 5, 12, 0.9);
  color: #ff007f;
  border: 1px solid #ff007f;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 0 8px rgba(255, 0, 127, 0.35);
}

.card-body {
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-platform {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #00f3ff;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.card-title {
  font-size: 1.25rem;
  color: #ffffff;
  margin: 0 0 0.4rem 0;
  text-shadow: 0 0 6px rgba(255, 255, 255, 0.2);
}

.card-genre {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0 0 1.1rem 0;
}

.card-btn {
  margin-top: auto;
  width: 100%;
  padding: 0.7rem;
  background: transparent;
  color: #ff007f;
  border: 1px solid #ff007f;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: inset 0 0 8px rgba(255, 0, 127, 0.2);
}

.game-card:hover .card-btn {
  background: #ff007f;
  color: #ffffff;
  box-shadow: 0 0 15px rgba(255, 0, 127, 0.7);
}
</style>
