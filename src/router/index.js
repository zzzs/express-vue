import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index'
import Chatroom from '@/components/Chatroom/Index'
import History from '@/components/History/Index'
import HistoryAdd from '@/components/History/add-verse'
import Future from '@/components/Future/Index'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/chatroom',
            name: 'Chatroom',
            component: Chatroom
        },
        {
            path: '/history',
            name: 'History',
            component: History
        },
        {
            path: '/history/add',
            name: 'HistoryAdd',
            component: HistoryAdd
        },
        {
            path: '/future',
            name: 'Future',
            component: Future
        }
    ]
})
