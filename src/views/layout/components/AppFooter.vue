<template>
  <!-- <footer>copyright © {{ $t('app.cpr') }} <lang-select/></footer> -->
  <footer>copyright © {{ $t('app.cpr') }}</footer>
</template>

<script>
import LangSelect from '@/components/LangSelect'
export default {
  components: { LangSelect }
}
</script>

<style scoped>
footer {
  padding: 24px 0;
  font-size: 12px;
  line-height: 12px;
  color: #000;
  text-align: center;
}
</style>
