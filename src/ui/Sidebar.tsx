import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useSidebar } from "../context/SidebarContext";

const StyledSidebar = styled.aside<{ $isOpen: boolean }>`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 1099px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: min(28rem, 80vw);
    z-index: 1100;
    box-shadow: var(--shadow-lg);
    overflow-y: auto;
    transition: transform 0.3s ease;
    transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
  }
`;

const Backdrop = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 1099px) {
    display: ${(props) => (props.$isOpen ? "block" : "none")};
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    z-index: 1050;
  }
`;

const CloseButton = styled.button`
  display: none;

  @media (max-width: 1099px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
    background: none;
    border: none;
    padding: 0.6rem;
    border-radius: var(--border-radius-sm);

    & svg {
      width: 2.4rem;
      height: 2.4rem;
      color: var(--color-grey-500);
    }

    &:hover {
      background-color: var(--color-grey-100);
    }
  }
`;

export default function Sidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={close} />
      <StyledSidebar $isOpen={isOpen}>
        <CloseButton onClick={close} aria-label="Close menu">
          <HiXMark />
        </CloseButton>
        <Logo />
        <MainNav />
      </StyledSidebar>
    </>
  );
}
