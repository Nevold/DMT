import { Nodes } from './components/nodes';
import './global.css';
import { Router } from './services/router.service';

document.addEventListener('DOMContentLoaded', () => {
  document.body.append(Nodes.main);
  Router.start();
});
