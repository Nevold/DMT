import './global.css';
import Tags from './components/tags';
import StorageService from './services/local-storage.service';

// const app = new App();
// app.start();

const mainNode = Tags.main;
const h1Node = Tags.h1;
const listNode = Tags.list();
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
// listNode.append(Tags.li('#1'));

StorageService.saveData({ list: 'dd', lastId: 5 });

StorageService.getDatabase();
console.log(StorageService.data.list);
