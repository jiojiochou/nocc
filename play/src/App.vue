<script setup lang="ts">
import { ref } from 'vue'
// import { NoButton } from '@nosc/components'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@nosc/components'

// function handleClick() {
//   console.log('NoButton-click')
//   window.alert('click')
// }

const categories = ref({
  Recent: [
    {
      id: 1,
      title: 'Does drinking coffee make you smarter?',
      date: '5h ago',
      commentCount: 5,
      shareCount: 2,
    },
    {
      id: 2,
      title: 'So you\'ve bought coffee... now what?',
      date: '2h ago',
      commentCount: 3,
      shareCount: 2,
    },
  ],
  Popular: [
    {
      id: 1,
      title: 'Is tech making coffee better or worse?',
      date: 'Jan 7',
      commentCount: 29,
      shareCount: 16,
    },
    {
      id: 2,
      title: 'The most innovative things happening in coffee',
      date: 'Mar 19',
      commentCount: 24,
      shareCount: 12,
    },
  ],
  Trending: [
    {
      id: 1,
      title: 'Ask Me Anything: 10 answers to your questions about coffee',
      date: '2d ago',
      commentCount: 9,
      shareCount: 5,
    },
    {
      id: 2,
      title: 'The worst advice we\'ve ever heard about coffee',
      date: '4d ago',
      commentCount: 1,
      shareCount: 2,
    },
  ],
})

const atv = ref('Recent')
</script>

<template>
  <div class="w-100vw h-100vh flex flex-col items-center bg-gradient-to-r from-sky-400 to-blue-600">
    <h4 class="text-center my-0 text-4xl text-white pt-10">
      playground
    </h4>
    <!-- <NoButton @click="handleClick"> button </NoButton> -->
    <div class="w-full max-w-md px-2 py-16 sm:px-0">
      <TabGroup>
        <TabList v-model="atv" class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            v-for="category in Object.keys(categories)"
            :key="category"
            :name="category"
          >
            <button
              class="w-full rounded-lg py-2.5 text-sm cursor-pointer font-medium leading-5
              ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              :class="[
                true
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              ]"
            >
              {{ category }}
            </button>
          </Tab>
        </TabList>
        <TabPanels class="mt-2">
          <TabPanel>Recent</TabPanel>
          <TabPanel>Popular</TabPanel>
          <TabPanel>Trending</TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>
