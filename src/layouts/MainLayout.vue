<template lang="pug">
    q-layout
        q-page-container
            router-view
            q-footer
                q-toolbar.bg-grey-10
                    q-toolbar-title.flex.justify-center.column.items-center
                        .text-caption
                            | Тестовое задание для <a class='text-accent' href="https://cognive.com/" target="_blank" >Cognive</a>
                        .text-caption
                            | от <a class='text-accent' href="https://github.com/TrayHard" target="_blank">Полякова И</a>
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
a
    text-decoration: none
.q-footer
    height: 70px
    display: flex
    justify-content: center
    background: none
    .q-toolbar
        max-width: $main-width
        min-width: $main-width
        width: 100%
</style>