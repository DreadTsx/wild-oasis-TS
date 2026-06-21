import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity";
import TodayItem from "./TodayItem";
import Spinner from "../../ui/Spinner";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  height: 34rem;
  padding-top: 2.4rem;

  /* The grid only has 2 columns at this width, so "span 2" is the full row anyway,
     but being explicit avoids relying on an implicit column being created. */
  @media (max-width: 1099px) {
    grid-column: 1 / -1;
  }

  @media (max-width: 480px) {
    padding: 2.4rem 1.6rem;
  }
`;

const TodayList = styled.ul`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoading ? (
        activities && activities.length > 0 ? (
          <TodayList>
            {activities?.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
