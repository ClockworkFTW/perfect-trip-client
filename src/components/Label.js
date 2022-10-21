import styled from "styled-components";

const Label = ({ id, text, children }) => (
  <Wrapper>
    <Container htmlFor={id}>
      {children}
      <Text margin={children ? "4px" : "0"}> {text}</Text>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  margin-bottom: 8px;
`;

const Container = styled.label`
  font-weight: 700;
  color: ${({ theme }) => theme.neutral["700"]};
`;

const Text = styled.span`
  margin-left: ${({ margin }) => margin};
`;

export default Label;
