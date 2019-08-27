<template>
    <header class="bg-special">
        <avatar v-if="buddy" :src="buddy.picture.thumbnail"/>
        <div class="title">{{ buddyTitle }}</div>
    </header>
</template>

<script>
import Avatar from "./Avatar"

export default {
    props: {
        buddy: { type: Object, default: null }
    },
    components: {
        Avatar
    },
    computed: {
        buddyTitle() {
            if (this.buddy === null)
                return 'Loading...'
            else 
                return `${this.buddy.name.first} ${this.buddy.name.last}`
        }
    }
}
</script>

<style>
.chat header {
    padding: 0.5rem;
    height: 45px;
    display: flex;
    align-items: center;
}

.chat .title {
    font-weight: bold;
    color: white;
    flex-grow: 1;
}
</style>