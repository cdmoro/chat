<template>
  <div id="app">
    <transition name="slide-down" appear>
      <chat-window v-if="user != null" :user="user" :buddy="buddy"/>
    </transition>

    <transition name="slide-down" appear>
      <chat-window v-if="buddy != null" :user="buddy" :buddy="user"/>
    </transition>
  </div>
</template>

<script>
import ChatWindow from "./components/ChatWindow"
import { getUsers } from "./services"

export default {
  name: "App",
  components: {
    ChatWindow
  },
  async created() {
    let users = await getUsers()
    this.user = users[0]
    this.buddy = users[1]
  },
  data() {
    return {
      user: null,
      buddy: null
    };
  }
};
</script>
