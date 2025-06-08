<script setup lang="ts">
import { useSupabaseClient } from '@/composables/supabase'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'

import type { Doctor } from '@/types/models'
import DoctorDetail from './DoctorDetail.vue'
import { onMounted, ref } from 'vue'

const emit = defineEmits<{
  (event: 'select-doctor-event', payload: any): void
}>()

const doctors = ref<Doctor[]>([])

const getDoctors = async () => {
  try {
    const { data, error, status } = await useSupabaseClient
      .from('doctors')
      .select(`id, name, title, department, description, image_src`)

    if (error && status !== 406) throw error

    if (data) {
      doctors.value = data
      return data
    }
  } catch (error: any) {
    console.error(error.message)
  }
}

const selectDoctorHandler = (payload: { id: string }) => {
  console.log('select doctor: ' + payload.id)
  emit('select-doctor-event', payload)
}

onMounted(() => {
  getDoctors()
})
</script>
<template>
  <a-carousel arrows>
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <left-circle-outlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <right-circle-outlined />
      </div>
    </template>
    <div v-for="doctor in doctors" :key="doctor.id">
      <doctor-detail
        :doctor="{
          id: doctor.id,
          name: doctor.name,
          title: doctor.title,
          department: doctor.department,
          description: doctor.description,
          image_src: doctor.image_src,
        }"
        @select-doctor-event="selectDoctorHandler"
      />
    </div>
  </a-carousel>
</template>
<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  line-height: 160px;
  background: #ffffff;
  overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #2e01f6;
  background-color: rgba(31, 45, 61, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #ef02df;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
