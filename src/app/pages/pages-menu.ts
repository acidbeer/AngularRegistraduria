import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  
  {
    title: 'Candidatos',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Listar Candidatos',
        link: '/pages/candidato/listar',
      },
      {
        title: 'Crear Candidatos',
        link: '/pages/candidato/crear',
      },
      
    ],
  },
  {
    title: 'Mesas',
    icon: 'keypad-outline',
    link: '/pages/mesa',
    children: [
      {
        title: 'Listar Mesas',
        link: '/pages/mesa/listar',
      },
      {
        title: 'Crear Mesas',
        link: '/pages/mesa/crear',
      },
      
    ],
  },
  {
    title: 'Partidos',
    icon: 'browser-outline',
    children: [
      {
        title: 'Listar Partidos',
        link: '/pages/partido/listar',
      },
      {
        title: 'Crear Partidos',
        link: '/pages/partido/crear',
      },
    ],
  },
  {
    title: 'Resultados',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Listar Resultados',
        link: '/pages/resultado/listar',
      },
      {
        title: 'Crear Resultados',
        link: '/pages/resultado/crear',
      },
    ],
  },

  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/pages/seguridad/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
