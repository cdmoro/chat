<template>
  <transition name="slide-down">
        <div class="reply" v-if="show" :class="{ 'reply--in-message': inMessage }">
            <div class="reply__header">
                <strong>{{ message.user.name.first }} said:</strong>
                <div 
                    v-if="!inMessage"
                    class="button button-icon" 
                    @click="$emit('close')"
                >
                    <eva-icon name="close-outline" height="18" fill="white" />
                </div>
            </div>
            <div class="reply__content">
                <div v-for="(message, i) in message.text" :key="i">{{ message }}</div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        message: { required: true },
        inMessage: { type: Boolean, default: false },
        show: { type: Boolean, default: false }
    }

}
</script>

<style lang="scss">
.reply {
    font-size: .8rem;
    background: #e6199e;
    -webkit-clip-path: polygon(5% 0%, 100% 0, 100% 100%, 0 100%, 0% 20%);
    clip-path: polygon(5% 0%, 100% 0, 100% 100%, 0 100%, 0% 20%);

    &--in-message {
        background: none;
        border-radius: .25rem;
        margin-bottom: .5rem;
        background: #ff3a4922;
        -webkit-clip-path: none;
        clip-path: none;
    }

    &--in-message &__header {
            color: #333;
        }

    &--in-message &__content {
        background: none;
    }

    &__header {
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .5rem .5rem .25rem;
        margin-left: 1rem;
    }

    &__content {
        max-height: 75px;
        background: rgba(255, 255, 255, 0.6);
        margin: 0rem .5rem .5rem;
        padding: .5rem;
        border-radius: .25rem;
        overflow: auto;
    }
}

</style>