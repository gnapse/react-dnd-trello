import React, { Component } from 'react';
import s from './Board.scss';
import withStyles from '../../../decorators/withStyles';
import List from '../List';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';

@DragDropContext(HTML5Backend)
@withStyles(s)
class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lists: [{
        id: 1,
        title: 'To do',
        items: [
          { id: 1, text: 'Buy some milk' },
          { id: 2, text: 'Pick mom at the airport' },
          { id: 3, text: 'Wash the car' },
          { id: 4, text: 'Do the laundry' },
          { id: 5, text: 'Pay the rent' },
        ],
      }, {
        id: 2,
        title: 'In progress',
        items: [],
      }, {
        id: 3,
        title: 'Done',
        items: [],
      }],
    };
    this.moveList = this.moveList.bind(this);
    this.moveCard = this.moveCard.bind(this);
  }

  render() {
    const {lists} = this.state;
    return (
      <div className={s.board}>
        <div className={s.lists}>
          {lists.map((list, index) => (
            <List
              index={index}
              list={list}
              moveList={this.moveList}
              moveCard={this.moveCard}
              key={list.id} />
          ))}
        </div>
      </div>
    );
  }

  moveCard(item, target) {
    const dragItem = this.state.lists[item.list].items[item.index];
    const remove = { lists: {} };
    const insert = { lists: {} };
    remove.lists[item.list] = { items: { $splice: [[item.index, 1]] } };
    insert.lists[target.list] = { items: { $splice: [[target.index, 0, dragItem]] } };
    this.setState(update(update(this.state, remove), insert));
    item.index = target.index;
    item.list = target.list;
  }

  moveList(list, target) {
    const dragItem = this.state.lists[list.index];
    this.setState(update(this.state, {
      lists: {
        $splice: [
          [list.index, 1],
          [target.index, 0, dragItem],
        ],
      },
    }));
    list.index = target.index;
  }

}

export default Board;
