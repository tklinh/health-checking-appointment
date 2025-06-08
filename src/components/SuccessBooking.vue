<template>
  <a-result status="success" title="Bạn đã đặt lịch khám thành công!" v-if="appointment">
    <div>
      <p>Ngày khám: {{ appointment!.date }}</p>
      <p>Phòng khám: {{ appointment!.room_number }}</p>
      <p>Số thứ tự: {{ appointment!.order_number }}</p>
      <p v-show="appointment!.selected_doctor">Bác sĩ: {{ appointment!.selected_doctor }}</p>
    </div>
  </a-result>
</template>
<script setup lang="ts">
import { useSupabaseClient } from '@/composables/supabase'
import type { AppointmentDetail } from '@/types/models'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const appointment: Ref<AppointmentDetail | undefined> = ref()

const getAppointment = async (id: string) => {
  console.log('getAppoitment')
  try {
    const { data, error } = await useSupabaseClient
      .from('appointments')
      .select(
        `
        id,
        date,
        time,
        doctor_id,
        order_number,
        room_number
      `,
      )
      .eq('id', id)
      .single()

    if (error) throw error

    appointment.value = {
      id: data.id,
      date: data.date,
      time: data.time,
      selectted_doctor_id: data.doctor_id,
      selected_doctor: '',
      order_number: data.order_number,
      room_number: data.room_number,
    }

    const doctor_name = await getDoctorName(data.doctor_id)
    if (doctor_name) appointment.value.selected_doctor = doctor_name!
  } catch (error) {
    console.error('Fetch appointment error:', error)
  } finally {
  }
}

const getDoctorName = async (id: string): Promise<string | undefined> => {
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
}

onMounted(() => getAppointment(route.params.id as string))
</script>
