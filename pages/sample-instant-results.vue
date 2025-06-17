<script setup>
// Define page meta
definePageMeta({
  title: 'Sample Environmental Survey Results'
})

// Sample data that mimics the detailing service format
const sampleResults = {
  overallRisk: {
    level: 'Moderate',
    percentage: 65,
    color: 'yellow',
    description: 'Your assessment shows moderate environmental exposures that warrant attention.'
  },
  
  recommendations: [
    {
      id: 'basic_protection',
      name: 'Basic Protection',
      price: 299,
      duration: '2-3 hours implementation',
      badge: 'most popular',
      description: 'Essential environmental health improvements for your home',
      features: [
        'Air quality assessment and basic filtration',
        'Water quality testing and filtration recommendations',
        'Mold inspection of high-risk areas'
      ],
      perfectFor: [
        { icon: '🏠', text: 'New homeowners' },
        { icon: '👶', text: 'Families with children' },
        { icon: '🌱', text: 'Health-conscious individuals' }
      ],
      riskReduction: 40
    },
    {
      id: 'comprehensive_assessment',
      name: 'Comprehensive Assessment',
      price: 599,
      duration: '4-6 hours implementation',
      badge: 'recommended',
      description: 'Complete environmental health evaluation and remediation plan',
      features: [
        'Full home environmental audit',
        'Professional air and water quality testing',
        'Mold and moisture assessment',
        'Chemical exposure evaluation',
        'Personalized remediation plan'
      ],
      perfectFor: [
        { icon: '⚠️', text: 'High-risk exposures' },
        { icon: '🏥', text: 'Health conditions present' },
        { icon: '🔬', text: 'Detailed analysis needed' }
      ],
      riskReduction: 75
    },
    {
      id: 'premium_remediation',
      name: 'Premium Remediation',
      price: 1299,
      duration: '1-2 weeks implementation',
      badge: 'complete solution',
      description: 'Full-service environmental health transformation',
      features: [
        'Everything in Comprehensive Assessment',
        'Professional remediation services',
        'Advanced air purification systems',
        'Water treatment system installation',
        'Ongoing monitoring and maintenance'
      ],
      perfectFor: [
        { icon: '🚨', text: 'Severe exposures' },
        { icon: '🤱', text: 'Pregnancy/fertility concerns' },
        { icon: '💎', text: 'Premium health optimization' }
      ],
      riskReduction: 90
    }
  ],
  
  riskFactors: [
    {
      category: 'Mold & Moisture',
      score: 75,
      color: '#8B5CF6',
      issues: [
        'Visible mold in bathroom areas',
        'High humidity levels detected',
        'Poor ventilation in basement'
      ]
    },
    {
      category: 'Air Quality (VOCs)',
      score: 60,
      color: '#06B6D4',
      issues: [
        'Attached garage with vehicle storage',
        'Use of chemical cleaning products',
        'New furniture off-gassing'
      ]
    },
    {
      category: 'Water Quality',
      score: 45,
      color: '#3B82F6',
      issues: [
        'Unfiltered municipal water',
        'Old plumbing system',
        'Chlorine taste and odor'
      ]
    }
  ]
}

// Get risk color classes
function getRiskColor(percentage) {
  if (percentage >= 70) return 'text-red-600 bg-red-50'
  if (percentage >= 40) return 'text-yellow-600 bg-yellow-50'
  return 'text-green-600 bg-green-50'
}

function getRiskBorderColor(percentage) {
  if (percentage >= 70) return 'border-red-200'
  if (percentage >= 40) return 'border-yellow-200'
  return 'border-green-200'
}

// Selected package state
const selectedPackage = ref('comprehensive_assessment')
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Environmental Health Assessment</h1>
            <p class="text-gray-600 mt-1">Sample Instant Results</p>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-500">Assessment ID</div>
            <div class="font-mono text-sm">#EHA-2024-001</div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Overall Risk Level -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Your Risk Assessment</h2>
        
        <div class="flex items-center space-x-4 mb-6">
          <div 
            :class="[
              'px-4 py-2 rounded-full font-medium text-lg',
              getRiskColor(sampleResults.overallRisk.percentage)
            ]"
          >
            {{ sampleResults.overallRisk.level }} Risk
          </div>
          <div class="text-gray-600">
            {{ sampleResults.overallRisk.percentage }}% exposure level detected
          </div>
        </div>

        <p class="text-gray-700 mb-6">{{ sampleResults.overallRisk.description }}</p>

        <!-- Risk Factors -->
        <div class="space-y-4">
          <h3 class="font-medium text-gray-900">Primary Risk Factors:</h3>
          <div 
            v-for="factor in sampleResults.riskFactors" 
            :key="factor.category"
            :class="[
              'border rounded-lg p-4',
              getRiskBorderColor(factor.score)
            ]"
          >
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-medium text-gray-900">{{ factor.category }}</h4>
              <div 
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  getRiskColor(factor.score)
                ]"
              >
                {{ factor.score }}% Risk
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                class="h-2 rounded-full transition-all duration-300"
                :style="{ 
                  width: `${factor.score}%`,
                  backgroundColor: factor.color
                }"
              ></div>
            </div>
            
            <!-- Issues List -->
            <ul class="space-y-1">
              <li 
                v-for="issue in factor.issues" 
                :key="issue"
                class="text-sm text-gray-600 flex items-start"
              >
                <span class="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {{ issue }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Recommendations Header -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Choose Your Protection Plan</h2>
        <p class="text-gray-600">Select the environmental health package that best fits your needs</p>
      </div>

      <!-- Package Selection -->
      <div class="space-y-6">
        <div 
          v-for="pkg in sampleResults.recommendations" 
          :key="pkg.id"
          :class="[
            'bg-white rounded-lg shadow-sm border-2 p-6 cursor-pointer transition-all',
            selectedPackage === pkg.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
          ]"
          @click="selectedPackage = pkg.id"
        >
          <!-- Package Header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div 
                :class="[
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                  selectedPackage === pkg.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                ]"
              >
                <div 
                  v-if="selectedPackage === pkg.id"
                  class="w-3 h-3 bg-white rounded-full"
                ></div>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900">{{ pkg.name }}</h3>
                <div v-if="pkg.badge" class="inline-block">
                  <span 
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      pkg.badge === 'most popular' ? 'bg-green-100 text-green-800' :
                      pkg.badge === 'recommended' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    ]"
                  >
                    {{ pkg.badge }}
                  </span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-gray-900">${{ pkg.price }}</div>
              <div class="text-sm text-gray-500">{{ pkg.duration }}</div>
            </div>
          </div>

          <!-- Package Description -->
          <p class="text-gray-700 mb-4">{{ pkg.description }}</p>

          <!-- Features -->
          <div class="mb-4">
            <h4 class="font-medium text-gray-900 mb-2">What's included:</h4>
            <ul class="space-y-2">
              <li 
                v-for="feature in pkg.features" 
                :key="feature"
                class="flex items-start text-sm text-gray-700"
              >
                <svg class="w-4 h-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Perfect For -->
          <div class="mb-4">
            <h4 class="font-medium text-gray-900 mb-2">Perfect for:</h4>
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="item in pkg.perfectFor" 
                :key="item.text"
                class="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                <span>{{ item.icon }}</span>
                <span class="text-gray-700">{{ item.text }}</span>
              </div>
            </div>
          </div>

          <!-- Risk Reduction -->
          <div class="bg-green-50 border border-green-200 rounded-lg p-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-green-800">Expected Risk Reduction</span>
              <span class="text-lg font-bold text-green-600">{{ pkg.riskReduction }}%</span>
            </div>
            <div class="w-full bg-green-200 rounded-full h-2 mt-2">
              <div 
                class="h-2 bg-green-500 rounded-full transition-all duration-300"
                :style="{ width: `${pkg.riskReduction}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <button class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Schedule Assessment
          </button>
          <button class="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Download Report
          </button>
          <button class="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Get Quote
          </button>
        </div>
        
        <div class="mt-4 text-center">
          <p class="text-sm text-gray-600">
            Need help choosing? 
            <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Schedule a free consultation</a>
          </p>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 class="font-semibold text-blue-900 mb-2">Why Choose Professional Environmental Assessment?</h3>
        <ul class="space-y-2 text-sm text-blue-800">
          <li class="flex items-start">
            <svg class="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Certified environmental health specialists
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Professional-grade testing equipment
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Personalized remediation strategies
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Ongoing support and monitoring
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for the assessment page */
.assessment-card {
  transition: all 0.2s ease-in-out;
}

.assessment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* Progress bar animations */
@keyframes fillProgress {
  from { width: 0%; }
  to { width: var(--progress-width); }
}

.progress-bar {
  animation: fillProgress 1s ease-out;
}
</style>
