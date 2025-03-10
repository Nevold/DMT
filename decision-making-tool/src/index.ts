import { BaseComponent } from './components/base-component';
import {
  main,
  h1,
  list,
  li,
  addOptionButton,
  pasteListButton,
  clearListButton,
  wrapper,
  startButton
} from './components/tags';
import './global.css';

// const app = new App();
// app.start();

const mainNode = main;
const h1Node = h1;
const listNode = list;
const option = new BaseComponent('option', 'li').getNode();

document.body.append(mainNode);
mainNode.append(h1Node, listNode, addOptionButton(), pasteListButton(), clearListButton(), wrapper(), startButton());
listNode.append(li('#1'));
