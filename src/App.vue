<template>
  <a-layout>
    <a-layout-header
      :style="{ position: 'fixed', zIndex: 1, width: '100%', background: '#1b7b57' }"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" class="custom-menu">
        <a-menu-item key="1"><router-link to="/">Đặt lịch khám</router-link></a-menu-item>
        <a-menu-item key="2"><router-link to="/search">Tra cứu lịch khám</router-link></a-menu-item>
        <a-menu-item key="3">Báo cáo</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <router-view />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }"> OptimalGrowth ©2025</a-layout-footer>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
const selectedKeys = ref<string[]>(['1'])
</script>
<style scoped>
.custom-menu {
  background: transparent; /* Ensure menu blends with header */
  line-height: 64px; /* Match header height */
}

/* Style regular menu items */
.custom-menu :deep(.ant-menu-item) {
  color: #ffffff !important; /* White text */
}

/* Style selected menu item */
.custom-menu :deep(.ant-menu-item-selected) {
  color: #ffd700 !important; /* Gold text */
  background: rgba(255, 255, 255, 0.1) !important; /* Subtle background highlight */
}

/* Style icons to match text */
.custom-menu :deep(.ant-menu-item .anticon) {
  color: inherit !important; /* Icons follow text color */
}

/* Hover effect */
.custom-menu :deep(.ant-menu-item:hover) {
  color: #ffd700 !important; /* Gold on hover */
}
</style>
