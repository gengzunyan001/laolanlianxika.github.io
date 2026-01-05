<template>
  <svg v-if="name === 'health'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
  <svg v-else-if="name === 'sanity'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
    <path d="M12 6v6l4 2" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.2" />
  </svg>
  <svg v-else-if="name === 'clue'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <path d="M11 8v6M8 11h6" />
  </svg>
  <svg v-else-if="name === 'map'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
  <svg v-else-if="name === 'book'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
  <svg v-else-if="name === 'tentacle'" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 opacity-40">
    <path d="M12,2C10.8,2,9.7,2.4,8.8,3.2c-0.1,0.1-0.2,0.1-0.3,0.2c-2.4,2.2-2.5,5.9-0.3,8.3c1.1,1.2,1.7,2.7,1.7,4.3 c0,2.2-1.1,4.2-3,5.4c-0.2,0.1-0.2,0.4,0,0.5c0.1,0.1,0.2,0.1,0.3,0.1c1.4,0,2.7-0.7,3.5-1.9c0.9-1.2,1.4-2.7,1.4-4.2 c0-2.8-1.4-5.4-3.7-7c-0.4-0.3-0.5-0.8-0.2-1.2c0.3-0.4,0.8-0.5,1.2-0.2c2.9,2.1,4.7,5.5,4.7,9.2c0,1.9-0.6,3.8-1.7,5.3 c-0.2,0.3-0.1,0.8,0.2,1c0.1,0.1,0.2,0.1,0.4,0.1c0.2,0,0.5-0.1,0.6-0.3c1.3-1.8,2-4,2-6.2c0-4.4-2.2-8.4-5.8-11 C11.5,2.1,10.7,2,10,2H12z" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>
