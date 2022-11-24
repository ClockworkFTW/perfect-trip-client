import { DragDropContext } from "react-beautiful-dnd";

// Components
import { ListA, ListB } from "./List";

const Itinerary = ({ actions, lists, itinerary }) => {
  const onDragEnd = (result) => {
    const id = result.draggableId;

    const srcIndex = result.source.index;
    const dstIndex = result.destination.index;

    let srcDate = result.source.droppableId;
    let dstDate = result.destination.droppableId;

    // No movement
    if (srcIndex === dstIndex && srcDate === dstDate) {
      return;
    }

    if (srcDate === "unassigned") {
      srcDate = null;
    }

    if (dstDate === "unassigned") {
      dstDate = null;
    }

    actions.moveEvent({ id, srcDate, srcIndex, dstDate, dstIndex });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ListA actions={actions} itinerary={itinerary} />
      {lists.map((list) => (
        <ListB
          key={list.id}
          actions={actions}
          list={list}
          itinerary={itinerary}
        />
      ))}
    </DragDropContext>
  );
};

export default Itinerary;
