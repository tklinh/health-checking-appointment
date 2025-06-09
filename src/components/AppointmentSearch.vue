<template>
  <a-input-search
    v-model:value="phone_number"
    placeholder="input search text"
    style="width: 300px"
    enter-button="Search"
    @search="onSearch"
  />
  <appointment-detail v-for="app in appointments" :key="app.id" :appointment="app" />
</template>
<script lang="ts" setup>
import { useSupabaseClient } from '@/composables/supabase'
import type { Appointment } from '@/types/models'
import { ref } from 'vue'
import type { Ref } from 'vue'
import AppointmentDetail from './AppointmentDetail.vue'

const phone_number: Ref<string> = ref('')
const appointments: Ref<Appointment[]> = ref([])

const onSearch = async () => {
  appointments.value = []
  try {
    const { data, error } = await useSupabaseClient
      .from('appointments')
      .select(
        `
        id, name, address, phone_number,
        date,
        time,
        doctor_id,
        order_number,
        room_number,
        description
      `,
      )
      .eq('phone_number', phone_number.value)

    if (error) throw error
    console.log(data)
    if (data!.length > 0) {
      data.forEach(async (app) => {
        appointments.value.push({
          id: app.id,
          name: app.name,
          address: app.address,
          phone_number: app.phone_number,
          date: app.date,
          time: app.time,
          selectted_doctor_id: app.doctor_id,
          selected_doctor: await getDoctorName(app.doctor_id),
          order_number: app.order_number,
          room_number: app.room_number,
          description: app.description,
        })
      })
    }
  } catch (error: any) {
    console.error(error.message)
  }
}

const getDoctorName = async (id: string): Promise<string> => {
  try {
    const { data, error } = await useSupabaseClient
      .from('doctors')
      .select(
        `
        name
      `,
      )
      .eq('id', id)
      .single()

    if (error) throw error

    if (data) {
      return data.name
    }
  } catch (error: any) {
    console.error('Fetch appointment error:', error)
  }
  return ''
}
</script>
