import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    { path: '/',
      component: load('Layout'),
      props: { stringPageScopeName: 'layout' },
      children: [
        { path: '',
          name: 'home',
          component: load('Home'),
          props: {stringPageScopeName: 'home'},
          meta: {requireAuthCheck: false, requireAuthUncheck: true}
        },
        { path: '/advert/show/:id',
          name: 'advertShow',
          component: load('AdvertShow'),
          props: {stringPageScopeName: 'advertShow'},
          meta: {requireAuthCheck: false, requireAuthUncheck: false}
        },
        { path: '/quiz/show/:id',
          name: 'quizShow',
          component: load('QuizShow'),
          props: {stringPageScopeName: 'quizShow'},
          meta: {requireAuthCheck: false, requireAuthUncheck: false}
        },
        { path: '/settings',
          name: 'settings',
          component: load('Settings'),
          props: {stringPageScopeName: 'settings'},
          meta: {requireAuthCheck: false, requireAuthUncheck: false}
        },
        { path: '/login',
          name: 'login',
          component: load('Login'),
          props: {stringPageScopeName: 'login'},
          meta: {requireAuthCheck: false, requireAuthUncheck: true}
        },
        { path: '/register',
          name: 'register',
          component: load('Register'),
          props: {stringPageScopeName: 'register'},
          meta: {requireAuthCheck: false, requireAuthUncheck: true}
        },
        { path: '/myAdverts',
          name: 'myAdverts',
          component: load('MyAdverts'),
          props: {stringPageScopeName: 'myAdverts'},
          meta: {requireAuthCheck: true, requireAuthUncheck: false}
        },
        { path: '/createAdvert',
          name: 'createAdvert',
          component: load('CreateAdvert'),
          props: {stringPageScopeName: 'createAdvert'},
          meta: {requireAuthCheck: true, requireAuthUncheck: false}
        },
        { path: '/test', component: load('Test') }
      ]
    },
    { path: '/testLangs', component: load('TestLangs') },
    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})
