import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../context/SidebarContext";

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 1099px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  min-width: 0;

  @media (max-width: 1099px) {
    padding: 3.2rem 2.4rem 4.8rem;
  }

  @media (max-width: 480px) {
    padding: 2.4rem 1.6rem 4rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default function AppLayout() {
  return (
    <SidebarProvider>
      <StyledApp>
        <Header />
        <Sidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledApp>
    </SidebarProvider>
  );
}
