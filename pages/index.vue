<script setup>
// Import any dependencies if needed
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Environmental Health Tools</h1>
      <p class="text-lg text-gray-600">Assess your environmental exposures and scan products for health risks</p>
    </div>

    <!-- Navigation Cards -->
    <!-- <div class="grid md:grid-cols-2 gap-8 mb-8">
      Product Scanner Card
      <div class="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Product Scanner</h2>
        <p class="text-gray-600 mb-6">Use your camera to scan products and get instant environmental health information.</p>
        <div class="bg-gray-50 rounded-lg p-4">
          <ProductScanner />
        </div>
      </div> -->

      <!-- Environmental Survey Card -->
      <div class="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Environmental Health Survey</h2>
        <p class="text-gray-600 mb-6">Take our comprehensive assessment to identify potential environmental health risks in your home and lifestyle.</p>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h3 class="font-medium text-gray-900">Complete Assessment</h3>
              <p class="text-sm text-gray-600">Full environmental health evaluation</p>
            </div>
            <NuxtLink 
              to="/survey?source=general"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Survey
            </NuxtLink>
          </div>

          <div class="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div>
              <h3 class="font-medium text-gray-900">High Risk Screening</h3>
              <p class="text-sm text-gray-600">Focused assessment for high-risk exposures</p>
            </div>
            <NuxtLink 
              to="/survey?source=high_risk"
              class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Start Screening
            </NuxtLink>
          </div>

          <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <h3 class="font-medium text-gray-900">Basic Screening</h3>
              <p class="text-sm text-gray-600">Quick environmental health check</p>
            </div>
            <NuxtLink 
              to="/survey?source=basic_screening"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Basic
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Features -->
    <div class="bg-gray-50 rounded-lg p-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">Why Use Our Environmental Health Tools?</h2>
      
      <div class="grid md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Comprehensive Assessment</h3>
          <p class="text-gray-600 text-sm">Evaluate multiple environmental factors that could impact your health</p>
        </div>

        <div class="text-center">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Instant Results</h3>
          <p class="text-gray-600 text-sm">Get immediate feedback and personalized recommendations</p>
        </div>

        <div class="text-center">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Evidence-Based</h3>
          <p class="text-gray-600 text-sm">Based on current environmental health research and guidelines</p>
        </div>
      </div>
    </div>
  </div>
</template>
