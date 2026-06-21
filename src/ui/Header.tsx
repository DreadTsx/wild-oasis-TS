import styled from "styled-components";
import { HiBars3 } from "react-icons/hi2";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";
import { useSidebar } from "../context/SidebarContext";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 1099px) {
    justify-content: space-between;
    padding: 1.2rem 2.4rem;
  }

  @media (max-width: 480px) {
    padding: 1.2rem 1.6rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  @media (max-width: 1099px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  min-width: 0;
`;

export default function Header() {
  const { toggle } = useSidebar();

  return (
    <StyledHeader>
      <MenuButton onClick={toggle} aria-label="Open menu">
        <HiBars3 />
      </MenuButton>
      <RightGroup>
        <UserAvatar />
        <HeaderMenu />
      </RightGroup>
    </StyledHeader>
  );
}
