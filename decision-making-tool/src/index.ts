import { Options } from './components/controls/options';
import { Nodes } from './components/nodes';
import { DecisionPicker } from './components/pages/decision-picker';
import { ListOfOptions } from './components/pages/list-of-options';
import { NotFound } from './components/pages/not-found';
import './global.css';
import { HashRouter } from './services/router.service';

document.addEventListener('DOMContentLoaded', () => {
  if (!globalThis.location.hash) {
    globalThis.location.hash = '#/';
  }

  document.body.append(Nodes.main);

  HashRouter.start();

  HashRouter.addRoute('/', () => {
    Nodes.main.replaceChildren();
    Options.list().replaceChildren();
    ListOfOptions.start();
  });

  HashRouter.addRoute('/decision-picker', () => {
    Nodes.formPickNode.replaceChildren();
    Nodes.main.replaceChildren();
    DecisionPicker.start();
  });

  HashRouter.setNotFound(() => {
    Nodes.main.replaceChildren();
    NotFound.start();
  });
});
