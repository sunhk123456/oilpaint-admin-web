import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login"
import Main from "@/views/main/Main"
import List from "@/views/list/List"
import Lists from "@/views/lists/Lists"
import Details from "@/views/details/Details"
import CategoryAdd from "@/views/main/category/Add"
import DetailAdd from "@/views/main/detail/detailAdd.vue"
import CategoryIndex from "@/views/main/category/Index"
import CategoryEdit from "@/views/main/category/Edit"
import Changepass from "../views/main/pass/Changepass";
import Stayhomeadd from "../views/main/stayhome/Stayhomeadd";
import Stayhomeindex from "../views/main/stayhome/Stayhomeindex";
import Stayhomeedit from "../views/main/stayhome/Stayhomeedit";
import MessageFeedback   from "../views/main/leaveMessage/Feedback";
import MessageEdit from "../views/main/leaveMessage/Edit";
import UserEdit from "../views/main/userEdit/Edit";
import Echarts from "../views/main/echarts/Echarts"

Vue.use(VueRouter)
let router = new VueRouter({
    routes: [
        {
            path: '/', component: Main, name: "index"
            , meta: {
                auth: true, title: '首页'
            },
            children: [
                {
                        path: 'echarts', component: Echarts, name: "echarts"
                    , meta: {
                        auth: true, title: '可视化数据'
                    }
                },
                {
                    path: 'categoryadd', component: CategoryAdd, name: "categoryadd"
                    , meta: {
                        auth: true, title: '分类的添加'
                    }
                },
                {
                    path: 'stayhomeindex', component: Stayhomeindex, name: "stayhomeindex"
                    , meta: {
                        auth: true, title: '民宿的查看'
                    }
                } ,
               {
                    path: 'stayhomeadd', component: Stayhomeadd, name: "stayhomeadd"
                    , meta: {
                        auth: true, title: '民宿的添加'
                    }
                } ,
                {
                    path: 'stayhomeedit', component: Stayhomeedit, name: "stayhomeedit"
                    , meta: {
                        auth: true, title: '民宿的编辑'
                    }
                } ,
                {
                    path: 'changepass', component: Changepass, name: "changepass"
                    , meta: {
                        auth: true, title: '密码的修改'
                    }
                },
                {
                    path: 'categoryindex', component: CategoryIndex, name: "categoryindex"
                    , meta: {
                        auth: true, title: '分类查看'
                    }
                },
                {
                    path: 'categoryedit', component: CategoryEdit, name: "categoryedit"
                    , meta: {
                        auth: true, title: '分类编辑'
                    }
                },
                {
                    path: 'DetailAdd', component: DetailAdd, name: "DetailAdd"
                    , meta: {
                        auth: true, title: '添加detail'
                    }
                },
                {
                    path: 'MessageEdit', component: MessageEdit, name: "MessageEdit"
                    , meta: {
                        auth: true, title: '留言编辑'
                    }
                },
                {
                    path: 'MessageFeedback', component: MessageFeedback, name: "MessageFeedback"
                    , meta: {
                        auth: true, title: '留言反馈'
                    }
                },
                {
                    path: 'UserEdit', component: UserEdit, name: "UserEdit"
                    , meta: {
                        auth: true, title: '前台用户管理'
                    }
                },
            ]

        },

        {
            path: '/login', component: Login, name: "login"
            , meta: {
                auth: false, title: '登录'
            }
        },
        {
            path: '/list', component: List, name: "list"
            , meta: {
                auth: true, title: '列表页'
            }
        }
        ,
        {
            path: '/lists', component: Lists, name: "list"
            , meta: {
                auth: true, title: '列表页s'
            }
        }
        ,
        {
            path: '/details', component: Details, name: "details"
            , meta: {
                auth: true, title: '详情页'
            }
        }


    ]
})
//全局前置守卫  导航守卫  login=>list
//不能从list？user=1=>list？user=2
router.beforeEach((to, from, next) => {
    let title = to.meta.title || '首页';
    document.title = title;
    if (to.meta.auth) {
        let token = sessionStorage.getItem('token')
        token = token && token.trim();
        if (token) {
            next();
        } else {
            next({
                name: 'login'
                , query: {redirect: to.name}
            })
        }
    } else {
        next();
    }
})
export default router;
// {
//     path: '/logins', component:A, name: "logins"
//     ,
//     children: [
//     // {
//     //                 //     path: 'echarts', component: logins, name: "logins"
//     //                 //     , meta: {
//     //                 //         auth: true, title: '可视化数据'
//     //                 //     }
//     //                 // },
//
// ]
//
// },