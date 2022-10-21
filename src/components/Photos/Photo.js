import styled from "styled-components";

const Photo = ({ src, onClick }) => <Image src={src} onClick={onClick} />;

const Image = styled.img`
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  :hover {
    cursor: pointer;
  }
`;

export default Photo;
