<script setup>
const props = defineProps({
  id: String,
  question: Object,
  value: [String, Number],
  error: String
})

const emit = defineEmits(['update:value'])

function handleChange(selectedValue) {
  emit('update:value', selectedValue)
}
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(option, index) in question.options"
      :key="index"
      class="flex items-center"
    >
      <input
        :id="`${id}_${index}`"
        :name="id"
        type="radio"
        :value="option"
        :checked="value === option"
        @change="handleChange(option)"
        :class="[
          'h-4 w-4 text-dwelling-primary border-dwelling-gray-300 focus:ring-dwelling-primary',
          error ? 'border-dwelling-danger' : ''
        ]"
      />
      <label
        :for="`${id}_${index}`"
        class="ml-3 block text-sm font-medium text-dwelling-gray-700 cursor-pointer hover:text-dwelling-gray-900"
      >
        {{ option }}
      </label>
    </div>
  </div>
</template>
