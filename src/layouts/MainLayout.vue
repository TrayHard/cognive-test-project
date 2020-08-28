<template lang="pug">
    q-layout
        q-page-container
            router-view
            scroller
</template>

<script>
import scroller from 'components/ui/scroller.vue';

export default {
    name: 'MainLayout',
    components: { scroller },
    mounted () {
        this.$q.dark.set(true);
    },
}
</script>

<style lang="sass">
main
    background: no-repeat url('~assets/img/naboo.jpg') fixed
</style>