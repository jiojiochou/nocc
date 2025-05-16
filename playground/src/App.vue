<script setup lang="ts">
import { Dialog } from '@nosc/components'
import { ref } from 'vue';

const isOpen = ref(false)
function openModal() {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

</script>

<template>
  <div
    class="w-100vw h-100vh flex flex-col items-center place-content-center bg-gradient-to-r from-sky-400 to-blue-600">
    <button class="rounded-md
      bg-black/20 px-4 py-2 text-sm font-medium text-white
      hover:bg-black/30 focus:outline-none focus-visible:ring-2
      focus-visible:ring-white/75 cursor-pointer" @click="openModal">
      支付
    </button>
    <Dialog :open="isOpen" class="absolute z-10 max-w-md transform
      overflow-hidden rounded-2xl bg-white p-6  align-middle
      shadow-xl transition-all">
      <h3 class="text-lg font-medium leading-6 text-gray-900 ">付款成功</h3>
      <div class="mt-2 text-sm text-gray-500">
        您的付款已成功提交。我们已经给你发了一封邮件，告诉你订单的所有细节。
      </div>
      <button class="mt-4 inline-flex justify-center rounded-md
        border border-transparent bg-blue-100 px-4 py-2
        text-sm font-medium text-blue-900 hover:bg-blue-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        focus-visible:ring-offset-2 cursor-pointer select-none" @click="closeModal">
        知道了，谢谢！
      </button>
    </Dialog>
  </div>
</template>
