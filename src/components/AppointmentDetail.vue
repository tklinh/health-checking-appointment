<template>
  <br />
  <a-list size="small">
    <a-list-item><strong>Họ tên:</strong> {{ appointment.name }}</a-list-item>
    <a-list-item><strong>Địa chỉ:</strong> {{ appointment.address }}</a-list-item>
    <a-list-item><strong>Số điện thoại:</strong> {{ appointment.phone_number }}</a-list-item>
    <a-list-item>
      <strong>Ngày khám:</strong> {{ parsedTimeSlot }} {{ appointment.date }}
    </a-list-item>
    <a-list-item><strong>Số thứ tự:</strong> {{ appointment.order_number }}</a-list-item>
    <a-list-item><strong>Phòng:</strong> {{ appointment.room_number }}</a-list-item>
    <a-list-item><strong>Bác sĩ:</strong> {{ appointment.selected_doctor }}</a-list-item>
    <a-list-item><strong>Lý do khám:</strong> {{ appointment.description }}</a-list-item>
  </a-list>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import type { Appointment } from '@/types/models'
import { parseTimeSlot } from './utils'

const props = defineProps<{
  appointment: Appointment
}>()

const parsedTimeSlot = parseTimeSlot(props.appointment.time)
</script>
