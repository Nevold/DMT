import { BaseComponent } from './components/base-component';
import { main, h1, list } from './components/tags';
import './global.css';

// const app = new App();
// app.start();

const mainNode = main.getNode();
const h1Node = h1.getNode();
const listNode = list.getNode();
const option = new BaseComponent('option', 'li').getNode();

document.body.append(mainNode);
mainNode.append(h1Node, listNode);
listNode.append(option);
