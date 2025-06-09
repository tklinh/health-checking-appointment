<template>
  <a-button :disabled="!isAvailable" :danger="isSelected" @click="onClick">
    {{ props.time.format('HH:mm') }}
    <template #icon v-if="isSelected"><CheckCircleTwoTone /></template>
  </a-button>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Dayjs } from 'dayjs'

import { CheckCircleTwoTone } from '@ant-design/icons-vue'

const props = defineProps<{
  id: number
  time: Dayjs
  isAvailable: boolean
  isSelected: boolean
}>()

const emit = defineEmits<{
  (event: 'select-appointment-time', payload: { id: number }): void
}>()

const onClick = () => {
  emit('select-appointment-time', { id: props.id })
}
</script>
