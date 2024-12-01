<script setup lang="ts">
// import { defineProps } from 'vue'
import { buttonProps } from './button'

defineOptions({
  name: 'NoButton',
})

defineProps(buttonProps)
</script>

<template>
  <component :is="tag">
    <slot />
  </component>
</template>
