import { BaseComponent } from './components/base-component';
import './global.css';

// const app = new App();
// app.start();

const main = new BaseComponent('main', 'div').getNode();
const heading = new BaseComponent('heading', 'h1', 'Decision Making Tool').getNode();
const list = new BaseComponent('list', 'ul').getNode();
const option = new BaseComponent('option', 'li').getNode();

document.body.append(main);
main.append(heading, list);
list.append(option);
