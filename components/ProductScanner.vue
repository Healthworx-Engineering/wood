<script setup>
// Import the composable (Option 1 - explicit import)
import { useObjectDetection } from '~/composables/useObjectDetection'

// const { $tf } = useNuxtApp()

// Or rely on Nuxt's auto-imports (Option 2)
// No import needed if using Nuxt's auto-imports feature with the composable in the composables directory

const isScanning = ref(false)
const detectedProducts = ref([])
const selectedProduct = ref(null)

// Load object detection model when component mounts
const { model, isModelLoading, detectObjects } = useObjectDetection()

// Function to handle scanning
async function handleScan(imageData) {
  if (!model.value) return
  
  isScanning.value = true
  try {
    // Detect objects in the image
    const predictions = await detectObjects(imageData)
    
    // Filter predictions (only keep those with high confidence)
    detectedProducts.value = predictions.filter(pred => pred.score > 0.66)
    
    // Auto-select the prediction with highest confidence if available
    if (detectedProducts.value.length > 0) {
      selectedProduct.value = detectedProducts.value[0]
    }
  } catch (error) {
    console.error('Error during object detection:', error)
  } finally {
    isScanning.value = false
  }
}

// Function to select a product
function selectProduct(product) {
  selectedProduct.value = product
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <!-- Loading state -->
    <div v-if="isModelLoading" class="p-8 text-center">
      <div class="text-lg font-medium text-blue-600">Loading TensorFlow model...</div>
    </div>
    
    <!-- Scanner ready state -->
    <div v-else class="md:flex">
      <!-- Camera section -->
      <div class="relative w-full h-[50vh] md:h-[70vh] md:w-3/5">
        <CameraView @capture="handleScan" />
        <DetectionOverlay 
          :detections="detectedProducts" 
          :selected-detection="selectedProduct"
          @select="selectProduct" 
        />
      </div>
      
      <!-- Info section -->
      <div class="bg-gray-50 p-6 w-full md:w-2/5 overflow-y-auto md:h-[70vh]">
        <div v-if="!selectedProduct" class="h-full flex items-center justify-center text-center">
          <p class="text-gray-500 text-lg">Point your camera at a product to scan it</p>
        </div>
        <EnvironmentalInfo 
          v-else 
          :product="selectedProduct" 
        />
      </div>
    </div>
  </div>
</template>