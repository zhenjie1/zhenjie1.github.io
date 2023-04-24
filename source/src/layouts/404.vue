<script setup lang="ts">
import generatedRoutes from '~pages'

const route = useRoute()
const targetPath = generatedRoutes.find(v => v.path === route.path)

if (targetPath) location.reload()
const show = ref(!targetPath)

useTitle('功能开发中')
</script>

<template>
  <main class="text-center pt-10">
    <div v-if="show" class="py-40 shadow m10">
      <p class="text-5xl text-$main">
        功能开发中
      </p>
      <p class="text-gray-300 mt-2 text-2rem">
        In the developing
      </p>
    </div>
    <RouterView />
  </main>
</template>
