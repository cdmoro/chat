<template>
  <div class="avatar">
    <img :src="src">
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true }
  }
};
</script>

<style scoped>
.avatar {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  margin-right: 10px;
  overflow: hidden;
  background: #FFF;
}
</style>
