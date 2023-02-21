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
            className="flex justify-start items-center overflow-x-auto"
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
                flex flex-col bg-white border border-black`}
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                  >
                    <div className="text-xl p-2 flex justify-between items-center border-b-[1px] border-black">
                      <ArrowsHorizontal />
                      <Trash
                        className="cursor-pointer"
                        onClick={() => onClearAttachment(index)}
                      />
                    </div>
                    <div className="relative w-60 aspect-square overflow-hidden p-5">
                      <img
                        className="w-full h-full object-contain"
                        src={attachment}
                      />
                    </div>
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
