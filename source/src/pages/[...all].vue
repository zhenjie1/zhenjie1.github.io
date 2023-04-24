<script setup lang="ts">
import generatedRoutes from '~pages'

const route = useRoute()

const targetPath = generatedRoutes.find(v => v.path === route.path)
if (targetPath) location.reload()
</script>

<template>
  <div />
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
