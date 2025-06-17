<script setup>
// Define page meta
definePageMeta({
  title: 'Environmental Health Survey'
})

// Survey source - can be passed as query parameter
const route = useRoute()
const surveySource = computed(() => route.query.source || 'general')

// Handle survey completion
function handleSurveyComplete(data) {
  console.log('Survey completed:', data)
  
  // Here you would typically:
  // 1. Save the responses to a database
  // 2. Generate a report
  // 3. Send notifications
  // 4. Redirect to results or next steps
  
  // For now, just log the data
  console.log('Responses:', data.responses)
  console.log('Source:', data.source)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <SurveyContainer 
      :source="surveySource"
      @complete="handleSurveyComplete"
    />
  </div>
</template>
