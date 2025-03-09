import { BaseComponent } from './components/base-component';
import { button } from './components/button/button';
import './global.css';

// const app = new App();
// app.start();

console.log(button);

document.body.append(new BaseComponent('dd', 'button').getNode());
