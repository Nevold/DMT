import { Nodes } from './components/nodes';
import { DecisionPicker } from './components/pages/decision-picker';
import { ListOfOptions } from './components/pages/list-of-options';
import { NotFound } from './components/pages/not-found';
import './global.css';
import { HashRouter } from './services/router.service';

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    if (!globalThis.location.hash) {
      globalThis.location.hash = '#/';
    }

    document.body.append(Nodes.main);
    // Router.start();

    const router = new HashRouter();

    router.addRoute('/', () => {
      Nodes.main.replaceChildren();
      ListOfOptions.start();
    });

    router.addRoute('/about', () => {
      Nodes.main.replaceChildren();
      DecisionPicker.start();
    });

    router.setNotFound(() => {
      Nodes.main.replaceChildren();
      NotFound.start();
    });
  });
});
