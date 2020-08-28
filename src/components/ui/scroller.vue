<template lang="pug">
    .scroller(v-scroll="checkScroll")
        q-btn.scroll-btn(
            v-show="showScroller"
            padding="lg"
            color="info"
            round
            icon="arrow_upward"
            @click="scrollUp"
        )
</template>

<script>
import { scroll } from 'quasar'

export default {
    data() {
        return {
            showScroller: false,
        }
    },
    methods: {
        checkScroll(position) {
            console.log(position);
            if (position > 200) this.showScroller = true;
            else this.showScroller = false;
        },
        scrollUp() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    },
}
</script>

<style lang="sass" scoped>
.scroller
    position: fixed
    opacity: 0.5
    bottom: 5vh
    right: 15vw
    .scroll-btn
        transform: all 0.8 ease-in
</style>