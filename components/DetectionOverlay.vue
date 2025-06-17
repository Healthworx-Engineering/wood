<script setup>
const props = defineProps({
  detections: {
    type: Array,
    default: () => []
  },
  selectedDetection: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['select'])

// Function to handle click on detection box
function selectDetection(detection) {
  emit('select', detection)
}
</script>

<template>
  <div class="absolute inset-0 pointer-events-none">
    <div 
      v-for="(detection, index) in detections" 
      :key="index"
      class="absolute border-2 pointer-events-auto cursor-pointer transition-colors"
      :class="[
        selectedDetection === detection 
          ? 'border-fuchsia-500' 
          : 'border-cyan-400'
      ]"
      :style="{
        left: `${detection.bbox[0]}px`,
        top: `${detection.bbox[1]}px`,
        width: `${detection.bbox[2]}px`,
        height: `${detection.bbox[3]}px`
      }"
      @click="selectDetection(detection)"
    >
      <div 
        class="absolute -top-7 left-0 px-2 py-1 text-xs rounded text-black font-semibold whitespace-nowrap"
        :class="[
          selectedDetection === detection 
            ? 'bg-fuchsia-500/70' 
            : 'bg-cyan-400/70'
        ]"
      >
        {{ detection.class }} ({{ Math.round(detection.score * 100) }}%)
      </div>
    </div>
  </div>
</template>