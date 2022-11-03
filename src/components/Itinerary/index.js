import styled from "styled-components";

const Itinerary = ({ itinerary }) => {
  return (
    <Wrapper>
      <Container>
        <h1>Itinerary</h1>
        {itinerary.experiences.map((experience) => (
          <p>{experience.name}</p>
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px;
  border-right: ${({ theme }) => `1px solid ${theme.neutral["300"]}`};
  background-color: ${({ theme }) => theme.white};
  overflow-y: scroll;
`;

export default Itinerary;
