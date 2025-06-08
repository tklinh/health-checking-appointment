<template>
  <a-form
    layout="inline"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item> </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.user" placeholder="Nhập số điện thoại" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit"> Tìm kiếm </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
import type { UnwrapRef } from 'vue'
import type { FormProps } from 'ant-design-vue'

interface FormState {
  user: string
  password: string
}
const formState: UnwrapRef<FormState> = reactive({
  user: '',
  password: '',
})
const handleFinish: FormProps['onFinish'] = (values) => {
  console.log(values, formState)
}
const handleFinishFailed: FormProps['onFinishFailed'] = (errors) => {
  console.log(errors)
}
</script>
