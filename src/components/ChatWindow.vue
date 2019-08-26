<template>
  <div class="chat">
    <header>
      <div class="title">{{ buddyTitle }}</div>
    </header>
    <div class="body" ref="body" :class="{ 'is-empty': messages.length == 0 }">
      <div v-if="messages.length == 0">
        <div>Oh, Don't be shy</div>
        <button class="button" @click="sayHi">Say hi with style</button>
      </div>
      <template v-else>
        <transition-group name="slide-down" tag="div">
          <message v-for="(message, i) in messages" :key="'m'+i" :message="message" :user="user"/>
        </transition-group>
        <div class="is-typing" v-show="activeUsers">
          <eva-icon name="message-circle"/>
          {{ activeUsers }} is typing...
        </div>
      </template>
    </div>
    <transition name="scale">
      <button
        v-show="newMessages"
        class="button circle new-messages"
        title="You have new messages!"
        @click="scrollToBottom"
      >
        <eva-icon name="message-circle" animation="pulse" fill="white"/>
      </button>
    </transition>
    <div class="footer">
      <input
        type="text"
        v-model="message"
        @keyup.enter="newMessage($event.target.value)"
        placeholder="Start the conversation!"
      >
    </div>
  </div>
</template>

<script>
import { getFact } from "../services";
import Message from "./Message";

export default {
  components: {
    Message
  },
  props: {
    user: { type: Object, default: () => {} },
    buddy: { type: Object, default: () => {} }
  },
  created() {
    this.$root.$on("new-message", this.incomingMessagesHandler);
  },
  data() {
    return {
      message: "",
      newMessages: false
    };
  },
  watch: {
    message(newVal) {
      if (newVal.length > 0)
        this.$store.commit("setActiveUser", this.user.name.first);
      else this.$store.commit("removeActiveUser", this.user.name.first);
    },
    activeUsers(newVal) {
      if (newVal.length > 0 && this.isBottom()) this.scrollToBottom();
    }
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        let body = this.$refs.body;
        body.scrollTop = body.scrollHeight;
        this.newMessages = false;
      });
    },
    isBottom() {
      let body = this.$refs.body;
      return body.scrollHeight - body.scrollTop === body.clientHeight;
    },
    incomingMessagesHandler(username) {
      if (username !== this.user.login.username && !this.isBottom())
        this.newMessages = true;
      else this.scrollToBottom();
    },
    newMessage(message) {
      if (message !== "") {
        this.$store.commit("newMessage", {
          user: this.user,
          text: [message],
          date: new Date()
        });
        this.$root.$emit("new-message", this.user.login.username);
        this.message = "";
        this.scrollToBottom();
      }
    },
    async sayHi() {
      this.newMessage("Hey there! Did you know?");
      this.newMessage(`${getFact()}?`);
    }
  },
  computed: {
    buddyTitle() {
      return `${this.buddy.name.first} ${this.buddy.name.last}`;
    },
    activeUsers() {
      return this.$store.state.activeUsers
        .filter(user => user !== this.user.name.first)
        .join(", ");
    },
    messages() {
      return this.$store.state.messages;
    }
  }
};
</script>

<style>
.chat {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "header" "body" "footer";
  position: relative;
  flex: 1;
  height: 100vh;
}

@media all and (-ms-high-contrast: none) {
  .chat {
    display: -ms-grid;
    -ms-grid-columns: 1fr;
    -ms-grid-rows: 80px 1fr 50px;
  }
}

.chat header {
  padding: 0.5rem;
  height: 45px;
  display: flex;
  align-items: center;
  background: tomato;
}

.chat .title {
  font-weight: bold;
  color: white;
  flex-grow: 1;
}

.chat .body {
  background: white;
  overflow: auto;
  position: relative;
  /*display: flex;
  flex-direction: column;
  justify-content: end;*/
}

.chat .body.is-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.chat .new-messages {
  position: absolute;
  bottom: 70px;
  right: 30px;
}

.chat .footer {
  display: flex;
  height: 40px;
  padding: 0.5rem;
  background: tomato;
}

.chat .footer input {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0.25rem;
  border: none;
  color: #FFF;
  font-size: 1rem;
}

.chat .footer .btn {
  align-self: center;
  padding: 5px 10px;
}

.chat header .title {
  text-transform: capitalize;
}

.chat .input-content {
  display: flex;
  align-items: center;
}

.chat .input-content input {
  flex: 1;
}

.chat .to-bottom {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.chat .is-typing {
  font-size: 0.9rem;
  padding: 1rem;
  color: #666;
  display: flex;
}

.chat .is-typing i {
  margin-right: 0.5rem;
}
</style>