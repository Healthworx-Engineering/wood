<script setup>
const props = defineProps({
  width: {
    type: Number,
    default: 640
  },
  height: {
    type: Number,
    default: 480
  }
})

const emit = defineEmits(['capture'])

const videoRef = ref(null)
const canvasRef = ref(null)
const stream = ref(null)
const isStreamActive = ref(false)
const errorMessage = ref('')

// Setup camera when component is mounted
onMounted(async () => {
  try {
    // Request camera access
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: { 
        width: { ideal: props.width },
        height: { ideal: props.height },
        facingMode: 'environment' // Use rear camera if available
      },
      audio: false
    })
    
    // Set video stream
    if (videoRef.value) {
      videoRef.value.srcObject = stream.value
      isStreamActive.value = true
    }
  } catch (error) {
    console.error('Failed to access camera:', error)
    errorMessage.value = 'Camera access denied or not available'
  }
})

// Cleanup when component is unmounted
onBeforeUnmount(() => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    isStreamActive.value = false
  }
})

// Function to capture frame from video
function captureFrame() {
  if (!videoRef.value || !isStreamActive.value) return
  
  const canvas = canvasRef.value
  const video = videoRef.value
  const context = canvas.getContext('2d')
  
  // Set canvas dimensions to match video
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  
  // Draw video frame to canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height)
  
  // Get image data and emit
  emit('capture', canvas)
}

// Auto capture frames at intervals
let captureInterval = null

onMounted(() => {
  captureInterval = setInterval(() => {
    if (isStreamActive.value) {
      captureFrame()
    }
  }, 1000) // Capture frame every second
})

onBeforeUnmount(() => {
  if (captureInterval) {
    clearInterval(captureInterval)
  }
})
</script>

<template>
  <div class="relative w-full h-full bg-black">
    <!-- Error message -->
    <div 
      v-if="errorMessage" 
      class="absolute inset-0 flex items-center justify-center bg-red-100 text-red-800 p-4 text-center"
    >
      {{ errorMessage }}
    </div>
    
    <!-- Video feed -->
    <video
      v-else
      ref="videoRef"
      :width="width"
      :height="height"
      autoplay
      playsinline
      muted
      class="absolute w-full h-full object-cover"
    ></video>
    
    <!-- Hidden canvas for capturing frames -->
    <canvas
      ref="canvasRef"
      :width="width"
      :height="height"
      class="hidden"
    ></canvas>
    
    <!-- Scan button -->
    <button 
      class="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-full shadow-lg transition-colors font-medium"
      @click="captureFrame"
      :disabled="!isStreamActive"
    >
      Scan Now
    </button>
  </div>
</template>