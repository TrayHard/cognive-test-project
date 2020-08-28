<template lang="pug">
    q-page.flex.justify-center
        .wrapper.shadow-5.bg-grey-10.full-height
            .header.q-pa-xl
                .text-h3 Звёздные Войны
                .text-h5 Планеты
            .body
                q-table(
                    densed
                    class="sticky-table"
                    :data="planets"
                    :filter="table.filter"
                    :columns="table.columns"
                    rows-per-page-label="Планет на странице"
                    :rows-per-page-options="table.pagination.perPageOptions"
                    :pagination.sync="table.pagination"
                    no-data-label="Не найдено данных"
                    :loading="table.loading"
                    row-key="name"
                    binary-state-sort
                )
                    template(v-slot:top-right)
                        q-input(borderless dense debounce="300" v-model="table.filter" placeholder="Поиск")
                        q-icon(slot="append" name="search")
                    template(v-slot:no-data="{ icon, message, filter }")
                        .full-width.row.flex-center.q-gutter-sm
                            q-icon(size="2em" :name="filter ? 'filter_b_and_w' : icon")
                            span {{ message }}
                    template(v-slot:header="props")
                        q-tr(:props="props")
                            q-th(auto-width)
                            q-th(
                                v-for="col in props.cols"
                                :key="col.name"
                                :props="props"
                            ) {{ col.label }}
                    template(v-slot:body="props")
                        q-tr(:props="props")
                            q-td(auto-width)
                                q-btn(
                                    round dense
                                    size="sm"
                                    color="secondary"
                                    @click="props.expand = !props.expand"
                                    :icon="props.expand ? 'expand_less' : 'expand_more'"
                                )
                            q-td(
                                v-for="col in props.cols"
                                :key="col.name"
                                :props="props"
                            ) {{ col.value }}
                        q-tr(v-show="props.expand" :props="props")
                            q-td(colspan="100%")
                                planet-info(:info="props.row")
</template>

<script>
import { mapState } from 'vuex'
import { actTypes } from '@store/planets/types';
import planet from 'src/components/planet.vue';

export default {
    name: 'PageIndex',
    components: {
        "planet-info": planet,
    },
    created () {
        this.$store.dispatch(`planets/${actTypes.GET_ALL_PLANETS}`)
            .catch(err => this.showError(err))
            .finally(() => this.table.loading = false)
    },
    computed: {
        ...mapState({
            planets: state => state.planets.planetsList
        }),
    },
    data() {
        return {
            table: {
                loading: true,
                filter: '',
                columns: [
                    {
                        label: '#',
                        name: 'id',
                        required: true,
                        field: row => +row.url.match(/planets\/(\d*)/)[1],
                        align: 'center',
                        sortable: true
                    },
                    {
                        label: 'Название планеты',
                        name: 'name',
                        required: true,
                        field: 'name',
                        align: 'left',
                        sortable: true
                    },
                    {
                        label: 'Добавлено',
                        name: 'created',
                        align: 'center',
                        field: row => row.created,
                        format: val => this.$moment(val).format('DD.MM.YYYY'),
                        sortable: true,
                        sort: (a,b) => (+this.$moment(a)) - (+this.$moment(b))
                    },
                    {
                        label: 'Диаметр',
                        name: 'diameter',
                        align: 'center',
                        field: row => +row.diameter || '-',
                        format: (val, row) => +row.diameter ? this.splitZeros(+row.diameter) : '-',
                        sortable: true
                    },
                    {
                        label: 'Часов в сутках',
                        name: 'rotation_period',
                        align: 'center',
                        field: row => +row.rotation_period || '-',
                        sortable: true
                    },
                    {
                        label: 'Дней в году',
                        name: 'orbital_period',
                        align: 'center',
                        field: row => +row.orbital_period || '-',
                        format: val => +val ? this.splitZeros(+val) : '-',
                        sortable: true
                    },
                    {
                        label: 'Население',
                        name: 'population',
                        align: 'center',
                        field: row => +row.population || '-',
                        format: val => +val ? this.splitZeros(+val) : '-',
                        sortable: true
                    },
                ],
                pagination: {
                    page: 1,
                    sortBy: 'id',
                    rowsPerPage: 15,
                    perPageOptions: [15, 25, 50, 0]
                },
            },
        }
    },
}
</script>

<style lang="sass">
    .wrapper
        max-width: $main-width
        min-width: $main-width
        .header
            max-height: 184px
            min-height: 184px
            background: url(~assets/img/header.png) no-repeat
            background-position-y: 20%
            background-position-x: 50%
            font-family: ProximaThin, sans-serif
        .body
            .sticky-table
                height: calc(100vh - 254px)

                .q-table__top,
                .q-table__bottom,
                thead tr:first-child th
                    background-color: rgb(29,29,29)

                thead tr th
                    position: sticky
                    z-index: 1
                thead tr:first-child th
                    top: 0

                &.q-table--loading thead tr:last-child th
                    top: 48px
</style>