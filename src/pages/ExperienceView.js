import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ExperienceMap from "../components/Map/ExperienceMap";
import Rating from "../components/Rating";

import * as API from "../api"

import { KEYWORDS } from "../config";

import Button from "../components/Button";
import Icon from "../components/Icon";
import BigIcon from "../components/BigIcon";
import Label from "../components/Label";
import TextArea from "../components/TextArea";

import { map } from "lodash";

const ExperienceView = () => {
  const { experienceId } = useParams();

  // Router hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Experience state
  const [experience, setExperience] = useState(null);
  const [reviewing, setReviewing] = useState(false);
  const [rev, setReview] = useState("");
  const [rating, setRating] = useState(0);

  // API loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //map

  const initExperience = async () => {
    try {
      setLoading(true);
      const result = await API.getExperience({ experienceId });
      setExperience(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize experience
  useEffect(() => {
    if (location.state?.experience) {
      setExperience(location.state.experience);
    } else {
      initExperience(experienceId);
    }
  }, [experienceId]);

  const openReviewClicked = () => {
    setReviewing(true);
  }

  const submitReviewClicked = async () => {
    try {
      setLoading(true);
      const data = {experienceId, rating, rev};
      const response = await API.createReview({data});
      setExperience(response);
      } catch (error) {
        setError(error);
    } finally {
      setLoading(false);
    }
  }


  return experience ? (
    <Wrapper>
      <DivWrap>
        <ExpInfo>
          <MapStyle>
            <ExperienceMap
              latitude={experience.latitude}
              longitude={experience.longitude}
              setCoordinates={() => {map.longitude = experience.longitude; map.latitude=experience.latitude}}
            />
          </MapStyle>
          <div>
            <i>{experience.country}</i>
            <h1 style={{paddingRight:"15px", paddingLeft:"13px"}}>{experience.title}</h1>
            <p style={{paddingRight:"15px", paddingLeft:"15px"}}>{experience.description}</p>
            <SideDiv>
              <Keywords>
                {experience.keywords.map((keyword) =>(
                  <Keyword>
                    <Icon
                      icon={KEYWORDS[keyword].icon}
                      color={"neutral"}
                      shade={"500"}
                    />
                    <Text>{KEYWORDS[keyword].text}</Text>
                  </Keyword>
                ))}
              </Keywords>
              <RevContainer>
                <Icon icon="star" color="yellow" shade="400" />
                <Text> {experience.rating} </Text>
              </RevContainer>
            </SideDiv>
          </div>
        </ExpInfo>

        <Field>
          <Label id="photo-carousel" text="Photos">
            <Icon icon="camera" color="neutral" shade="500" />
          </Label>
        </Field>

        <ExpInfo>
          <Images>
          {experience.images.map((imageurl) =>(
            <Image src={imageurl}/>
            ))}
        </Images>
      </ExpInfo>


      <Field>
        <Label id="reviews" text="Reviews">
          <Icon icon="star" color="neutral" shade="500" />
        </Label>
      </Field>
      <ExpInfo>
        <ReviewBox>
          <Reviews>
            {experience.reviews.map((review) => (
              <Review>
                <ReviewHeader>
                  <AvatarImage src={review.user.avatar}/>
                    <div>
                      <ReviewUser> {review.user.username} </ReviewUser>
                      <Rating rating={review.rating}></Rating>
                    </div>
                </ReviewHeader>
                <Field>
                  <Label id="review" text="Review">
                    <Icon icon="pen" color="neutral" shade="500" />
                  </Label>
                </Field>
                <ReviewText>
                  {review.comment}
                </ReviewText>
              </Review>
            ))}
          </Reviews>
          {!reviewing ? (
          <Button onClick={openReviewClicked} width="100%">
            Add Review
          </Button>
          ) : (
          <Review>
          <Field>
            <Label id="rating" text="Rating">
              <Icon icon="star" color="neutral" shade="500" />
            </Label>
            <ReviewDiv>
              <StarButton onClick={() => setRating(1)}>
                <BigIcon icon="star" rating={rating} target={1} />
              </StarButton>
              <StarButton onClick={() => setRating(2)}>
                <BigIcon icon="star" rating={rating} target={2} />
              </StarButton>
              <StarButton onClick={() => setRating(3)}>
                <BigIcon icon="star" rating={rating} target={3} />
              </StarButton>
              <StarButton onClick={() => setRating(4)}>
                <BigIcon icon="star" rating={rating} target={4} />
              </StarButton>
              <StarButton onClick={() => setRating(5)}>
                <BigIcon icon="star" rating={rating} target={5} />
              </StarButton>
            </ReviewDiv>
            <Label id="review" text="Review">
              <Icon icon="pen" color="neutral" shade="500" />
            </Label>
            <TextArea
              id="review"
              type="text"
              type="review"
              value={rev}
              onChange={setReview}
            />
            <Button onClick={submitReviewClicked} width="100%">
              Submit Review
            </Button>
          </Field>
          </Review>
          )}
        </ReviewBox>
      </ExpInfo>
      </DivWrap>
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.neutral["100"]};
`;

const DivWrap = styled.div`
  width: 60%;
  height: 100%;
  padding-top: 2%;
  margin-left: 20%

`;

const ExpInfo = styled.div`
  display: flex;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
`;
const MapStyle = styled.div`
  width: 40%;
  height: 15rem;
  margin-right: 10px;
`;

const Keywords = styled.div`
  display: inline-flex;
  padding: 10px;
`;

const Keyword = styled.div`
padding: 6px 12px;
border-radius: 8px;
font-weight: 700;
font-size: 14px;
color: ${({ theme, color }) => theme.neutral["700"]};
background-color: ${({ theme, color }) => theme.neutral["200"]};
`;

const Images = styled.div`
  display: inline-flex;;
`;

const Image = styled.img`
  border: 4px solid lightgray;
  background: lightgray;
  border-radius: 4px;
  padding: 0.25rem;
  margin-right: 10px;
  max-height: 340px;
`;

const SideDiv = styled.div`
  display: inline-flex;
`;

const ReviewBox = styled.div`
  width: 100%
`;

const Reviews = styled.div`
  display: inline-flex;
  width: 100%;
`;

const Review = styled.div`
  padding: 6px 12px;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 4px;
  background-color: ${({ theme, color }) => theme.neutral["200"]};
`;

const ReviewHeader = styled.div`
  display: inline-flex;
  width: 100%;
  padding-bottom: 15px;
`;

const RevContainer = styled.div`
  padding: 4px;
  padding-top: 12px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Text = styled.span`
  margin-left: 6px;
`;

const Field = styled.div`
  width: 100%;
`;

const ReviewDiv = styled.div`
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 8px;
`;

const StarButton = styled.button`
  margin: 0px;
  padding: 0px;
  border: 0px;
  background: inherit;
`;

const AvatarImage = styled.img`
  display: inline-block;
  margin-bottom: -15px;
  margin-top: 5px;
  margin-right: 10px;
  padding: 0;
  aspect-ratio: 1 / 1;
  width: 60px;
  height: 60px;
  border-radius: 8px;
`;

const ReviewUser = styled.p`
  font-size: 20pt;
  font-weight: bold;
  margin-bottom: -3px;
  margin-top: -1px;
`;

const ReviewText = styled.p`
  font-size 14pt;
  padding-left: 10px;
  padding-bottom: 10px;
  margin-top: -3px;
`;

export default ExperienceView;
