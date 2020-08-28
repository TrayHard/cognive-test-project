// import something here
export default async ({ Vue /* app, router, Vue, ... */ }) => {
    Vue.mixin({
        methods: {
            showError(msg, err) {
                this.$q.notify({
                    type: 'negative',
                    position: "top",
                    message: `${msg ? msg : 'Ошибка!'}${err ? ': ' + err : ''}`
                })
            },
            showSuccess(msg) {
                this.$q.notify({
                    type: 'positive',
                    position: "top",
                    message: `${msg ? msg : 'Успешно!'}`,
                    timeout: 1500
                })
            },
            splitZeros(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
        },
    })
}