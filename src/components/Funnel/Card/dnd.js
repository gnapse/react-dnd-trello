const dragSource = {
  collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    };
  },

  spec: {
    beginDrag(props) {
      return {
        list: props.list,
        index: props.index,
        id: props.item.id,
      };
    },

    isDragging(props, monitor) {
      return props.item.id === monitor.getItem().id;
    },
  },
};

const dropTarget = {
  collect(connect) {
    return {
      connectDropTarget: connect.dropTarget(),
    };
  },

  spec: {
    hover(props, monitor, component) {
      if (!monitor.canDrop()) {
        return;
      }

      const item = monitor.getItem();
      const target = { list: props.list, index: props.index, id: props.item.id };
      const positionChanged = item.list !== target.list || item.index !== target.index;
      if (positionChanged) {
        props.moveCard(item, target);
      }
    },
  },
};

export default { dragSource, dropTarget };
