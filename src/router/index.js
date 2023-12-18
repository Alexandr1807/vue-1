// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts//Layout.vue'),
    children: [
      {
        path: '/users',
        name: 'Users',
        component: () => import('@/components/UsersList.vue'),
      },
      {
        path: '/docs',
        name: 'Documents',
        component: () => import('@/components/DocumentsList.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
