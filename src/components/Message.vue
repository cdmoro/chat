<template>
  <div class="message" :class="{ 'mine': message.user.login.username === user.login.username}">
    <div class="right">
      <div class="top">
        <div class="username">{{ message.user.name.first }}</div>
        <div class="date">{{ message.date | timeAgo }}</div>
      </div>
      <div v-for="(message, i) in message.text" :key="i">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import { formatRelative } from "date-fns";

export default {
  props: {
    message: { type: Object, required: true },
    user: { type: Object, required: true }
  },
  filters: {
    timeAgo(dateMsg) {
      return formatRelative(dateMsg, new Date());
    }
  }
};
</script>

<style>
.message {
  display: flex;
  padding: 10px;
  margin: 5px 10px;
  /*color: white;*/
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
  justify-content: space-between;
}

.message .username {
  font-size: 1.1rem;
  font-weight: bold;
}

.message .date {
  font-size: 0.8rem;
  opacity: 0.7;
}

/*.message {
	position: relative;
	background: #00aabb;
	border-radius: .3em;
}

.message:after {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 14px solid transparent;
	border-right-color: #00aabb;
	border-left: 0;
	border-top: 0;
	margin-top: -7px;
	margin-left: -14px;
}*/
</style>
