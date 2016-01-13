import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './List.scss';
import withStyles from '../../../decorators/withStyles';
import Card from '../Card';
import { DragSource, DropTarget } from 'react-dnd';
import { dragSource, dropTarget, arePropsEqual } from './dnd';

@DragSource('list', dragSource.spec, dragSource.collect, {arePropsEqual})
@DropTarget(['card', 'list'], dropTarget.spec, dropTarget.collect, {arePropsEqual})
@withStyles(s)
class List extends Component {

  static propTypes = {
    list: PropTypes.object.isRequired,
    moveList: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
  }

  render() {
    const {connectDragSource, connectDropTarget, connectDragPreview, isDragging} = this.props;
    const {title, items} = this.props.list;
    const {length} = items;
    const className = cx(s.list, { [s.empty]: length === 0, [s.dragging]: isDragging });
    return connectDragPreview(connectDropTarget(
      <div className={className}>
        <header className={s.header}>
          {connectDragSource(<h3>{title} ({items.length})</h3>)}
        </header>
        {length ? this.renderList() : this.renderEmpty()}
      </div>
    ));
  }

  renderList() {
    const {items} = this.props.list;
    return (
      <ul>
        {items.map((item, index) => (
          <Card key={item.id}
            item={item}
            index={index}
            list={this.props.index}
            moveCard={this.props.moveCard} />
        ))}
      </ul>
    );
  }

  renderEmpty() {
    return (
      <div className={s.target}>
        <span>Drop items here</span>
      </div>
    );
  }

}

export default List;
