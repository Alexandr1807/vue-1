// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Layout.vue'),
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/components/Users/UsersList.vue'),
      },
      {
        path: 'docs',
        name: 'Documents',
        component: () => import('@/components/Documents/DocumentsList.vue'),
      },
      {
        path: 'users/:id',
        name: 'UserProfile',
        component: () => import('@/components/Users/UserProfile.vue')
      },
      {
        path: 'docs/:id',
        name: 'Document',
        component: () => import('@/components/Documents/Document.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
