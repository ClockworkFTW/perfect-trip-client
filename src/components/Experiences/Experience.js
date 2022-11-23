import styled from "styled-components";

import { KEYWORDS } from "../../config";

import Icon from "../Icon";
import Flag from "../Flag";
import Rating from "../Rating";
import Keyword from "../Keywords/Keyword";
import Button from "../Button";

const Experience = ({ experience, addEvent }) => {
  const { title, description, rating, images, country, country_code } =
    experience;

  const keyword = KEYWORDS[experience.keywords[0]];

  return (
    <Container>
      <Image url={images[0]}>
        <Country>
          <Flag code={country_code} margin="0 8px 0 0" />
          {country}
        </Country>
      </Image>
      <Content>
        <Banner>
          <Name>{title}</Name>
          <Button onClick={() => addEvent({ experience })}>
            <Icon icon="plus" />
          </Button>
        </Banner>
        <Description>
          {description ? description : "No description..."}
        </Description>
        <Banner>
          <Keyword text={keyword.text} icon={keyword.icon} />
          <Rating rating={rating} />
        </Banner>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 160px 280px;
  grid-template-rows: 130px;
  gap: 20px;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: white;
  transition: box-shadow 0.2s ease-in-out;
  :hover {
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadow_lg};
  }
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
  margin-right: 10px;
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
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
