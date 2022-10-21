import styled from "styled-components";

const Flag = ({ code, margin }) => (
  <Element margin={margin} src={`https://flagcdn.com/h20/${code}.png`} />
);

const Element = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  object-fit: cover;
  margin: ${({ margin }) => margin};
`;

export default Flag;
