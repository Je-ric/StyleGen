import { createRouter, createWebHashHistory } from 'vue-router'
import { generators } from '../data/generators.js'
import HomeView from '../views/HomeView.vue'

const genRoutes = generators.map(g => ({
  path: g.path,
  component: g.component,
  meta: { title: g.name },
}))

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', component: HomeView },
    ...genRoutes,
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.afterEach(to => { document.title = to.meta.title ? `${to.meta.title} | StyleGen` : 'StyleGen | CSS Generator Suite' })

export default router
