import Vue from "vue";
import Vuex from "vuex";
import { isSameMinute } from "date-fns";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    activeUsers: [],
    allowNotifications: false
  },
  mutations: {
    newMessage(state, message) {
      if (state.messages.length > 0) {
        let lastMessage = state.messages[state.messages.length - 1];
        if (
          lastMessage.user.login.username === message.user.login.username &&
          isSameMinute(lastMessage.date, message.date) &&
          message.reply === null
        )
          return lastMessage.text.push(message.text[0]);
      }
      state.messages.push(message);
    },
    setActiveUser(state, firstname) {
      if (!state.activeUsers.includes(firstname))
        state.activeUsers.push(firstname);
    },
    removeActiveUser(state, firstname) {
      let index = state.activeUsers.indexOf(firstname);
      state.activeUsers.splice(index, 1);
    },
    allowNotifications(state) {
      state.allowNotifications = true
    }
  }
})