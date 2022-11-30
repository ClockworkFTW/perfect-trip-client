import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css/autoplay";
import "swiper/css";

// Assets
import googleLogo from "../assets/google_logo.png";

// API
import * as API from "../api";

// Config
import { KEYWORDS } from "../config";

// Components
import Avatar from "../components/Avatar";
import Error from "../components/Error";
import Flag from "../components/Flag";
import Button from "../components/Button";
import Icon from "../components/Icon";
import BigIcon from "../components/BigIcon";
import Label from "../components/Label";
import TextArea from "../components/TextArea";
import ViewMap from "../components/Map/ViewMap";
import Keyword from "../components/Keywords/Keyword";

// Context
import { UserContext } from "../App";

const ExperienceView = () => {
  // User context
  const [user] = useContext(UserContext);

  // Experience ID
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
  };

  const submitReviewClicked = async () => {
    try {
      setLoading(true);
      const data = { experienceId, rating, rev };
      const response = await API.createReview({ data });
      setExperience(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setReviewing(false);
    }
  };

  return error ? (
    <Error error={error} />
  ) : experience ? (
    <Wrapper>
      <Container>
        <MainContent>
          <ViewMap
            latitude={experience.latitude}
            longitude={experience.longitude}
          />
          <div>
            <Banner>
              <Group>
                <Flag code={experience.countryCode} margin="0 6px 0 0" />
                <p>{experience.countryName}</p>
              </Group>
              {experience.creator &&
                experience.creator.userId === user.userId && (
                  <Button
                    onClick={() =>
                      navigate(`/experience/edit/${experience.id}`)
                    }
                  >
                    Edit
                  </Button>
                )}
            </Banner>
            <Title>{experience.title}</Title>
            <Description>{experience.description}</Description>
            <Banner>
              <Keywords>
                {experience.keywords.map((keyword) => (
                  <Keyword
                    text={KEYWORDS[keyword].text}
                    icon={KEYWORDS[keyword].icon}
                  />
                ))}
              </Keywords>
              {experience.creator ? (
                <Group>
                  <Avatar user={experience.creator} />
                  <div>
                    <p>Created by</p>
                    <p>{experience.creator.username}</p>
                  </div>
                </Group>
              ) : (
                <Group>
                  <Avatar user={{ avatar: googleLogo }} />
                  <div>
                    <p>Created by</p>
                    <p>Google</p>
                  </div>
                </Group>
              )}
            </Banner>
          </div>
        </MainContent>
        <ImageGallery
          slidesPerView={4}
          spaceBetween={20}
          modules={[Autoplay]}
          autoplay={true}
        >
          {experience.images.map((image) => (
            <ImageItem>
              <ImageContent src={image} />
            </ImageItem>
          ))}
        </ImageGallery>
        {experience.creator ? (
          !reviewing ? (
            <Button onClick={openReviewClicked} width="100%">
              Add Review
            </Button>
          ) : (
            <Review>
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
                value={rev}
                onChange={setReview}
              />
              <Button onClick={submitReviewClicked} width="100%">
                Submit Review
              </Button>
            </Review>
          )
        ) : null}
        <Reviews>
          {experience.reviews.map((review) => (
            <Review>
              <ReviewHeader>
                <AvatarImage src={review.user.avatar} />
                <div>
                  <ReviewUser> {review.user.username} </ReviewUser>
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      icon="star"
                      color={i + 1 <= review.rating ? "yellow" : "neutral"}
                      shade="500"
                    />
                  ))}
                  <ReviewRating>{review.rating}</ReviewRating>
                </div>
              </ReviewHeader>
              <ReviewText>{review.comment}</ReviewText>
            </Review>
          ))}
        </Reviews>
      </Container>
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  position: relative;
  min-height: 100%;
  background-color: ${({ theme }) => theme.neutral["100"]};
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  column-gap: 20px;
  margin-bottom: 40px;
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.neutral["700"]};
`;

const Description = styled.p`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.neutral["500"]};
`;

const Keywords = styled.div`
  margin-top: 14px;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ImageGallery = styled(Swiper)`
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 40px;
`;

const ImageItem = styled(SwiperSlide)`
  width: 100%;
  height: 300px;
`;

const ImageContent = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const Reviews = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const Review = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  background-color: ${({ theme }) => theme.neutral["200"]};
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
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
  margin-right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 8px;
`;

const ReviewUser = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.neutral["800"]};
`;

const ReviewText = styled.p`
  margin-top: 10px;
  color: ${({ theme }) => theme.neutral["700"]};
`;

const ReviewRating = styled.span`
  margin-left: 6px;
`;

export default ExperienceView;
