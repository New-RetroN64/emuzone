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
          <h1 class="brand-title">EMUZONE</h1>
          <p class="brand-subtitle">Katalog Klasycznych Gier Retro (PWA)</p>
        </div>
      </div>

      <div class="status-badge" :class="isOnline ? 'online' : 'offline'">
        <span class="status-dot"></span>
        <span>{{ isOnline ? 'Tryb Online' : 'Tryb Offline (Cache)' }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background: linear-gradient(90deg, #0f172a 0%, #1e1b4b 100%);
  border-bottom: 2px solid #4f46e5;
  padding: 1rem 1.25rem;
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
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
  gap: 0.75rem;
}

.brand-icon {
  font-size: 2rem;
}

.brand-title {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #f8fafc;
  margin: 0;
}

.brand-subtitle {
  font-size: 0.8rem;
  color: #94a3b8;
  margin: 0;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-badge.online {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.4);
}

.status-badge.offline {
  background: rgba(244, 63, 94, 0.15);
  color: #fb7185;
  border: 1px solid rgba(244, 63, 94, 0.4);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
}
</style>
