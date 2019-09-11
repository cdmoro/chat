<template>
    <div class="chat">
        <chat-header :buddy="buddy" />

        <div class="body" ref="body" :class="{ 'is-empty': messages.length == 0 }">
            <div 
                v-if="messages.length == 0"
                class="no-messages"
            >
                <div>Oh, Don't be shy</div>
                <button 
                    class="button" 
                    @click="sayHi"
                    :disabled="user === null"
                >
                    Say hi with style
                </button>
            </div>
            <template v-else>
                <transition-group name="slide-down" tag="div">
                    <message 
                        v-for="(message, i) in messages" 
                        :key="'m'+i" 
                        :message="message" 
                        :user="user"
                        @reply="replyMessage"
                    />
                </transition-group>
                <div class="is-typing" v-show="activeUsers">
                    <eva-icon name="message-circle"/>
                    {{ activeUsers }} is typing...
                </div>
            </template>
        </div>
    
        <new-messages-alert
            :show="newMessages"
            @click="scrollToBottom"
        />

        <reply
            :show="showReply"
            :message="repliedMessage"
            @close="showReply = false"
        />

        <div class="footer bg-special">
            <input
                type="text"
                v-model="message"
                ref="messageInput"
                @keyup.enter="newMessage(message)"
                placeholder="Write a message..."
                :disabled="user === null"
            >
            <div 
                class="button send" 
                @click="newMessage(message)"
                :disabled="user === null"
            >
                <eva-icon name="arrow-forward" animation="pulse" fill="white"/>
            </div>
        </div>
  </div>
</template>

<script>
import { formatRelative } from "date-fns"
import { getFact } from '../services'

import ChatHeader from './ChatHeader'
import NewMessagesAlert from './NewMessagesAlert'
import Message from './Message'
import Reply from './Reply'

export default {
    components: {
        ChatHeader,
        NewMessagesAlert,
        Message,
        Reply
    },
    props: {
        user: { type: Object, default: null },
        buddy: { type: Object, default: null }
    },
    created() {
        // Subscription to 'new-message' event
        this.$root.$on("new-message", this.incomingMessagesHandler)
    },
    data() {
        return {
            message: "",
            newMessages: false,
            showReply: false,
            repliedMessage: null
        }
    },
    watch: {
        message(newVal) {
            if (newVal.length > 0)
                this.$store.commit("setActiveUser", this.user.name.first)
            else 
                this.$store.commit("removeActiveUser", this.user.name.first)
        },
        activeUsers(newVal) {
            if (newVal.length > 0 && this.isBottom()) this.scrollToBottom()
        }
    },
    methods: {
        scrollToBottom() {
            this.$nextTick(() => {
                let body = this.$refs.body
                body.scrollTop = body.scrollHeight
                this.newMessages = false
            })
        },
        isBottom() {
            let body = this.$refs.body
            return body.scrollHeight - body.scrollTop === body.clientHeight
        },
        incomingMessagesHandler({ user, text, date }) {
            if (this.allowNotifications && user.login.username !== this.user.login.username) {
                new Notification(`${user.name.first} (${formatRelative(date, new Date())})`, {
                    icon: user.picture.large,
                    body: text[0]
                })
            }

            if (user.login.username !== this.user.login.username && !this.isBottom())
                this.newMessages = true
            else this.scrollToBottom()
        },
        newMessage(message) {
            if (message !== "") {
                let msgObj = {
                    user: this.user,
                    text: [message],
                    date: new Date(),
                    reply: this.repliedMessage
                }

                this.$store.commit("newMessage", msgObj)
                this.$root.$emit('new-message', msgObj)
                this.showReply = false
                this.repliedMessage = null
                this.message = ""
                this.scrollToBottom()
            }
        },
        sayHi() {
            this.newMessage("Hey there! Did you know?")
            this.newMessage(`${getFact()}?`)
        },
        replyMessage(message) {
            this.showReply = true
            this.repliedMessage = message
            this.$refs.messageInput.focus()
        }
    },
    computed: {
        activeUsers() {
            return this.$store.state.activeUsers
                .filter(user => user !== this.user.name.first)
                .join(", ")
        },
        messages() {
            return this.$store.state.messages
        },
        allowNotifications() {
            return this.$store.state.allowNotifications
        }
    }
}
</script>

<style>
.chat {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: "header" "body" "footer";
    position: relative;

    height: 75vh;
    width: 500px;
    border-radius: 0.25rem;
    overflow: hidden;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
        0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
    background: #FFF;
}

@media all and (-ms-high-contrast: none) {
    .chat {
        display: -ms-grid;
        -ms-grid-columns: 1fr;
        -ms-grid-rows: 80px 1fr 50px;
    }
}

.chat .body {
    background: white;
    overflow: auto;
    position: relative;
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
    align-items: center;
}

.chat .is-typing i {
    margin-right: 0.5rem;
}

.chat .button.send {
    background: none;
    padding: .5rem .75rem;
}

.chat .button.send[disabled] {
    opacity: .5;
}
.chat .button.send[disabled]:hover {
    background: none;
}

.chat .no-messages {
    font-size: 1.2rem;
}

.chat .no-messages .button {
    margin-top: .5rem;
    font-size: 1.1rem;
}
</style>