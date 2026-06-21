import { createContext, useContext, type ReactNode } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: auto;

  @media (max-width: 600px) {
    border: none;
    background-color: transparent;
    border-radius: 0;
    overflow: visible;
  }
`;

type CommonRowProp = {
  $columns?: string;
};

const CommonRow = styled.div<CommonRowProp>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;

  @media (max-width: 600px) {
    column-gap: 1.2rem;
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  white-space: nowrap;

  /* Column labels don't map onto a stacked card layout, so the header
     row is hidden once rows switch to cards below. */
  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  /* Default mobile fallback: stack every field full-width, top to bottom,
     so nothing gets squeezed into an unreadable sliver. Individual tables
     (BookingRow, CabinRow) extend this with their own grid-template-areas
     for a tidier, purpose-built card -- see "& > *:nth-child(n)" overrides
     in those files. */
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.6rem;
    padding: 1.6rem;
    margin: 0 1.2rem 1rem;
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    background-color: var(--color-grey-0);

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-100);
    }
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;

  @media (max-width: 600px) {
    margin: 1.2rem 0 0;
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

interface TableTypeContext {
  columns?: string;
}

interface TableTypes {
  children: ReactNode;
  columns?: string;
}

interface HeaderTypes {
  children: ReactNode;
}

interface RowTypes {
  children: ReactNode;
  className?: string;
}

interface BodyTypes<T> {
  data: T[];
  render: (item: T) => ReactNode;
}

const TableContext = createContext<TableTypeContext | undefined>(undefined);

const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Table compound components must be used within Table");
  }
  return context;
};

function Table({ children, columns }: TableTypes) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }: HeaderTypes) {
  const { columns } = useTable();
  return (
    <StyledHeader role="row" as="header" $columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children, className }: RowTypes) {
  const { columns } = useTable();
  return (
    <StyledRow role="row" $columns={columns} className={className}>
      {children}
    </StyledRow>
  );
}

function Body<T>({ render, data }: BodyTypes<T>) {
  if (!data.length) {
    return <Empty>No data to show at the moment</Empty>;
  }

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
