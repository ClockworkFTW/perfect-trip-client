import styled from "styled-components";

// Components
import Icon from "../components/Icon";
import Label from "../components/Label";

const Field = ({ id, isValid, children }) => {
  const text = id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <Container>
      <Label id={id} text={text}>
        {isValid ? (
          <Icon icon="circle-check" color="green" shade="500" />
        ) : (
          <Icon icon="circle" color="neutral" shade="300" />
        )}
      </Label>
      {children}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 20px;
`;

export default Field;
