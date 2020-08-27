<template lang="pug">
  q-page.flex.flex-center(v-if="false")
    q-table.req-table.q-mt-sm(
      dense
      color="pink-5"
      :data="reqList"
      :columns="table.columns"
      :rows-per-page-label="phrases.table.perPage"
      :rows-per-page-options="table.pagination.perPageOptions"
      row-key="id"
      separator="horizontal"
      @row-click="rowClick"
      :pagination.sync="table.pagination"
      table-header-class="table-header"
      :no-data-label="phrases.table.nodata"
      binary-state-sort
      :loading="loading"
    )
      template(v-slot:body-cell-status="props")
        q-td(:props="props")
          q-avatar(
              :color="statusAssets.bgColors[props.row.status]"
              :text-color="statusAssets.colors[props.row.status]"
              :icon="statusAssets.icons[props.row.status]"
              :title="statusAssets.names[props.row.status]"
              size="24px"
            )
      template(v-slot:body-cell-resp="props")
        q-td(:props="props")
          q-avatar(
            v-if="props.row.responsibleUsr"
            :icon="`img:http://portal.euroset.lan/euroset.ru~photos~wm/CachedPhoto?id=${props.row.responsibleUsr.usrId}&sz=200&type=2`"
            :title="props.row.responsibleUsr.fullName"
          )
          template(v-else) -
</template>

<script>
export default {
  name: 'PageIndex',
  created () {
    this.$store.dispatch('planets/getAllPlanets');
  },
  data() {
    return {
      table: {
        columns: [
          { label: '№', name: 'id', required: true, align: 'left', field: 'id', sortable: true },
          { label: 'Статус', name: 'status', align: 'center', field: 'status', sortable: true },
          { label: 'Дата запроса', name: 'reqDateTime', align: 'center',
              field: row => row.reqDateTime,
              format: val => this.$moment(val).format('DD.MM.YYYY HH:mm:ss'),
              sortable: true,
              sort: (a,b) => (+this.$moment(a)) - (+this.$moment(b))
          },
          { label: 'Серийный номер', name: 'imei', align: 'center', field: 'imei' },
          { label: 'Номер тех.листа', name: 'techList', align: 'center', field: 'techList' },
          { label: 'Вид работ', name: 'workType', align: 'center', field: 'workType' },
          { label: 'Автор', name: 'created', align: 'center', field: row => row.author ? row.author.shortName : '-' },
          { label: 'Ответственный', name: 'resp', align: 'center', field: row => row.responsibleUsr.usrId },
        ],
        pagination: {
          sortBy: 'reqDateTime',
          perPageOptions: [10, 50, 100, 0],
          page: 1,
          rowsPerPage: 100
        },
      },
    }
  },
}
</script>
