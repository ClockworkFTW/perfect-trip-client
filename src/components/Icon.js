import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

library.add(fas);

const Icon = ({ icon, color, shade, margin, shadow }) => (
  <Container
    icon={["fas", icon]}
    color={color}
    shade={shade}
    margin={margin}
    shadow={shadow}
  />
);

const Container = styled(FontAwesomeIcon)`
  margin: ${({ margin }) => margin};
  color: ${({ theme, color, shade }) =>
    color && shade ? theme[color][shade] : "inherit"};
  filter: ${({ shadow }) => (shadow ? "drop-shadow(0 0 4px #525252)" : "")};
`;

export default Icon;
