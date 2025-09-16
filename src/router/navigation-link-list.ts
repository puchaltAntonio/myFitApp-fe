import type { NavigationLink } from 'src/modules/landing/interfaces/navigation-links.interface';

export const linksList: NavigationLink[] = [
  {
    title: 'Home',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Workouts',
    icon: 'fitness_center',
    link: '/workouts',
  },
  {
    title: 'Profile',
    icon: 'person',
    link: '/profile',
  },
];
