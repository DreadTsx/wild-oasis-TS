import styled, { css } from "styled-components";

interface FormProps {
  type?: "regular" | "modal";
}

const Form = styled.form<FormProps>`
  overflow: hidden;
  font-size: 1.4rem;

  ${({ type = "regular" }) =>
    type === "regular" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${({ type = "regular" }) =>
    type === "modal" &&
    css`
      width: min(80rem, 90vw);
    `}
`;

export default Form;
