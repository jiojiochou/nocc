<script setup lang="ts">
import { NoButton } from '@nosc/components'

function handleClick() {
  // console.log('NoButton-click')
  window.alert('click')
}
</script>

<template>
  <div>
    <h1>play</h1>
    <NoButton @click="handleClick">
      123
    </NoButton>
  </div>
</template>
