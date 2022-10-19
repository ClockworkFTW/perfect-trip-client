import styled from "styled-components";

import topography from "../assets/topography.png";

const Topography = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url(${topography});
  opacity: 50%;
`;

export default Topography;
