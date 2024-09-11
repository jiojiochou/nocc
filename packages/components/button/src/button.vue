<template>
  <component>
    <button>
      <slot></slot>
    </button>
  </component>
</template>
<script setup lang="ts">
import { defineOptions } from 'vue';

defineOptions({
  name: 'Button',
})
</script>