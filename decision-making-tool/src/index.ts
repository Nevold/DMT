import './global.css';
import Tags from './components/tags';

// const app = new App();
// app.start();

const mainNode = Tags.main;
const h1Node = Tags.h1;
const listNode = Tags.list;
// const Tags.option = new BaseComponent('option', 'li').getNode();

document.body.append(mainNode);
mainNode.append(
  h1Node,
  listNode,
  Tags.addOptionButton(),
  Tags.pasteListButton(),
  Tags.clearListButton(),
  Tags.wrapper(),
  Tags.startButton()
);
listNode.append(Tags.li('#1'));
