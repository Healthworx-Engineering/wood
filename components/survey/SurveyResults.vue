<script setup>
import { surveyQuestions } from '~/data/surveyQuestions.js'

const props = defineProps({
  responses: {
    type: Object,
    required: true
  },
  riskCategories: {
    type: Object,
    required: true
  }
})

// Calculate risk scores by category
const riskScores = computed(() => {
  const scores = {}
  
  // Initialize all categories with 0
  Object.keys(props.riskCategories).forEach(category => {
    scores[category] = {
      score: 0,
      maxScore: 0,
      questions: []
    }
  })
  
  // Calculate scores from responses
  Object.entries(props.responses).forEach(([sectionId, sectionResponses]) => {
    const section = surveyQuestions[sectionId]
    if (!section) return
    
    section.questions.forEach(question => {
      if (!question.scoring || !question.categories) return
      
      const response = sectionResponses[question.id]
      if (response === undefined || response === null) return
      
      let questionScore = 0
      
      // Calculate base score
      if (question.type === 'radio' && question.options) {
        const optionIndex = question.options.indexOf(response)
        if (optionIndex !== -1 && question.scoring[optionIndex] !== undefined) {
          questionScore = question.scoring[optionIndex]
        }
      } else if (question.type === 'number') {
        // For number inputs, you might want custom scoring logic
        questionScore = response > 0 ? 1 : 0
      }
      
      // Apply multipliers
      if (question.multiplier && questionScore > 0) {
        questionScore *= question.multiplier
      }
      
      // Add to relevant categories
      question.categories.forEach(category => {
        if (scores[category]) {
          scores[category].score += questionScore
          scores[category].maxScore += Math.max(...(question.scoring || [1]))
          scores[category].questions.push({
            text: question.text,
            response: response,
            score: questionScore,
            intervention: question.intervention
          })
        }
      })
    })
  })
  
  return scores
})

// Get top risk categories
const topRiskCategories = computed(() => {
  return Object.entries(riskScores.value)
    .map(([category, data]) => ({
      category,
      ...data,
      percentage: data.maxScore > 0 ? Math.round((data.score / data.maxScore) * 100) : 0
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5)
})

// Overall risk level
const overallRiskLevel = computed(() => {
  const totalScore = Object.values(riskScores.value).reduce((sum, cat) => sum + cat.score, 0)
  const totalMaxScore = Object.values(riskScores.value).reduce((sum, cat) => sum + cat.maxScore, 0)
  
  if (totalMaxScore === 0) return { level: 'Low', percentage: 0, color: 'green' }
  
  const percentage = Math.round((totalScore / totalMaxScore) * 100)
  
  if (percentage >= 70) return { level: 'High', percentage, color: 'red' }
  if (percentage >= 40) return { level: 'Moderate', percentage, color: 'yellow' }
  return { level: 'Low', percentage, color: 'green' }
})

// Get color class for risk level
function getRiskColor(percentage) {
  if (percentage >= 70) return 'text-dwelling-danger bg-dwelling-danger/10'
  if (percentage >= 40) return 'text-dwelling-warning bg-dwelling-warning/10'
  return 'text-dwelling-success bg-dwelling-success/10'
}

function getCategoryColor(category) {
  return props.riskCategories[category]?.color || '#6B7280'
}
</script>

<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-dwelling-gray-900 mb-2 font-heading">Your Environmental Health Assessment</h2>
      <div class="w-16 h-1 bg-dwelling-primary rounded"></div>
    </div>

    <!-- Overall Risk Level -->
    <div class="mb-8 p-6 bg-dwelling-accent-light rounded-dwelling">
      <h3 class="text-xl font-semibold text-dwelling-gray-900 mb-4">Overall Risk Level</h3>
      <div class="flex items-center space-x-4">
        <div 
          :class="[
            'px-4 py-2 rounded-full font-medium',
            overallRiskLevel.color === 'red' ? 'bg-dwelling-danger/10 text-dwelling-danger' :
            overallRiskLevel.color === 'yellow' ? 'bg-dwelling-warning/10 text-dwelling-warning' :
            'bg-dwelling-success/10 text-dwelling-success'
          ]"
        >
          {{ overallRiskLevel.level }} Risk
        </div>
        <div class="text-dwelling-gray-600">
          {{ overallRiskLevel.percentage }}% of maximum possible exposure
        </div>
      </div>
    </div>

    <!-- Top Risk Categories -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold text-dwelling-gray-900 mb-6">Primary Areas of Concern</h3>
      
      <div v-if="topRiskCategories.length === 0" class="text-dwelling-gray-500 text-center py-8">
        Great news! Your responses indicate minimal environmental health risks.
      </div>
      
      <div v-else class="space-y-4">
        <div
          v-for="item in topRiskCategories"
          :key="item.category"
          class="border border-dwelling-gray-200 rounded-dwelling p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-medium text-dwelling-gray-900">{{ item.category }}</h4>
            <div 
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                getRiskColor(item.percentage)
              ]"
            >
              {{ item.percentage }}% Risk
            </div>
          </div>
          
          <p class="text-dwelling-gray-600 mb-4">{{ riskCategories[item.category]?.description }}</p>
          
          <!-- Progress Bar -->
          <div class="w-full bg-dwelling-accent rounded-full h-2 mb-4">
            <div 
              class="h-2 rounded-full transition-all duration-300"
              :style="{ 
                width: `${item.percentage}%`,
                backgroundColor: getCategoryColor(item.category)
              }"
            ></div>
          </div>
          
          <!-- Key Questions -->
          <div v-if="item.questions.length > 0" class="mt-4">
            <h5 class="font-medium text-dwelling-gray-900 mb-2">Key Contributing Factors:</h5>
            <ul class="space-y-2">
              <li
                v-for="(question, index) in item.questions.slice(0, 3)"
                :key="index"
                class="text-sm text-dwelling-gray-600 flex items-start"
              >
                <span class="w-2 h-2 bg-dwelling-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span class="font-medium">{{ question.response }}</span> - {{ question.text }}
                  <div v-if="question.intervention" class="text-dwelling-success mt-1">
                    💡 {{ question.intervention }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Recommendations -->
    <div class="mb-8 p-6 bg-dwelling-accent-light rounded-dwelling">
      <h3 class="text-xl font-semibold text-dwelling-gray-900 mb-4">Next Steps</h3>
      <div class="space-y-3 text-dwelling-gray-700">
        <p v-if="overallRiskLevel.level === 'High'">
          🔴 Your assessment indicates significant environmental exposures. We recommend scheduling a consultation to discuss immediate action steps.
        </p>
        <p v-else-if="overallRiskLevel.level === 'Moderate'">
          🟡 Your assessment shows moderate environmental exposures. Consider implementing some protective measures and monitoring your environment.
        </p>
        <p v-else>
          🟢 Your assessment indicates low environmental exposures. Continue your current protective practices and stay informed about environmental health.
        </p>
        
        <div class="mt-4 space-y-2">
          <p class="font-medium">Recommended Actions:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li v-if="topRiskCategories.some(cat => cat.category.includes('Water'))">
              Consider water quality testing and filtration systems
            </li>
            <li v-if="topRiskCategories.some(cat => cat.category.includes('Air'))">
              Improve indoor air quality with proper ventilation and air purifiers
            </li>
            <li v-if="topRiskCategories.some(cat => cat.category.includes('Mold'))">
              Address moisture issues and consider professional mold assessment
            </li>
            <li v-if="topRiskCategories.some(cat => cat.category.includes('Chemical'))">
              Switch to safer household products and improve ventilation
            </li>
            <li>Schedule regular health check-ups with your healthcare provider</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-4">
      <button class="px-6 py-3 bg-dwelling-primary text-white rounded-dwelling hover:bg-dwelling-primary-light transition-colors">
        Schedule Consultation
      </button>
      <button class="px-6 py-3 border border-dwelling-gray-300 text-dwelling-gray-700 rounded-dwelling hover:bg-dwelling-gray-50 transition-colors">
        Download Report
      </button>
      <button class="px-6 py-3 border border-dwelling-gray-300 text-dwelling-gray-700 rounded-dwelling hover:bg-dwelling-gray-50 transition-colors">
        Retake Survey
      </button>
    </div>
  </div>
</template>
