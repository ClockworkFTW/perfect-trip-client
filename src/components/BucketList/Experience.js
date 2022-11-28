import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Config
import { KEYWORDS } from "../../config";

// Components
import Keyword from "../Keywords/Keyword";

const Experience = ({ experience }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/experience/${experience.id}`);
  };

  const keyword = KEYWORDS[experience.keywords[0]];

  return (
    <Container onClick={onClick}>
      <Content>
        <Header>{experience.title}</Header>
        <Description>{experience.description}</Description>
      </Content>
      <Keyword text={keyword.text} icon={keyword.icon} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.white};
  transition: box-shadow 0.2s ease-in-out;
  :hover {
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadow_lg};
  }
`;

const Content = styled.div`
  margin-bottom: 10px;
`;

const Header = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.neutral["700"]};
`;

const Description = styled.p`
  margin: 6px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.neutral["500"]};
`;

export default Experience;
