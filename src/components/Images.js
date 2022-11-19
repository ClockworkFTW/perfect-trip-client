import styled from "styled-components";

// Components
import Icon from "./Icon";

// Utilities
import { getBase64 } from "../util";

const Images = ({ images, addImages, removeImage }) => {
  const onImagesSelected = async (e) => {
    // Convert images to base64
    const images = await Promise.all(
      Object.entries(e.target.files).map(
        async ([key, image]) => await getBase64(image)
      )
    );
    // Add images to experience
    addImages(images);
  };

  return (
    <Container>
      {images.map((image, i) => (
        <Image key={i} src={image} onClick={() => removeImage(image)} />
      ))}
      <Button>
        <Input id="images" type="file" multiple onChange={onImagesSelected} />
        <Content>
          <Icon icon="plus" />
        </Content>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 14px;
  row-gap: 14px;
`;

const Image = styled.img`
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  :hover {
    cursor: pointer;
  }
`;

const Button = styled.label`
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

export default Images;
