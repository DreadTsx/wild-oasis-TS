import styled, { css } from "styled-components";

type RowProps = {
  type?: "vertical" | "horizontal";
};

const Row = styled.div<RowProps>`
  display: flex;

  ${({ type = "vertical" }) =>
    type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.6rem;
    `}

  ${({ type = "vertical" }) =>
    type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
