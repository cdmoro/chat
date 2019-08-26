<template>
  <div class="message" :class="{ 'mine': message.user.login.username === user.login.username}">
    <avatar :src="message.user.picture.thumbnail"/>
    <div class="right">
        <reply 
            v-if="message.reply" 
            :show="true"
            :message="message.reply"
            in-message
        />
        <div class="top">
            <div class="username">{{ message.user.name.first }}</div>
            <div class="date">{{ message.date | timeAgo }}</div>
            <div class="reply-btn button button-icon" title="Reply this message!" @click="$emit('reply', message)">
                <eva-icon height="18" name="undo"/>
            </div>
        </div>
        <div v-for="(message, i) in message.text" :key="i">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import { formatRelative } from "date-fns"
import Avatar from "./Avatar"
import Reply from './Reply'

export default {
  props: {
    message: { type: Object, required: true },
    user: { type: Object, required: true }
  },
  components: {
    Avatar, Reply
  },
  filters: {
    timeAgo(dateMsg) {
      return formatRelative(dateMsg, new Date())
    }
  }
};
</script>

<style>
.message {
  display: flex;
  padding: 10px;
  margin: 5px;
  position: relative;
}

.message.mine {
  background: #F1F1F1;
  border-radius: 0.25rem;
}

.message .right {
  flex: 1;
}

.message .top {
  margin-bottom: 5px;
  display: flex;
  align-items: start;
}

.message .username {
  font-size: 1.1rem;
  font-weight: bold;
  flex: 1;
}

.message .date {
  font-size: 0.8rem;
  opacity: 0.7;
}

.message .reply-btn {
    display: none;
}

.message:hover .reply-btn {
    display: inline;
}
</style>
