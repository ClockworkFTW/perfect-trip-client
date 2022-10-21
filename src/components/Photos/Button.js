import styled from "styled-components";

import Icon from "../Icon";

const Button = ({ onChange }) => (
  <Container>
    <Input type="file" multiple onChange={onChange} />
    <Content>
      <Icon icon="plus" />
    </Content>
  </Container>
);

const Container = styled.label`
  display: block;
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.white};
  :hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  display: none;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: ${({ theme }) => theme.neutral["300"]};
`;

export default Button;
