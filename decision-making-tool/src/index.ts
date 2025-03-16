import { Nodes } from './components/nodes';
import './global.css';
import { HashRouter } from './services/router.service';

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    if (!globalThis.location.hash) {
      globalThis.location.hash = '#/';
    }

    document.body.append(Nodes.main);

    HashRouter.start();
  });
});
