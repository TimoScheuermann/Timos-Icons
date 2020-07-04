import EmptyRouter from '@/views/EmptyRouter.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const prefix = "Timo's Icons | ";

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackPrefetch: true */ '@/views/TimosIcons-Home.vue'),
      meta: {
        title: prefix + 'Home'
      }
    },
    {
      path: '/getting started',
      name: 'howto',
      component: () => import('@/views/TimosIcons-HowTo.vue'),
      meta: {
        title: prefix + 'Getting Started',
        back: {
          title: 'Home',
          route: 'home'
        }
      }
    },
    {
      path: '/versions',
      name: 'versions',
      component: () => import('@/views/TimosIcons-Versions.vue'),
      meta: {
        title: prefix + 'Versions',
        back: {
          title: 'Home',
          route: 'home'
        }
      }
    },
    {
      path: '/icons',
      component: EmptyRouter,
      children: [
        {
          path: '',
          name: 'icons',
          component: () =>
            import(
              /* webpackPrefetch: true */ '@/views/icons/TimosIcons-Icons.vue'
            ),
          meta: {
            title: prefix + 'Icons',
            back: {
              title: 'Home',
              route: 'home'
            }
          }
        },
        {
          path: ':icon',
          name: 'iconsdetails',
          component: () => import('@/views/icons/TimosIcons-Icons-Detail.vue'),
          meta: {
            title: prefix + '%icon%',
            back: {
              title: 'Icons',
              route: 'icons'
            }
          }
        }
      ]
    },
    {
      path: '/issues',
      component: EmptyRouter,
      children: [
        {
          path: '',
          name: 'issues',
          component: () => import('@/views/issues/TimosIcons-Issues.vue'),
          meta: {
            title: prefix + 'Issues',
            back: {
              title: 'Home',
              route: 'home'
            }
          }
        },
        {
          path: ':issue',
          name: 'issuesdetails',
          component: () =>
            import('@/views/issues/TimosIcons-Issues-Details.vue'),
          meta: {
            title: prefix + 'Issue #%issue%',
            back: {
              title: 'Issues',
              route: 'issues'
            }
          }
        }
      ]
    },
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
});

export default router;

export function getTitle(): string {
  let name: string = router.currentRoute.meta.title;
  if (!name) return "Timo's Icons";
  if (name.includes('%icon%'))
    name = name.split('%icon%').join(router.currentRoute.params.icon);
  if (name.includes('%issue%'))
    name = name.split('%issue%').join(router.currentRoute.params.issue);
  return name;
}
