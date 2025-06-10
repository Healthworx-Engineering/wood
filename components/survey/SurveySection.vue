<script setup>
import SurveyRadio from './inputs/SurveyRadio.vue'
import SurveyNumber from './inputs/SurveyNumber.vue'
import SurveyText from './inputs/SurveyText.vue'
import SurveyTextarea from './inputs/SurveyTextarea.vue'

const props = defineProps({
  section: {
    type: Object,
    required: true
  },
  responses: {
    type: Object,
    default: () => ({})
  },
  canGoBack: {
    type: Boolean,
    default: false
  }
})

const components ={
  SurveyRadio,
  SurveyNumber,
  SurveyText,
  SurveyTextarea
}

console.log(props)



const emit = defineEmits(['complete', 'previous'])

// Local responses state
const localResponses = ref({ ...props.responses })

// Watch for prop changes
watch(() => props.responses, (newResponses) => {
  localResponses.value = { ...newResponses }
}, { deep: true })

// Validation state
const errors = ref({})

// Check if question should be shown based on dependencies
function shouldShowQuestion(question) {
  if (!question.dependsOn) return true
  
  const dependentValue = localResponses.value[question.dependsOn]
  return dependentValue === question.dependsOnValue
}

// Get visible questions
const visibleQuestions = computed(() => {
  return props.section.questions.filter(shouldShowQuestion)
})

// Validate responses
function validateResponses() {
  errors.value = {}
  let isValid = true
  
  visibleQuestions.value.forEach(question => {
    if (question.required) {
      const value = localResponses.value[question.id]
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errors.value[question.id] = 'This field is required'
        isValid = false
      }
    }
  })
  
  return isValid
}

// Handle input change
function handleInputChange(questionId, value) {
  localResponses.value[questionId] = value
  
  // Clear error if exists
  if (errors.value[questionId]) {
    delete errors.value[questionId]
  }
}

// Handle section completion
function handleComplete() {
  if (validateResponses()) {
    emit('complete', { [props.section.id]: localResponses.value })
  }
}

// Handle previous
function handlePrevious() {
  emit('previous')
}

// Get input component type
function getInputType(question) {

  // console.log('Question Type:', question.type)
  // console.log('Full Question:', question)
  
  try {
    switch (question.type) {
      case 'radio':
        // console.log('Rendering SurveyRadio')
        return components.SurveyRadio
    case 'number':
      // console.log('Rendering SurveyNumber')
      return components.SurveyNumber
    case 'text':
      // console.log('Rendering SurveyText')
      return components.SurveyText
    case 'textarea':
      // console.log('Rendering SurveyTextarea')
      return components.SurveyTextarea
      default:
        console.warn('Fallback to SurveyText for unknown type')
        return components.SurveyText
    }
  } catch (error) {
    console.error('Error in getInputType:', error)
    return 'SurveyText'
  }
}
</script>

<template>
  <div class="p-8">
    <!-- Section Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-dwelling-gray-900 mb-2 font-heading">{{ section.title }}</h2>
      <div class="w-16 h-1 bg-dwelling-primary rounded"></div>
    </div>

    <!-- Questions -->
    <div class="space-y-8">
      <div
        v-for="question in visibleQuestions"
        :key="question.id"
        class="question-container"
      >
        <!-- Question Text -->
        <div class="mb-4">
          <label 
            :for="question.id"
            class="block text-lg font-medium text-dwelling-gray-900 mb-2"
          >
            {{ question.text }}
            <span v-if="question.required" class="text-dwelling-danger ml-1">*</span>
          </label>
          
          <!-- Unit/Notes -->
          <div v-if="question.unit || question.notes" class="text-sm text-dwelling-gray-600 mb-2">
            <p v-if="question.unit" class="italic">{{ question.unit }}</p>
            <p v-if="question.notes" class="text-dwelling-gray-500">{{ question.notes }}</p>
          </div>
        </div>

        <!-- Input Component -->
        <component
          :is="getInputType(question)"
          :id="question.id"
          :question="question"
          :value="localResponses[question.id]"
          :error="errors[question.id]"
          @update:value="handleInputChange(question.id, $event)"
        />

        <!-- Error Message -->
        <div v-if="errors[question.id]" class="mt-2 text-sm text-dwelling-danger">
          {{ errors[question.id] }}
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between items-center mt-12 pt-8 border-t border-dwelling-gray-200">
      <button
        v-if="canGoBack"
        @click="handlePrevious"
        class="px-6 py-3 border border-dwelling-gray-300 rounded-dwelling text-dwelling-gray-700 hover:bg-dwelling-gray-50 transition-colors"
      >
        ← Previous Section
      </button>
      <div v-else></div>

      <button
        @click="handleComplete"
        class="px-8 py-3 bg-dwelling-primary text-white rounded-dwelling hover:bg-dwelling-primary-light transition-colors font-medium"
      >
        Continue →
      </button>
    </div>
  </div>
</template>

<style scoped>
.question-container {
  @apply border-l-4 border-transparent pl-4 transition-all duration-200;
}

.question-container:hover {
  @apply border-dwelling-primary/30 bg-dwelling-accent-light/50;
}
</style>
