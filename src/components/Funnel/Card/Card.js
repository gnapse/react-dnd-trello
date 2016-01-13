import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Card.scss';
import withStyles from '../../../decorators/withStyles';
import { DragSource, DropTarget } from 'react-dnd';
import { dragSource, dropTarget } from './dnd';

@DragSource('card', dragSource.spec, dragSource.collect)
@DropTarget('card', dropTarget.spec, dropTarget.collect)
@withStyles(s)
class Card extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    moveCard: PropTypes.func.isRequired,
  }

  render() {
    const {connectDragSource, connectDropTarget, isDragging} = this.props;
    const {item} = this.props;
    const classNames = cx(s.card, { [s.dragging]: isDragging })
    return connectDragSource(connectDropTarget(
      <li className={classNames}>
        <div className={s.inner}>
          <span>{item.text}</span>
        </div>
      </li>
    ));
  }

}

export default Card;
