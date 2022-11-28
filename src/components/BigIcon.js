import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

library.add(fas);

const BigIcon = ({ icon, rating, target }) => (
  <Container
    icon={["fas", icon]}
    color={rating < target ? ("neutral") : ("yellow")}
    shade={rating < target ? ("600") : ("400")}
    size={"2x"}
  />
);

const Container = styled(FontAwesomeIcon)`
  color: ${({ theme, color, shade }) =>
    color && shade ? theme[color][shade] : "inherit"};
`;

export default BigIcon;
