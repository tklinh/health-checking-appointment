<template>
  <a-card class="doctor-card" hoverable>
    <a-typography-title :level="4">{{ doctor.name }}</a-typography-title>
    <a-typography-text type="secondary">{{ doctor.title }}</a-typography-text>
    <br />
    <br />
    <a-row :gutter="[16, 16]">
      <!-- Image on the left -->
      <a-col :xs="24" :sm="8">
        <a-image
          :src="doctor.image_src"
          :alt="`Photo of ${doctor.name}`"
          :width="200"
          class="doctor-image"
          :preview="true"
        />
      </a-col>
      <!-- Information on the right -->
      <a-col :xs="24" :sm="16" class="doctor-description">
        <a-typography-text strong>Chuyên ngành: </a-typography-text>
        <a-typography-text>{{ doctor.department }}</a-typography-text>
        <br />
        <a-typography-text strong>Thế mạnh chuyên môn: </a-typography-text>
        <br />
        <a-typography-paragraph>
          <ul>
            <li v-for="(desc, index) in doctor.description.split('$')" :key="index">
              <a-typography-text>{{ desc }}</a-typography-text>
            </li>
          </ul>
        </a-typography-paragraph>
        <a-button type="primary" @click="selectDoctor"> Chọn </a-button>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import type { Doctor } from '@/types/models'

const props = defineProps<{
  doctor: Doctor
}>()

const emit = defineEmits<{
  (event: 'select-doctor-event', payload: { id: string }): void
}>()

const selectDoctor = () => {
  console.log(props.doctor.id)
  emit('select-doctor-event', { id: props.doctor.id })
}
</script>

<style scoped>
.doctor-card {
  max-width: 800px;
  margin: 16px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.doctor-image {
  object-fit: cover;
  border-radius: 8px;
}

.doctor-description {
  text-align: left;
}

@media (max-width: 576px) {
  .doctor-image {
    width: 100%;
    height: auto;
  }
}
</style>
