import './global.css';
import Tags from './components/tags';
import { StorageService } from './services/local-storage.service';

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

StorageService.saveData({
  list: [
    { id: '#1', title: '1', weight: '1' },
    { id: '#3', title: '3sdad', weight: '10' },
    { id: '#4', title: 'aasd3', weight: '10' },
    { id: '#5', title: 'aaa3', weight: '10' }
  ],
  lastId: 3
});

StorageService.getDatabase();
// if (StorageService.data.list[0].id==="string"){

console.log(StorageService.data.list[0].id);
// }
StorageService.data.list.forEach(element => console.log(element.id));
