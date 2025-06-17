<script setup>
const props = defineProps({
  id: String,
  question: Object,
  value: String,
  error: String
})

const emit = defineEmits(['update:value'])

function handleInput(event) {
  emit('update:value', event.target.value)
}
</script>

<template>
  <div>
    <textarea
      :id="id"
      :value="value"
      @input="handleInput"
      rows="4"
      :class="[
        'block w-full px-3 py-2 border rounded-dwelling shadow-dwelling focus:outline-none focus:ring-dwelling-primary focus:border-dwelling-primary sm:text-sm',
        error ? 'border-dwelling-danger focus:ring-dwelling-danger focus:border-dwelling-danger' : 'border-dwelling-gray-300'
      ]"
      :placeholder="question.unit || 'Enter your answer'"
    ></textarea>
  </div>
</template>
