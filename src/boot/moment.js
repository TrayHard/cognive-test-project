// import something here
export default async ({ Vue /* app, router, Vue, ... */ }) => {
    const moment = require('moment')
    require('moment/locale/ru')
    Vue.use(require('vue-moment'), { moment })
}