// composables/useObjectDetection.ts
import { ref, onMounted } from 'vue'

export const useObjectDetection = () => {
  const model = ref(null)
  const isModelLoading = ref(true)
  const error = ref(null)
  
  onMounted(async () => {
    try {
      // Get TF instance from plugin
      const { $tf, $tfReady } = useNuxtApp()
      
      if (!$tfReady) {
        throw new Error('TensorFlow not initialized')
      }
      
      // Import the model and ensure TF is fully ready
      await $tf.ready()
      
      // Use dynamic import with await to ensure everything loads properly
      const cocoSsd = await import('@tensorflow-models/coco-ssd')
      
      console.log('Loading COCO-SSD model...')
      
      // Load a specific, lighter model variant
      model.value = await cocoSsd.load({
        modelUrl: 'https://storage.googleapis.com/tfjs-models/savedmodel/ssdlite_mobilenet_v2/model.json'
      })
      
      console.log('COCO-SSD model loaded successfully')
      isModelLoading.value = false
    } catch (err) {
      console.error('Failed to load TensorFlow model:', err)
      error.value = 'Failed to load object detection model: ' + (err.message || String(err))
      isModelLoading.value = false
    }
  })
  
  // Make sure to add proper error handling around the detection
  async function detectObjects(imageElement) {
    if (!model.value) {
      throw new Error('Model not loaded')
    }
    
    try {
      // Fix: convert canvas to ImageData if needed
      let element = imageElement
      if (imageElement instanceof HTMLCanvasElement) {
        const ctx = imageElement.getContext('2d')
        element = ctx.getImageData(0, 0, imageElement.width, imageElement.height)
      }
      
      // Perform detection
      const predictions = await model.value.detect(element)
      return predictions
    } catch (err) {
      console.error('Error during object detection:', err)
      throw new Error('Detection failed: ' + (err.message || String(err)))
    }
  }
  
  return {
    model,
    isModelLoading,
    error,
    detectObjects
  }
}