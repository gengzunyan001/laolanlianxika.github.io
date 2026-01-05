<template>
  <div 
    class="game-card"
    @click="$emit('use', card.id)"
  >
    <div class="card-header">
      <span class="card-type">[{{ card.type }}]</span>
      <span class="card-cost">{{ card.cost }}</span>
    </div>
    <div class="card-body">
      <div class="card-icon">{{ card.icon }}</div>
      <h4 class="card-name">{{ card.name }}</h4>
      <p class="card-description">{{ card.description }}</p>
    </div>
    <div class="card-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '../types';

defineProps<{
  card: Card;
}>();

defineEmits<{
  use: [id: string];
}>();
</script>

<style lang="scss" scoped>
.game-card {
  position: relative;
  width: 160px;
  min-width: 160px;
  aspect-ratio: 2/3;
  background: rgba(13, 13, 13, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(197, 160, 89, 0.3);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: rgba(197, 160, 89, 1);
    transform: translateY(-8px);
    
    .card-overlay {
      opacity: 1;
    }
    
    .card-icon {
      transform: scale(1.25);
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.card-type {
  font-size: 10px;
  color: rgba(197, 160, 89, 0.6);
  font-family: monospace;
}

.card-cost {
  font-size: 14px;
  font-weight: bold;
  color: #ef4444;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 8px 0;
}

.card-icon {
  font-size: 48px;
  margin-bottom: 8px;
  transition: transform 0.3s;
}

.card-name {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 18px;
  color: #c5a059;
  margin-bottom: 4px;
}

.card-description {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(139, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 8px;
  pointer-events: none;
}
</style>
