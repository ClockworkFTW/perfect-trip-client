import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

library.add(fas);

const Icon = ({ icon, color, shade, margin, size }) => (
  <Container
    icon={["fas", icon]}
    color={color}
    shade={shade}
    margin={margin}
    size={size}
  />
);

const Container = styled(FontAwesomeIcon)`
  margin: ${({ margin }) => margin};
  color: ${({ theme, color, shade }) =>
    color && shade ? theme[color][shade] : "inherit"};
`;

export default Icon;
