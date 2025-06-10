<script setup>
import { surveyQuestions, surveyConfig, riskCategories } from '~/data/surveyQuestions.js'

const props = defineProps({
  source: {
    type: String,
    default: 'general'
  }
})

// Survey state
const currentSectionIndex = ref(0)
const responses = ref({})
const sectionOrder = ref([])
const isComplete = ref(false)
const showResults = ref(false)

// Initialize survey based on source
onMounted(() => {
  initializeSurvey()
})

function initializeSurvey() {
  const config = surveyConfig.sourceConfigurations[props.source] || surveyConfig.sourceConfigurations.general
  
  if (config.order === 'defaultOrder') {
    sectionOrder.value = [...surveyConfig.defaultOrder]
  } else {
    sectionOrder.value = [...config.order]
  }
  
  // Remove skipped sections
  if (config.skipSections && config.skipSections.length > 0) {
    sectionOrder.value = sectionOrder.value.filter(section => !config.skipSections.includes(section))
  }
}

// Current section computed
const currentSection = computed(() => {
  if (currentSectionIndex.value >= sectionOrder.value.length) return null
  const sectionId = sectionOrder.value[currentSectionIndex.value]
  return surveyQuestions[sectionId]
})

// Progress computed
const progress = computed(() => {
  return Math.round((currentSectionIndex.value / sectionOrder.value.length) * 100)
})

// Handle section completion
function handleSectionComplete(sectionResponses) {
  // Store responses
  Object.assign(responses.value, sectionResponses)
  
  // Check conditional logic
  applyConditionalLogic()
  
  // Move to next section
  if (currentSectionIndex.value < sectionOrder.value.length - 1) {
    currentSectionIndex.value++
  } else {
    completeSurvey()
  }
}

// Apply conditional logic based on responses
function applyConditionalLogic() {
  // Apply show rules
  surveyConfig.conditionalRules.showRules.forEach(rule => {
    if (evaluateCondition(rule.condition)) {
      // Logic to show additional questions would go here
      // For now, questions are already conditionally shown in SurveySection
    }
  })
}

// Evaluate condition string (simplified version)
function evaluateCondition(condition) {
  // This is a simplified version - in production you'd want a more robust parser
  try {
    // Replace dot notation with bracket notation for responses
    const evaluableCondition = condition.replace(/(\w+)\.(\w+)/g, 'responses.value["$1"]["$2"]')
    return eval(evaluableCondition)
  } catch (error) {
    console.warn('Error evaluating condition:', condition, error)
    return false
  }
}

// Complete survey
function completeSurvey() {
  isComplete.value = true
  showResults.value = true
  
  // Emit completion event
  emit('complete', {
    responses: responses.value,
    source: props.source
  })
}

// Navigation functions
function goToPreviousSection() {
  if (currentSectionIndex.value > 0) {
    currentSectionIndex.value--
  }
}

function goToSection(index) {
  if (index >= 0 && index < sectionOrder.value.length) {
    currentSectionIndex.value = index
  }
}

const emit = defineEmits(['complete'])
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Progress Bar -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-2">
        <h1 class="text-2xl font-bold text-dwelling-gray-900 font-heading">Environmental Health Survey</h1>
        <span class="text-sm text-dwelling-gray-600">{{ progress }}% Complete</span>
      </div>
      <div class="w-full bg-dwelling-accent rounded-full h-3">
        <div 
          class="bg-dwelling-primary h-3 rounded-full transition-all duration-300"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>

    <!-- Section Navigation -->
    <div class="mb-6">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(sectionId, index) in sectionOrder"
          :key="sectionId"
          @click="goToSection(index)"
          :class="[
            'px-3 py-1 text-xs rounded-dwelling border transition-colors',
            index === currentSectionIndex 
              ? 'bg-dwelling-primary text-white border-dwelling-primary' 
              : index < currentSectionIndex 
                ? 'bg-dwelling-success/10 text-dwelling-success border-dwelling-success/30 hover:bg-dwelling-success/20' 
                : 'bg-dwelling-gray-100 text-dwelling-gray-600 border-dwelling-gray-300 hover:bg-dwelling-gray-200'
          ]"
          :disabled="index > currentSectionIndex"
        >
          {{ surveyQuestions[sectionId]?.title || sectionId }}
        </button>
      </div>
    </div>

    <!-- Current Section -->
    <div v-if="currentSection && !showResults" class="bg-white rounded-dwelling shadow-dwelling-lg">
      <SurveySection
        :section="currentSection"
        :responses="responses[currentSection.id] || {}"
        @complete="handleSectionComplete"
        @previous="goToPreviousSection"
        :can-go-back="currentSectionIndex > 0"
      />
    </div>

    <!-- Results -->
    <div v-if="showResults" class="bg-white rounded-dwelling shadow-dwelling-lg">
      <SurveyResults
        :responses="responses"
        :risk-categories="riskCategories"
      />
    </div>
  </div>
</template>
