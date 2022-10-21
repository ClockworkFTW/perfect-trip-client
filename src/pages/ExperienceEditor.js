import { useState } from "react";
import styled from "styled-components";

import Map from "../components/Map";
import SearchPlaces from "../components/Map/Search";
import MarkerLocation from "../components/Map/MarkerLocation";

import Icon from "../components/Icon";
import Label from "../components/Label";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/Button";

import Keywords from "../components/Keywords";
import Photos from "../components/Photos";

const ExperienceEditor = () => {
  const [coords, setCoords] = useState({ lat: 37.7749, lng: -122.4194 });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [photos, setPhotos] = useState([]);

  const onSaveClicked = () => {
    alert(`
    experience: {
      coords: ${coords.lat},${coords.lng}
      name: ${name}
      description: ${description}
      keywords: ${keywords.reduce(
        (str, keyword, i) => str + (i === 0 ? `${keyword}` : `, ${keyword}`),
        ""
      )}
      photos: ${photos.length}
    }
    `);
  };

  return (
    <Container>
      <Sidebar>
        <Field>
          <Label id="name" text="Name">
            {name === "" ? (
              <Icon icon="circle" color="neutral" shade="300" />
            ) : (
              <Icon icon="circle-check" color="green" shade="500" />
            )}
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={setName}
          />
        </Field>
        <Field>
          <Label id="description" text="Description">
            {description === "" ? (
              <Icon icon="circle" color="neutral" shade="300" />
            ) : (
              <Icon icon="circle-check" color="green" shade="500" />
            )}
          </Label>
          <TextArea
            id="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={setDescription}
          />
        </Field>
        <Field>
          <Label id="keywords" text="Keywords">
            {keywords.length === 0 ? (
              <Icon icon="circle" color="neutral" shade="300" />
            ) : (
              <Icon icon="circle-check" color="green" shade="500" />
            )}
          </Label>
          <Keywords activeKeywords={keywords} setActiveKeywords={setKeywords} />
        </Field>
        <Field>
          <Label id="photos" text="Photos">
            {photos.length === 0 ? (
              <Icon icon="circle" color="neutral" shade="300" />
            ) : (
              <Icon icon="circle-check" color="green" shade="500" />
            )}
          </Label>
          <Photos photos={photos} setPhotos={setPhotos} />
        </Field>
        <Button width="100%" onClick={onSaveClicked}>
          Save
        </Button>
      </Sidebar>
      <Main>
        <Map coords={coords} setCoords={setCoords} />
        <SearchPlaces setCoords={setCoords} />
        <MarkerLocation coords={coords} />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 600px 1fr;
`;

const Sidebar = styled.div`
  padding: 30px;
  background-color: ${({ theme }) => theme.neutral["100"]};
`;

const Main = styled.div`
  position: relative;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

export default ExperienceEditor;
