import { BaseComponent } from './components/base-component';
import { main, h1, list, label, inputTitle, inputWeight, buttonDelete } from './components/tags';
import './global.css';

// const app = new App();
// app.start();

const mainNode = main;
const h1Node = h1;
const listNode = list;
const option = new BaseComponent('option', 'li').getNode();

document.body.append(mainNode);
mainNode.append(h1Node, listNode);
listNode.append(label('#1'), inputTitle('#1'), inputWeight(), buttonDelete());
