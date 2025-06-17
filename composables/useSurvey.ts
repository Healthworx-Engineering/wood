import { surveyQuestions, surveyConfig } from '~/data/surveyQuestions.js'

export const useSurvey = () => {
  // Calculate risk scores from responses
  const calculateRiskScores = (responses: Record<string, any>) => {
    const scores: Record<string, any> = {}
    
    // Initialize all categories
    Object.keys(surveyQuestions).forEach((sectionId: string) => {
      const section = (surveyQuestions as any)[sectionId]
      section.questions.forEach((question: any) => {
        if (question.categories) {
          question.categories.forEach((category: string) => {
            if (!scores[category]) {
              scores[category] = {
                score: 0,
                maxScore: 0,
                questions: [],
                multipliers: []
              }
            }
          })
        }
      })
    })
    
    // Calculate scores from responses
    Object.entries(responses).forEach(([sectionId, sectionResponses]) => {
      const section = (surveyQuestions as any)[sectionId]
      if (!section) return
      
      section.questions.forEach((question: any) => {
        if (!question.scoring || !question.categories) return
        
        const response = sectionResponses[question.id]
        if (response === undefined || response === null) return
        
        let questionScore = 0
        let maxQuestionScore = 0
        
        // Calculate base score
        if (question.type === 'radio' && question.options) {
          const optionIndex = question.options.indexOf(response)
          if (optionIndex !== -1 && question.scoring[optionIndex] !== undefined) {
            questionScore = question.scoring[optionIndex]
          }
          maxQuestionScore = Math.max(...question.scoring)
        } else if (question.type === 'number') {
          // Custom scoring for number inputs
          questionScore = response > 0 ? 1 : 0
          maxQuestionScore = 1
        }
        
        // Apply multipliers
        let finalScore = questionScore
        if (question.multiplier && questionScore > 0) {
          finalScore *= question.multiplier
        }
        
        // Add to relevant categories
        question.categories.forEach((category: string) => {
          if (scores[category]) {
            scores[category].score += finalScore
            scores[category].maxScore += maxQuestionScore * (question.multiplier || 1)
            scores[category].questions.push({
              id: question.id,
              text: question.text,
              response: response,
              score: finalScore,
              intervention: question.intervention,
              notes: question.notes
            })
          }
        })
      })
    })
    
    return scores
  }
  
  // Apply demographic multipliers
  const applyDemographicMultipliers = (scores: Record<string, any>, responses: Record<string, any>) => {
    const demographicResponses = responses.demographic || {}
    
    // Hours at home multiplier
    const hoursAtHome = demographicResponses.hours_at_home
    if (hoursAtHome && hoursAtHome > 0) {
      const multiplier = Math.min(1 + (hoursAtHome - 8) / 16, 2) // Scale from 1 to 2 based on hours
      
      // Apply to indoor exposure categories
      const indoorCategories = [
        'Air Quality (indoor/outdoor, VOCs)',
        'Mold & Moisture',
        'Chemical Exposures (cleaners, etc.)'
      ]
      
      indoorCategories.forEach(category => {
        if (scores[category]) {
          scores[category].score *= multiplier
          scores[category].multipliers.push({
            type: 'Hours at Home',
            value: multiplier,
            reason: `${hoursAtHome} hours per day at home`
          })
        }
      })
    }
    
    // Children multiplier
    const childrenCount = demographicResponses.children_count
    if (childrenCount && childrenCount > 0) {
      const multiplier = 1 + (childrenCount * 0.5)
      
      // Apply to all categories (children are more vulnerable)
      Object.keys(scores).forEach(category => {
        scores[category].score *= multiplier
        scores[category].multipliers.push({
          type: 'Children in Home',
          value: multiplier,
          reason: `${childrenCount} children under 18 in home`
        })
      })
    }
    
    // Pregnancy multiplier
    const pregnancyStatus = demographicResponses.pregnancy_status
    const tryingToConceive = demographicResponses.trying_to_conceive
    
    if (pregnancyStatus === 'Yes' || tryingToConceive === 'Yes') {
      const multiplier = 2
      const reason = pregnancyStatus === 'Yes' ? 'Currently pregnant' : 'Trying to conceive'
      
      // Apply to all categories (pregnancy increases vulnerability)
      Object.keys(scores).forEach(category => {
        scores[category].score *= multiplier
        scores[category].multipliers.push({
          type: 'Pregnancy/Conception',
          value: multiplier,
          reason: reason
        })
      })
    }
    
    return scores
  }
  
  // Get survey configuration for source
  const getSurveyConfig = (source: string) => {
    return (surveyConfig.sourceConfigurations as any)[source] || surveyConfig.sourceConfigurations.general
  }
  
  // Evaluate conditional logic
  const evaluateCondition = (condition: string, responses: Record<string, any>) => {
    try {
      // Simple condition evaluation - in production, use a proper parser
      const parts = condition.split('.')
      if (parts.length === 2) {
        const [section, question] = parts
        const value = responses[section]?.[question]
        return value !== undefined && value !== null && value !== ''
      }
      return false
    } catch (error) {
      console.warn('Error evaluating condition:', condition, error)
      return false
    }
  }
  
  // Generate recommendations based on scores
  const generateRecommendations = (scores: Record<string, any>) => {
    const recommendations: string[] = []
    
    Object.entries(scores).forEach(([category, data]) => {
      const percentage = data.maxScore > 0 ? (data.score / data.maxScore) * 100 : 0
      
      if (percentage > 50) {
        switch (category) {
          case 'Water Quality & Use':
            recommendations.push('Consider professional water testing and install appropriate filtration systems')
            break
          case 'Air Quality (indoor/outdoor, VOCs)':
            recommendations.push('Improve ventilation and consider air purification systems')
            break
          case 'Mold & Moisture':
            recommendations.push('Address moisture issues and consider professional mold inspection')
            break
          case 'Chemical Exposures (cleaners, etc.)':
            recommendations.push('Switch to safer household products and improve ventilation during use')
            break
          case 'Heavy Metals':
            recommendations.push('Consider heavy metal testing and reduce exposure sources')
            break
        }
      }
    })
    
    if (recommendations.length === 0) {
      recommendations.push('Continue current protective practices and stay informed about environmental health')
    }
    
    return recommendations
  }
  
  return {
    calculateRiskScores,
    applyDemographicMultipliers,
    getSurveyConfig,
    evaluateCondition,
    generateRecommendations
  }
}
