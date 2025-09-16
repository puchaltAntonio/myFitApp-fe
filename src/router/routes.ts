import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../modules/landing/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('../modules/landing/pages/HomePage.vue') },
      {
        path: 'workouts',
        name: 'workouts',
        component: () => import('../modules/workout/pages/WorkoutsPage.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../modules/profile/pages/ProfilePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('../modules/common/pages/ErrorNotFound.vue'),
  },
];

export default routes;
