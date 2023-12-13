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
import test1 from '../views/test1.vue'
import imagelist from '../views/imagelist.vue'
import container from '../views/container.vue'
import aaaa from '../views/aaaa.vue'
import events from '../views/events.vue'
import video from '../views/video.vue'



const routes = [
  {
    path: '/',
    name: 'longin',
    component: longin
  },
  {
    path: '/test1',
    name: 'test1',
    component: test1
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
    path: '/aaaa',
    name: 'aaaa',
    component: aaaa
  },
  {
    path: '/events',
    name: 'events',
    component: events
  },
  {
    path: '/video',
    name: 'video',
    component: video
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
