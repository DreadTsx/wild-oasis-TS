import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
} from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

type Position = {
  x: number;
  y: number;
};

type StyledListProp = {
  $position: Position;
};

const StyledList = styled.ul<StyledListProp>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface MenusContextType {
  openId: number | null;
  close: () => void;
  open: (id: number) => void;
  position: Position | null;
  setPosition: (position: Position) => void;
}

interface MenusProps {
  children: ReactNode;
}

interface ToggleProps {
  id: number;
}

interface ListProps {
  id: number;
  children: ReactNode;
}

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
}

const MenusContext = createContext<MenusContextType | undefined>(undefined);

function useMenus() {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Menus compound components must be used within Menus");
  }
  return context;
}

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  //
  const open = setOpenId;
  const close = () => setOpenId(null);
  return (
    <MenusContext.Provider
      value={{ open, close, openId, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: ToggleProps) {
  const { setPosition, openId, open, close } = useMenus();
  const handleToggle = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const button = e.currentTarget;
    const rectangle = button.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rectangle.width - rectangle.x,
      y: rectangle.y - rectangle.width + 8,
    });

    if (openId !== id || openId === null) {
      open(id);
    } else {
      close();
    }
  };

  return (
    <StyledToggle onClick={handleToggle}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: ListProps) {
  const { openId, position, close } = useMenus();
  const ref = useOutsideClick(close) as RefObject<HTMLUListElement>;

  if (openId !== id || !position) return null;

  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}

function Button({ children, icon, onClick }: ButtonProps) {
  const { close } = useMenus();
  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <StyledButton onClick={handleClick}>
      {icon} <span>{children}</span>
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
