// composables/useEnvironmentalData.ts
import { ref, computed, watch } from 'vue'

export const useEnvironmentalData = (productName) => {
  const environmentalData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  
  // Environmental score computed from data
  const environmentalScore = computed(() => {
    if (!environmentalData.value) {
      return {
        score: 2.5,
        confidence: 'low',
        message: 'Insufficient data for complete assessment'
      }
    }
    
    // Calculate score based on available data
    let score = 0
    let factors = 0
    
    // Check if product is EPA certified
    if (environmentalData.value.certifications && 
        environmentalData.value.certifications.includes('EPA Safer Choice')) {
      score += 4
      factors += 1
    }
    
    // Check harmful ingredients
    if (environmentalData.value.ingredients) {
      const harmfulCount = environmentalData.value.ingredients.filter(i => i.harmful).length
      if (harmfulCount === 0 && environmentalData.value.ingredients.length > 0) {
        score += 4
        factors += 1
      } else if (harmfulCount > 0) {
        score += Math.max(0, 3 - harmfulCount)
        factors += 1
      }
    }
    
    // Calculate final score
    const finalScore = factors > 0 ? score / factors : 2.5
    
    // Determine confidence level
    let confidence = 'low'
    if (factors >= 3) confidence = 'high'
    else if (factors >= 1) confidence = 'medium'
    
    // Generate appropriate message
    let message = ''
    if (finalScore >= 4) {
      message = 'This product appears to be environmentally friendly with minimal negative impact.'
    } else if (finalScore >= 3) {
      message = 'This product has a moderate environmental impact. Some aspects are good, but there is room for improvement.'
    } else if (finalScore >= 2) {
      message = 'This product has some concerning environmental impacts. Consider alternatives with better profiles.'
    } else {
      message = 'This product may have significant negative environmental impacts. Look for more sustainable alternatives.'
    }
    
    return {
      score: finalScore,
      confidence,
      message
    }
  })
  
  // Fetch environmental data when productName changes
  watch(productName, async (newName) => {
    if (!newName) {
      environmentalData.value = null
      return
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      // In a real implementation, we would connect to EPA's Envirofacts API
      // For now, we'll simulate API response with mock data
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay
      
      // Mock data based on product name
      const mockData = createMockData(newName)
      environmentalData.value = mockData
    } catch (err) {
      console.error('Error fetching environmental data:', err)
      error.value = 'Failed to fetch environmental data'
    } finally {
      isLoading.value = false
    }
  }, { immediate: true })
  
  // Mock data generation (replace with real API calls)
  function createMockData(productName) {
    const name = productName.toLowerCase()
    
    // Common household products with mock environmental data
    if (name.includes('cleaning') || name.includes('detergent') || name.includes('soap')) {
      return {
        certifications: ['EPA Safer Choice'],
        ingredients: [
          { name: 'Water', harmful: false },
          { name: 'Sodium Laureth Sulfate', harmful: true },
          { name: 'Fragrance', harmful: false }
        ],
        alternatives: [
          { name: 'Eco-Clean All Purpose', score: 4.5 },
          { name: 'Green Works', score: 4.0 }
        ]
      }
    } else if (name.includes('bottle') || name.includes('plastic')) {
      return {
        certifications: [],
        ingredients: [
          { name: 'Polyethylene Terephthalate (PET)', harmful: true },
          { name: 'High-Density Polyethylene (HDPE)', harmful: true }
        ],
        alternatives: [
          { name: 'Glass Containers', score: 4.5 },
          { name: 'Stainless Steel Bottles', score: 4.8 }
        ]
      }
    } else if (name.includes('paper') || name.includes('book') || name.includes('notebook')) {
      return {
        certifications: ['FSC Certified'],
        ingredients: [
          { name: 'Recycled Paper', harmful: false },
          { name: 'Soy-based Ink', harmful: false }
        ],
        alternatives: [
          { name: 'Digital Notes', score: 5.0 },
          { name: 'Bamboo Paper Products', score: 4.2 }
        ]
      }
    } else if (name.includes('electronics') || name.includes('phone') || name.includes('laptop')) {
      return {
        certifications: ['Energy Star', 'EPEAT Gold'],
        ingredients: [
          { name: 'Lithium-ion Battery', harmful: true },
          { name: 'Precious Metals', harmful: true },
          { name: 'Recycled Aluminum', harmful: false }
        ],
        alternatives: [
          { name: 'Refurbished Devices', score: 4.0 },
          { name: 'Fairphone', score: 4.5 }
        ]
      }
    } else {
      // Generic data for unrecognized products
      return {
        certifications: [],
        ingredients: [
          { name: 'Unknown Materials', harmful: false }
        ],
        alternatives: [
          { name: 'Research sustainable alternatives', score: 3.5 }
        ]
      }
    }
  }
  
  return {
    environmentalData,
    isLoading,
    error,
    environmentalScore
  }
}