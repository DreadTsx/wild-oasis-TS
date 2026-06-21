import {
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  max-width: 92vw;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 480px) {
    padding: 2.4rem 1.8rem;
    max-width: 95vw;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface ModalTypeContext {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

interface ModalProps {
  children: ReactNode;
}

interface WindowProps {
  children: ReactElement;
  name: string;
}

interface OpenProps {
  // children: ReactElement;
  children: (open: () => void) => ReactNode;
  opens: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ModalContext = createContext<ModalTypeContext | undefined>(
  undefined
);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal compound components must be used within Modal");
  }
  return context;
}

export default function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// function Open({ opens: openWindowName, children }: OpenProps) {
//   const { open } = useModalContext();
//   return cloneElement(children, { onClick: () => open(openWindowName) });
// }
function Open({ opens: openWindowName, children }: OpenProps) {
  const { open } = useModalContext();
  return <>{children(() => open(openWindowName))}</>;
}

function Window({ children, name }: WindowProps) {
  const { openName, close } = useModalContext();
  const ref = useOutsideClick<HTMLDivElement>(close);
  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Window = Window;
Modal.Open = Open;
