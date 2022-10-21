import { memo } from "react";
import styled from "styled-components";

import Button from "./Button";
import Photo from "./Photo";

const Photos = memo(({ photos, setPhotos }) => {
  const changeHandler = (e) => {
    setPhotos([...photos, ...e.target.files]);
  };

  const onPhotoClicked = (photoName) => {
    setPhotos(photos.filter((photo) => photo.name !== photoName));
  };

  return (
    <Container>
      {photos.map((photo, i) => (
        <Photo
          key={i}
          src={URL.createObjectURL(photo)}
          onClick={() => onPhotoClicked(photo.name)}
        />
      ))}
      <Button onChange={changeHandler} />
    </Container>
  );
});

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 14px;
  row-gap: 14px;
`;

export default Photos;
