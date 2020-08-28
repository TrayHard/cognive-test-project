<template lang="pug">
    q-card(dark bordered)
        q-card-section
            .text-h5 {{ info.name != "unknown" ? info.name : 'Неизвестная планета' }}
            .text-subtitle2 Добавлен: {{ info.created | moment("DD.MM.YYYY") }}
            .text-subtitle2 Изменён: {{ info.edited | moment("DD.MM.YYYY") }}
        q-separator(dark inset)
        q-card-section
            .text-subtitle2 Диаметр планеты: {{ +info.diameter ? splitZeros(+info.diameter) + ' км' : 'неизвестен' }}
            .text-subtitle2 Часов в сутках: {{ +info.rotation_period ? +info.rotation_period + ' ч' : 'неизвестно' }}
            .text-subtitle2 Дней в году: {{ +info.orbital_period ? +info.orbital_period + ' д' : 'неизвестно' }}
            .text-subtitle2 Гравитация: {{ info.gravity != "unknown" ? info.gravity : 'неизвестно' }}
            .text-subtitle2 Ландшафт: {{ info.terrain }}
            .text-subtitle2 Водный покров: {{ info.surface_water }}
            .text-subtitle2 Население: {{ +info.population ? splitZeros(+info.population) : 'неизвестно' }}
</template>

<script>
    export default {
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