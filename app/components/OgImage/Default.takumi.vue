<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    subtitle?: string
  }>(),
  {
    subtitle: 'Furniture Making & Interior Wood Work in Surat',
  }
)
</script>

<template>
  <div
    style="
      width: 1200px;
      height: 630px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 72px;
      background: linear-gradient(135deg, #101F44 0%, #182F70 55%, #1E3A8A 100%);
      font-family: 'Plus Jakarta Sans', sans-serif;
    "
  >
    <div style="display: flex; align-items: center; gap: 18px;">
      <div style="display: flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 18px; background: linear-gradient(135deg, #DAB247, #A9840F);">
        <span style="font-size: 32px;">🛋️</span>
      </div>
      <span style="font-size: 30px; color: #ffffff; font-weight: 700; letter-spacing: 0.5px;">VIRAT FURNITURE</span>
    </div>

    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 980px;">
      <span style="font-size: 60px; line-height: 1.15; color: #ffffff; font-weight: 800;">{{ title }}</span>
      <span style="font-size: 28px; color: #E4C56C; font-weight: 500;">{{ subtitle }}</span>
    </div>

    <div style="display: flex; align-items: center; gap: 28px;">
      <span style="font-size: 22px; color: #DCE5F9;">📍 Surat, Gujarat</span>
      <span style="font-size: 22px; color: #DCE5F9;">✆ +91 97257 13944</span>
      <span style="font-size: 22px; color: #DCE5F9;">20+ Years Experience</span>
    </div>
  </div>
</template>
