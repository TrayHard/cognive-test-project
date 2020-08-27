<template lang="pug">
    q-page.flex.flex-center
        .wrapper
            q-table(
                dense
                :data="planets"
                :columns="table.columns"
                :rows-per-page-options="table.pagination.perPageOptions"
                :pagination.sync="table.pagination"
                :loading="table.loading"
                binary-state-sort
            )
</template>

<script>
import { mapState } from 'vuex'
import { actTypes } from '@store/planets/types';

export default {
    name: 'PageIndex',
    created () {
        this.$store.dispatch(`planets/${actTypes.GET_ALL_PLANETS}`)
            .then(response => {
                this.table.loading = false;
            })
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
                columns: [
                    { label: 'Название планеты', name: 'name', required: true, field: 'name', align: 'center', sortable: true },
                    { label: 'Добавлено', name: 'created', align: 'center',
                        field: row => row.created,
                        format: val => this.$moment(val).format('DD.MM.YYYY'),
                        sortable: true,
                        sort: (a,b) => (+this.$moment(a)) - (+this.$moment(b))
                    },
                    // { label: 'Серийный номер', name: 'imei', align: 'center', field: 'imei' },
                    // { label: 'Номер тех.листа', name: 'techList', align: 'center', field: 'techList' },
                    // { label: 'Вид работ', name: 'workType', align: 'center', field: 'workType' },
                    // { label: 'Автор', name: 'created', align: 'center', field: row => row.author ? row.author.shortName : '-' },
                    // { label: 'Ответственный', name: 'resp', align: 'center', field: row => row.responsibleUsr.usrId },
                ],
                pagination: {
                    page: 1,
                    sortBy: 'name',
                    rowsPerPage: 25,
                    perPageOptions: [10, 25, 50]
                },
            },
        }
    },
}
</script>

<style lang="sass">
    .wrapper
        max-width: 1250px
</style>