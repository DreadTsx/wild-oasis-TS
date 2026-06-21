import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { useContext } from "react";
import { ModalContext } from "./Modal";

const StyledConfirmDelete = styled.div`
  width: min(40rem, 85vw);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

interface ConfirmDeleteTypes {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
}
function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
}: ConfirmDeleteTypes) {
  const { close } = useContext(ModalContext)!;
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button $variation="secondary" disabled={disabled} onClick={close}>
          Cancel
        </Button>
        <Button $variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
