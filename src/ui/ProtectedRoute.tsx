import { useEffect, type ReactNode } from "react";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  //? 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //? 2. If there is NO authenticated user, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //? 3. While Loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //? 4. If there is a user, render the app
  if (isAuthenticated) return children;
}
