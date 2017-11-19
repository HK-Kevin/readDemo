export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {title: "登入"},
  component: resolve => { require(['../views/Login.vue'], resolve);}
};
export const appRouter = [
  {
    path: '/test',
    name: 'Test',
    meta: {title: "登入"},
    component: resolve => { require(['../views/Test.vue'], resolve);}
  },
  {
    path: '/main/:id',
    name: 'main',
    meta: {title: "登入"},
    component: resolve => { require(['../views/Main.vue'], resolve)},

  }
];

export const routers = [loginRouter,...appRouter];

