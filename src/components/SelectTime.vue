<template>
  <a-flex wrap="wrap" gap="small">
    <appointment-time
      v-for="(data, index) in times"
      :key="index"
      :id="index"
      :time="data.time"
      :is-available="data.isAvailable"
      :is-selected="data.isSelected"
      @select-appointment-time="selectAppointmentTimeHandler"
    />
  </a-flex>
</template>
<script setup lang="ts">
import { onMounted, ref, defineEmits } from 'vue'
import type { Ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import AppointmentTime from './AppointmentTime.vue'
import { useSupabaseClient } from '@/composables/supabase'

const emit = defineEmits<{
  (event: 'select-appointment-time', payload: { id: string; time: Dayjs }): void
}>()

interface TimeSlot {
  id: string
  time: Dayjs
  isAvailable: boolean
  isSelected: boolean
}

const times: Ref<TimeSlot[]> = ref([])
const selectedTimeIndex: Ref<number | undefined> = ref(undefined)

const getTimeSlots = async () => {
  try {
    const { data, error, status } = await useSupabaseClient
      .from('appointment_times')
      .select(`id, time_slot`)

    if (error && status !== 406) throw error

    if (data) {
      data.forEach((timeSlot) => {
        times.value.push({
          id: timeSlot.id,
          time: dayjs(timeSlot.time_slot, 'HH:mm:ss'),
          isAvailable: true,
          isSelected: false,
        })
      })
    }
  } catch (error: any) {
    console.error(error.message)
  }
}

const selectAppointmentTimeHandler = (payload: { id: number }) => {
  if (selectedTimeIndex.value !== undefined) {
    times.value[selectedTimeIndex.value].isSelected = false
  }
  selectedTimeIndex.value = payload.id
  times.value[selectedTimeIndex.value].isSelected = true
  emit('select-appointment-time', {
    id: times.value[selectedTimeIndex.value].id,
    time: times.value[selectedTimeIndex.value].time,
  })
}

onMounted(() => getTimeSlots())
</script>
