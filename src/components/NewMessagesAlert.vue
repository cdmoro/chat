<template>
  <transition name="scale">
      <button
        v-show="show"
        class="button circle new-messages"
        title="You have new messages!"
        @click="$emit('click')"
      >
        <eva-icon name="message-circle" animation="pulse" fill="white"/>
      </button>
    </transition>
</template>

<script>
export default {
    props: {
        show: { type: Boolean, default: false }
    }
}
</script>

<style>

</style>