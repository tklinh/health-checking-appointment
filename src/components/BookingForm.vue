<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Họ tên">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="Ngày sinh">
      <a-date-picker v-model:value="formState.dob" format="DD-MM-YYYY" />
    </a-form-item>
    <a-form-item label="Số điện thoại">
      <a-input v-model:value="formState.phone_number" />
    </a-form-item>
    <a-form-item label="Địa chỉ">
      <a-input v-model:value="formState.address" />
    </a-form-item>
    <a-form-item label="Giới tính">
      <a-radio-group v-model:value="formState.gender">
        <a-radio-button value="0">Nam</a-radio-button>
        <a-radio-button value="1">&nbsp;Nữ&nbsp;</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="Bác sĩ">
      <span v-show="selectedDoctor" style="font-weight: 700">{{ selectedDoctor?.name }}&nbsp;</span>
      <a-button :icon="h(SearchOutlined)" @click="showModal">Chọn bác sĩ</a-button>
    </a-form-item>
    <a-form-item label="Ngày khám">
      <a-date-picker v-model:value="formState.appointment_date" format="DD-MM-YYYY" />
    </a-form-item>
    <a-form-item label="Lý do khám">
      <a-textarea v-model:value="formState.desc" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 3 }">
      <a-button :loading="loading" :disable="loading" type="primary" @click="onSubmit"
        >Đặt lịch</a-button
      >
    </a-form-item>
  </a-form>
  <a-modal v-model:open="showChooseDoctorModal" title="" width="1000px">
    <select-doctor @select-doctor-event="selectDoctorHandler" />
    <template #footer> </template>
  </a-modal>
</template>
<script lang="ts" setup>
import { useSupabaseClient } from '@/composables/supabase'
import { ref, reactive, h } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
import dayjs, { Dayjs } from 'dayjs'

import { SearchOutlined } from '@ant-design/icons-vue'
import SelectDoctor from './SelectDoctor.vue'
import type { Doctor } from '@/types/models'
import { time } from 'console'
import router from '@/router'

interface FormState {
  name: string
  dob: string
  address: string
  phone_number: string
  gender: number
  appointment_date: Dayjs
  desc: string
}
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  address: '',
  dob: '',
  phone_number: '',
  gender: 0,
  appointment_date: dayjs().add(1, 'day'),
  desc: '',
})

const loading = ref<boolean>(false)
const showChooseDoctorModal = ref<boolean>(false)
const selectedDoctor: Ref<Doctor | undefined> = ref()

const showModal = () => {
  showChooseDoctorModal.value = true
}

const selectDoctorHandler = async (payload: { id: string }) => {
  showChooseDoctorModal.value = false
  console.log('received: ' + payload.id)
  selectedDoctor.value = await getDoctor(payload.id)
}

const getDoctor = async (id: string): Promise<Doctor | undefined> => {
  try {
    const { data, error, status } = await useSupabaseClient
      .from('doctors')
      .select(`id, name, title, department, description, image_src`)
      .eq('id', id)

    if (error && status !== 406) throw error

    if (data) {
      return data?.[0]
    }
  } catch (error: any) {
    console.error(error.message)
  }
}

const onSubmit = async () => {
  loading.value = true
  try {
    const { data, error } = await useSupabaseClient
      .from('appointments')
      .insert({
        name: formState.name,
        address: formState.address,
        phone_number: formState.phone_number,
        gender: formState.gender,
        doctor_id: selectedDoctor.value?.id,
        date: formState.appointment_date,
        time: '09:00:00',
        order_number: 1,
        description: formState.desc,
        room_number: 'A202',
      })
      .select('id')
      .single()
    if (error) throw error
    console.log(data)
    router.push(`/appointment/${data.id}`)
  } catch (error: any) {
    console.log(error)
  }
  loading.value = false
}
const labelCol = { style: { width: '150px' } }
const wrapperCol = { span: 14 }
</script>
