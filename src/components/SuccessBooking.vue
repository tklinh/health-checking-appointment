<template>
  <a-result status="success" title="Bạn đã đặt lịch khám thành công!" v-if="appointment">
    <div>
      <p>Họ tên: {{ appointment.name }}</p>
      <p>Số điện thoại: {{ appointment.phone_number }}</p>
      <p>Ngày khám: {{ appointment.time }} {{ appointment.date }}</p>
      <p>Phòng khám: {{ appointment!.room_number }}</p>
      <p>Số thứ tự: {{ appointment!.order_number }}</p>
      <p v-show="appointment!.selected_doctor">Bác sĩ: {{ appointment!.selected_doctor }}</p>
      <p>Lý do khám: {{ appointment.description }}</p>
    </div>
  </a-result>
</template>
<script setup lang="ts">
import { useSupabaseClient } from '@/composables/supabase'
import type { Appointment } from '@/types/models'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'

const route = useRoute()
const appointment: Ref<Appointment | undefined> = ref()

const getAppointment = async (id: string) => {
  console.log('getAppoitment')
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
      .eq('id', id)
      .single()

    if (error) throw error

    appointment.value = {
      id: data.id,
      name: data.name,
      address: data.address,
      phone_number: data.phone_number,
      date: data.date,
      selectted_doctor_id: data.doctor_id,
      selected_doctor: '',
      order_number: data.order_number,
      room_number: data.room_number,
      description: data.description,
    }

    if (data.time != null) {
      appointment.value.time = dayjs(data.time, 'HH:mm:ss').format('HH:mm')
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
