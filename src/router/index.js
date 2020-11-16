import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Login from '@/components/Login';
import Home from '@/components/Home';
import Label from '@/components/Label';
import AddLabel from '@/components/AddLabel';
import Type from '@/components/Type';
import AddType from '@/components/AddType';
import Blog from '@/components/Blog';
import BlogAdd from '@/components/BlogAdd';
import Blogger from '@/components/Blogger';
import AddBlogger from '@/components/AddBlogger';
import Comment from '@/components/Comment';
import User from '@/components/User';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'label',
          component: Label,
        },
        {
          path: 'addLabel',
          component: AddLabel,
        },
        {
          path: 'type',
          component: Type,
        },
        {
          path: 'addType',
          component: AddType,
        },
        {
          path: 'blog',
          component: Blog,
        },
        {
          path: 'addBlog',
          component: BlogAdd,
        },
        {
          path: 'blogger',
          component: Blogger,
        },
        {
          path: 'addBlogger',
          component: AddBlogger,
        },
        {
          path: 'comment',
          component: Comment,
        },
        {
          path: 'user',
          component: User,
        },
      ],
    },
  ],
});
