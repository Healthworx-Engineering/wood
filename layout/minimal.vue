<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
      <main class="flex-1 container mx-auto px-4 py-6">
        <slot />
      </main>
      
      <div class="bg-slate-800 py-4 flex justify-center gap-8">
        <NuxtLink to="/" class="text-white font-medium hover:underline">Home</NuxtLink>
        <NuxtLink to="/about" class="text-white font-medium hover:underline">About</NuxtLink>
      </div>
    </div>
  </template>