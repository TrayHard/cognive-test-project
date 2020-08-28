<template lang="pug">
    .planet-info.q-pa-lg
        .planet-info__header.flex.justify-between
            .left.col-2
                .text-h4.q-mb-md {{ info.name != "unknown" ? info.name : 'Неизвестная планета' }}
                .text-subtitle2
                    q-badge.q-mr-xs(outline color="warning" title="Запись добавлена")
                        q-icon(name="add" round)
                        | {{ info.created | moment("DD.MM.YYYY") }}
                    q-badge(outline color="warning" title="Запись изменена")
                        q-icon(name="edit" round)
                        | {{ info.edited | moment("DD.MM.YYYY") }}
            .right.col-auto.flex.row.flex-wrap
                film-label(v-for="filmcode in filmcodes" :filmcode="filmcode" :key="`film${filmcode}`")
        q-separator.q-my-md(dark inset)
        .planet-info__body
            .text-subtitle2 Диаметр планеты: {{ +info.diameter ? splitZeros(+info.diameter) + ' км' : '-' }}
            .text-subtitle2 Население: {{ +info.population ? splitZeros(+info.population) : '-' }}
            .text-subtitle2 Часов в сутках: {{ +info.rotation_period ? +info.rotation_period + ' ч' : '-' }}
            .text-subtitle2 Дней в году: {{ +info.orbital_period ? +info.orbital_period + ' д' : '-' }}
            .text-subtitle2 Гравитация: {{ info.gravity != "unknown" ? info.gravity : '-' }}
            .text-subtitle2 Ландшафт: {{ info.terrain != "unknown" ? info.terrain : '-' }}
            .text-subtitle2 Водный покров: {{ info.surface_water != "unknown" ? info.surface_water : '-' }}
</template>

<script>
import filmlabel from 'components/film-label.vue';

export default {
    components: { "film-label": filmlabel },
    computed: {
        filmcodes() {
            return this.info.films.map(el => +el.match(/films\/(\d*)/)[1])
        }
    },
    props: {
        info: {
            type: Object,
            default: {}
        },
    },
}
</script>

<style lang="sass" scoped>
h4
    padding: 0
    margin: 0
</style>