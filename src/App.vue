<template>
  <a-layout>
    <a-layout-header
      :style="{ position: 'fixed', zIndex: 1, width: '100%', background: '#1b7b57' }"
    >
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px', background: 'transparent' }"
      >
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
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: #1b7b57;
  margin: 16px 24px 16px 0;
  float: left;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #1b7b57;
}
</style>
