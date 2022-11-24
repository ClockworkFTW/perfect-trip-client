import styled from "styled-components";

// Components
import Icon from "./Icon";

// Utilities
import { getBase64 } from "../util";

const Image = ({ imageA, addImage, removeImage }) => {
  const onImageSelected = async (e) => {
    // Convert images to base64
    const imageA = await Promise.all(
      Object.entries(e.target.files).map(
        async ([key, image]) => await getBase64(image)
      )
    );
    // Add images to experience
    addImage(imageA);
  };

  return (
    <Container>
      {imageA=="" ? (
      <Button>
        <Input id="image" type="file" onChange={onImageSelected} />
        <Content>
          <Icon icon="plus" />
        </Content>
      </Button>
      ) : (
      <Picture src={imageA} onClick={() => removeImage()}/>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 14px;
  row-gap: 14px;
`;

const Picture = styled.img`
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

export default Image;
