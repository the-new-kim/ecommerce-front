import { ArrowsHorizontal, Trash } from "phosphor-react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { cls } from "../../../libs/utils";

interface IAttachmentDNDProps {
  attachments: string[];
  setAttachments: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AttachmentDND({
  attachments,
  setAttachments,
}: IAttachmentDNDProps) {
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination || destination.index === source.index) return;

    setAttachments((prev) => {
      const newArray = [...prev];
      const draggingItem = newArray[source.index];

      newArray.splice(source.index, 1);
      newArray.splice(destination.index, 0, draggingItem);

      return newArray;
    });
  };

  const onClearAttachment = (index: number) => {
    setAttachments((prev) => {
      const newArray = [...prev];
      newArray.splice(index, 1);

      return newArray;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="images" direction="horizontal">
        {(magic) => (
          <div
            className="flex justify-start items-center bg-white border shadow-sm border-slate-300 rounded-md p-3"
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {attachments.map((attachment, index) => (
              <Draggable
                draggableId={"attachment" + index}
                key={"attachment" + index}
                index={index}
              >
                {(magic) => (
                  <div
                    className={`${cls(index === 0 ? "ml-0" : "ml-3")}
                flex flex-col h-full w-60 bg-white border shadow-sm border-slate-300 rounded-md aspect-square overflow-hidden`}
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                  >
                    <div className="text-xl p-2 flex justify-between items-center">
                      <ArrowsHorizontal />
                      <Trash
                        className="cursor-pointer"
                        onClick={() => onClearAttachment(index)}
                      />
                    </div>
                    <img
                      className="w-full h-full object-cover"
                      src={attachment}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {magic.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
