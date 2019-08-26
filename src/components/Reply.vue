<template>
  <transition name="slide-down">
        <div class="reply bg-special" v-if="show" :class="{ 'in-message': inMessage }">
            <div class="reply-header">
                <strong>Reply to {{ message.user.name.first }}</strong>
                <div 
                    v-if="!inMessage"
                    class="button button-icon" 
                    @click="$emit('close')"
                >
                    <eva-icon name="close-outline" height="18" fill="white" />
                </div>
            </div>
            <div class="reply-content">
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

<style>
.reply {
    font-size: .8rem;
}

.reply.in-message {
    background: none;
    border-radius: .25rem;
    margin-bottom: .5rem;
    background: #ff3a4922;
}

.reply .reply-header {
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem .5rem .25rem;
}

.reply.in-message .reply-header {
    color: #333;
}

.reply .reply-content {
    max-height: 75px;
    background: rgba(255, 255, 255, 0.6);
    margin: 0rem .5rem .5rem;
    padding: .5rem;
    border-radius: .25rem;
    overflow: auto;
}

.reply.in-message .reply-content {
    background: none;
}

</style>