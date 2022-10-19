import styled from "styled-components";

const Button = ({ children, onClick, width }) => (
  <Container width={width} onClick={onClick}>
    {children}
  </Container>
);

const Container = styled.button`
  width: ${({ width }) => width};
  background-color: ${({ theme }) => theme.green["500"]};
  border-radius: 8px;
  border: none;
  color: ${({ theme }) => theme.white};
  font-weight: 700;
  padding: 8px 12px;
  :hover {
    cursor: pointer;
  }
`;

export default Button;
