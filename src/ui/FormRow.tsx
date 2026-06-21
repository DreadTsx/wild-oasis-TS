import type { ReactNode } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 0.8rem;

    &:has(button) {
      flex-direction: column-reverse;

      & button {
        width: 100%;
      }
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface FormRowProps {
  label?: string;
  children: ReactNode;
  error?: string;
  id?: string;
}

export default function FormRow({ label, children, error, id }: FormRowProps) {
  return (
    <StyledFormRow>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
