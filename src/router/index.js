/* eslint-disable prettier/prettier */
import { createRouter, createWebHashHistory } from 'vue-router';

//Do not change store or routes import.
//Exact match alias set to support
//dotenv customizations.
import store from '../store';
import routes from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'nav-link--current',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

function allowRouterToNavigate(to, next) {
  console.log('allowRouterToNavigate called:', {
    path: to.path,
    component: to.matched[0]?.components?.default?.name,
    matched: to.matched,
  });
  
  // 检查是否在登录页面
  if (to.path === '/login') {
    // 如果已登录，重定向到概览页面
    if (store.getters['authentication/isLoggedIn']) {
      console.log('Already logged in, redirecting to overview');
      next('/overview');
      return;
    }
  }

  // 检查是否需要认证
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log('Route requires auth:', to.path);
    if (!store.getters['authentication/isLoggedIn']) {
      console.log('Not logged in, redirecting to login');
      next('/login');
      return;
    }
  }

  // 如果是根路径，重定向到概览页面
  if (to.path === '/') {
    console.log('Root path detected, redirecting to overview');
    next('/overview');
    return;
  }

  console.log('Proceeding with navigation to:', to.path);
  next();
}

router.beforeEach((to, from, next) => {
  console.log('Navigation Details:', {
    to: to.path,
    from: from.path,
    isLoggedIn: store.getters['authentication/isLoggedIn'],
    requiresAuth: to.matched.some((record) => record.meta.requiresAuth),
    matched: to.matched.map((record) => record.path),
    components: to.matched.map((record) => record.components?.default?.name),
  });

  allowRouterToNavigate(to, next);
});

export default router;
