<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOnline = ref(navigator.onLine)

const updateNetworkStatus = () => {
  isOnline.value = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateNetworkStatus)
  window.addEventListener('offline', updateNetworkStatus)
})

onUnmounted(() => {
  window.removeEventListener('online', updateNetworkStatus)
  window.removeEventListener('offline', updateNetworkStatus)
})
</script>

<template>
  <header class="navbar">
    <div class="navbar-container">
      <div class="brand">
        <span class="brand-icon">🕹️</span>
        <div>
          <h1 class="brand-title">EMU<span>ZONE</span></h1>
          <p class="brand-subtitle">Katalog Klasycznych Gier Retro</p>
        </div>
      </div>

      <div class="status-badge" :class="isOnline ? 'online' : 'offline'">
        <span class="status-dot"></span>
        <span>{{ isOnline ? 'Online' : 'Tryb Offline' }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background: rgba(5, 5, 12, 0.88);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid #00f3ff;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.35), 0 4px 30px rgba(255, 0, 128, 0.15);
  padding: 1rem 1.25rem;
  position: sticky;
  top: 0;
  z-index: 20;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.brand-icon {
  font-size: 2.1rem;
  filter: drop-shadow(0 0 8px #ff007f);
}

.brand-title {
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: 3px;
  color: #00f3ff;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.8), 0 0 20px rgba(0, 243, 255, 0.4);
  margin: 0;
}

.brand-title span {
  color: #ff007f;
  text-shadow: 0 0 10px rgba(255, 0, 127, 0.8), 0 0 20px rgba(255, 0, 127, 0.4);
}

.brand-subtitle {
  font-size: 0.8rem;
  color: #cbd5e1;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0.1rem 0 0 0;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.online {
  background: rgba(0, 243, 255, 0.1);
  color: #00f3ff;
  border: 1px solid #00f3ff;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.3);
}

.status-badge.offline {
  background: rgba(255, 0, 127, 0.15);
  color: #ff007f;
  border: 1px solid #ff007f;
  box-shadow: 0 0 10px rgba(255, 0, 127, 0.4);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
  box-shadow: 0 0 8px currentColor;
}
</style>