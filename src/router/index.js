import { createRouter, createWebHashHistory } from 'vue-router'
import { generators } from '../data/generators.js'
import HomeView from '../views/HomeView.vue'

const genRoutes = generators.map(g => ({
  path: g.path,
  component: g.component,
}))

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    ...genRoutes,
  ],
})
