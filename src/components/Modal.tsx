import { X } from "phosphor-react";
import { ReactNode } from "react";

interface IModalProps {
  children: ReactNode;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ children, setState }: IModalProps) {
  const closeModal = () => {
    setState(false);
  };

  const onModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 w-full min-h-screen h-full bg-[rgba(0,0,0,0.3)] z-50 flex justify-center items-center overflow-y-auto"
    >
      <div
        onClick={onModalClick}
        className="absolute top-0 left-0 right-0 bottom-0 m-auto max-w-2xl w-full max-h-fit bg-white p-5 z-50"
      >
        <header className="mb-5 w-full flex justify-end items-center">
          <X onClick={closeModal} className="cursor-pointer" />
        </header>
        {children}
      </div>
    </div>
  );
}
