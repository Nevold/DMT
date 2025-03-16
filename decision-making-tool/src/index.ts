import { ListOfOptions } from './components/pages/list-of-options';
import './global.css';
import { Router } from './services/router.service';
import type { Route } from './types/types';

// ListOfOptions.start();

const routes: Route[] = [
  {
    path: '/',
    title: 'Home',
    template: ListOfOptions
  },
  {
    path: '/about',
    title: 'About Us',
    template: '<h1>About Page</h1><p>Learn more about our company.</p>'
  },
  {
    path: '/contact',
    title: 'Contact',
    template: '<h1>Contact Page</h1><p>Get in touch with us.</p>'
  }
];

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Router(routes, 'app');
});
