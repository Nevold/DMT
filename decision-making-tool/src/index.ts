import { Nodes } from './components/nodes';
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
    path: '/decision-picker',
    title: 'About Us',
    template: '<h1>About Page</h1><p>Learn more about our company.</p>'
  }
];

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.body.append(Nodes.main);
  new Router(routes, 'app');
});
