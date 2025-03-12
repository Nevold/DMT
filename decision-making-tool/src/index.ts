import './global.css';
import Tags from './components/tags';

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
  Tags.startButton(),
  Tags.dialogNode
);
// listNode.append(Tags.li('#1'));

// StorageService.saveData({
//   list: [
//     { id: '#1', title: '1', weight: '1' },
//     { id: '#3', title: '3sdad', weight: '10' },
//     { id: '#4', title: 'aasd3', weight: '10' },
//     { id: '#5', title: 'aaa3', weight: '10' }
//   ],
//   lastId: 3
// });

// function sortById(data: Database): Database {
//   data.list.sort((a, b) => {
//     const firstId = Number([...a.id].pop());
//     const secondId = Number([...b.id].pop());
//     return firstId - secondId;
//   });
//   return data;
// }

// console.log(
//   sortById({
//     list: [
//       { id: '#1', title: '1', weight: '1' },
//       { id: '#5', title: '3sdad', weight: '10' },
//       { id: '#4', title: 'aasd3', weight: '10' },
//       { id: '#2', title: 'aaa3', weight: '10' }
//     ],
//     lastId: 3
//   })
// );

// StorageService.getData();
// if (StorageService.data.list[0].id==="string"){

// console.log(StorageService.data.list[0].id);
// }
// StorageService.data.list.forEach(element => console.log(element.id));
