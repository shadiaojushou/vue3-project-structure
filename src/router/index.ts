import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
});

/* 重置路由 */
// export function resetRouter() {
//   router.replace();
// }

/* 路由前置守卫 */
// router.beforeEach();

/* 后置路由守卫 */
router.afterEach(() => {
  NProgress.done();
});
export default router;
