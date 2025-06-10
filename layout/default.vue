<template>
    <div class="flex flex-col min-h-screen bg-gray-50">
      <header class="bg-slate-800 text-white py-4 px-4 shadow-md">
        <div class="container mx-auto">
          <h1 class="text-2xl font-bold text-center">Environmental Product Scanner</h1>
          <p class="text-center text-slate-300 mt-1">Scan products to check their environmental impact</p>
        </div>
      </header>
      
      <main class="flex-1 container mx-auto px-4 py-6">
        <slot />
      </main>
      
      <footer class="bg-slate-800 text-white py-4 px-4">
        <div class="container mx-auto text-center">
          <p>&copy; 2025 Environmental Scanner Project</p>
        </div>
      </footer>
    </div>
  </template>