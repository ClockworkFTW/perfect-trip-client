import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { KEYWORDS } from "../../config";

import Icon from "../Icon";
import Flag from "../Flag";
import Rating from "../Rating";
import Keyword from "../Keywords/Keyword";
import Button from "../Button";

const Experience = ({ experience, addExperienceToItinerary }) => {
  const { title, description, rating, images, countryName, countryCode } =
    experience;
  const userCreated = true;
  const navigate = useNavigate();
  const keyword = KEYWORDS[experience.keywords[0]];

  return (
    <Container>
      <Image url={images[0]}>
        <Country>
          <Flag code={countryCode} margin="0 8px 0 0" />
          {countryName}
        </Country>
      </Image>
      <Content>
        <Banner>
          <Name>{title}</Name>
          <Rating rating={rating} />
        </Banner>
        <Description>{description}</Description>
        <Banner>
          <Keyword text={keyword.text} icon={keyword.icon} />
          {userCreated ? (
            <Button onClick={() => navigate(`/experience/${experience.id}`)}>
              View
            </Button>
          ) : null}
        </Banner>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  grid-template-rows: 120px;
  gap: 20px;
  margin-bottom: 20px;
`;

const Image = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
`;

const Country = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 8px;
  left: 8px;
  padding: 6px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: 700;
  font-size: 14px;
  border-radius: 50px;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.neutral["700"]};
`;

const Description = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  font-size: 14px;
  color: ${({ theme }) => theme.neutral["500"]};
`;

export default Experience;
