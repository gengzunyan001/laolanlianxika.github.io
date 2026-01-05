<template>
  <div v-if="isOpen" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">{{ title }}</h2>
        <button @click="$emit('close')" class="modal-close">×</button>
      </div>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  title: string;
}>();

defineEmits<{
  close: [];
}>();
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 672px;
  max-height: 80vh;
  overflow: hidden;
  background: rgba(13, 13, 13, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(197, 160, 89, 0.5);
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  padding: 16px;
  border-bottom: 1px solid rgba(197, 160, 89, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
}

.modal-title {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 24px;
  color: #c5a059;
  letter-spacing: 0.1em;
}

.modal-close {
  color: #c5a059;
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.3s;
  background: transparent;
  border: none;
  
  &:hover {
    color: #ef4444;
  }
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  color: rgba(255, 255, 255, 0.8);
  background-image: url('https://www.transparenttextures.com/patterns/old-map.png');
  background-blend-mode: multiply;
}
</style>
