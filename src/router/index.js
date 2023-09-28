/*
 * @Copyright: 
 * @file name: File name
 * @Data: Do not edit
 * @LastEditor: 
 * @LastData: 
 * @Describe: 
 */
/*
 * @Copyright: 
 * @file name: File name
 * @Data: Do not edit
 * @LastEditor: 
 * @LastData: 
 * @Describe: 
 */
/*
 * @Copyright: 
 * @file name: File name
 * @Data: Do not edit
 * @LastEditor: 
 * @LastData: 
 * @Describe: 
 */
// /src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import longin from '../views/login.vue'
import registered from '../views/registered.vue'
import test from '../views/test.vue'
import imagelist from '../views/imagelist.vue'
import container from '../views/container.vue'

const routes = [
  {
    path: '/',
    name: 'longin',
    component: longin
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/imagelist',
    name: 'imagelist',
    component: imagelist
  },
  {
    path: '/registered',
    name: 'registered',
    component: registered
  },
  {
    path: '/container',
    name: 'container',
    component: container
  }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


export default router
