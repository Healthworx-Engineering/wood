<script setup>
// Import composable if needed
import { useEnvironmentalData } from '~/composables/useEnvironmentalData'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Get environmental data for the product
const { 
  environmentalData, 
  isLoading, 
  error,
  environmentalScore 
} = useEnvironmentalData(computed(() => props.product.class))

// Compute color for score display
const scoreColor = computed(() => {
  if (!environmentalScore.value) return 'bg-gray-400'
  
  const score = environmentalScore.value.score
  if (score >= 4) return 'bg-green-500' // Good
  if (score >= 3) return 'bg-green-400' // Decent
  if (score >= 2) return 'bg-yellow-500' // Average
  if (score >= 1) return 'bg-orange-500' // Poor
  return 'bg-red-500' // Bad
})
</script>

<template>
  <div class="p-4">
    <!-- Product header -->
    <div class="mb-6 pb-4 border-b border-gray-200">
      <h2 class="text-xl font-semibold text-slate-800 capitalize mb-2">{{ product.class }}</h2>
      <div class="text-sm text-gray-500">
        Confidence: {{ Math.round(product.score * 100) }}%
      </div>
    </div>
    
    <!-- Loading state -->
    <div v-if="isLoading" class="py-8 text-center text-gray-500">
      Loading environmental data...
    </div>
    
    <!-- Error state -->
    <div v-else-if="error" class="py-8 text-center text-red-600">
      {{ error }}
    </div>
    
    <!-- Data loaded state -->
    <div v-else-if="environmentalData" class="space-y-6">
      <!-- Environmental score -->
      <div class="flex flex-col items-center mb-6">
        <div class="text-sm text-gray-500 mb-2">Environmental Score</div>
        <div 
          class="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2"
          :class="scoreColor"
        >
          {{ environmentalScore.score.toFixed(1) }}/5
        </div>
        <div class="text-sm text-gray-500">
          Confidence: {{ environmentalScore.confidence }}
        </div>
      </div>
      
      <!-- Environmental message -->
      <div class="bg-gray-100 p-4 rounded-md text-gray-700 text-sm leading-relaxed">
        {{ environmentalScore.message }}
      </div>
      
      <!-- Certifications section -->
      <div v-if="environmentalData.certifications && environmentalData.certifications.length" class="mt-6">
        <h3 class="text-lg font-medium text-slate-800 mb-3">Certifications</h3>
        <ul class="list-disc pl-5 space-y-1">
          <li 
            v-for="(cert, index) in environmentalData.certifications" 
            :key="index"
            class="text-gray-700 text-sm"
          >
            {{ cert }}
          </li>
        </ul>
      </div>
      
      <!-- Ingredients section -->
      <div v-if="environmentalData.ingredients && environmentalData.ingredients.length" class="mt-6">
        <h3 class="text-lg font-medium text-slate-800 mb-3">Key Ingredients</h3>
        <ul class="list-disc pl-5 space-y-1">
          <li 
            v-for="(ingredient, index) in environmentalData.ingredients" 
            :key="index"
            class="text-sm"
            :class="ingredient.harmful ? 'text-red-600' : 'text-gray-700'"
          >
            {{ ingredient.name }}
            <span 
              v-if="ingredient.harmful" 
              class="ml-2 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded"
            >
              ⚠️ Harmful
            </span>
          </li>
        </ul>
      </div>
      
      <!-- Alternatives section -->
      <div v-if="environmentalData.alternatives && environmentalData.alternatives.length" class="mt-6">
        <h3 class="text-lg font-medium text-slate-800 mb-3">Sustainable Alternatives</h3>
        <ul class="list-disc pl-5 space-y-1">
          <li 
            v-for="(alt, index) in environmentalData.alternatives" 
            :key="index"
            class="text-gray-700 text-sm"
          >
            {{ alt.name }} - Score: {{ alt.score }}/5
          </li>
        </ul>
      </div>
    </div>
    
    <!-- No data state -->
    <div v-else class="py-8 text-center">
      <p class="text-gray-500 mb-2">No environmental data available for this product.</p>
      <p class="text-gray-500 text-sm">Try scanning the barcode or product name more clearly.</p>
    </div>
  </div>
</template>