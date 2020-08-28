<template lang="pug">
    .film-container
        img.film-img.q-mr-sm(
            :src="require(`../assets/img/films/${filmcode}.jpg`)"
            :title="desc[filmcode-1]"
        )
</template>

<script>
export default {
    props: {
        filmcode: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            desc: [
                'Эпизод IV — Новая надежда',
                'Эпизод V — Империя наносит ответный удар',
                'Эпизод VI — Возвращение джедая',
                'Эпизод I — Скрытая угроза',
                'Эпизод II — Атака клонов',
                'Эпизод III — Месть ситхов',
            ]
        }
    },
}
</script>

<style lang="sass" scoped>
.film-img
    max-height: 100px
</style>