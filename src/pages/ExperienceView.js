import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ExperienceMap from "../components/Map/ExperienceMap";
import Rating from "../components/Rating";

import Icon from "../components/Icon";
import Label from "../components/Label";

// API
import * as API from "../api";
import { map } from "lodash";

const ExperienceView = () => {
  const { experienceId } = useParams();

  // Router hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Experience state
  const [experience, setExperience] = useState(null);

  // API loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //map

  // Initialize experience
  useEffect(() => {
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

    if (location.state?.experience) {
      setExperience(location.state.experience);
    } else {
      initExperience(experienceId);
    }
  }, [experienceId]);

  return experience ? (
    <DivWrap>
      <ExpInfo>
        <MapStyle>
          <ExperienceMap
            latitude={experience.latitude}
            longitude={experience.longitude}
            setCoordinates={() => {
              map.longitude = experience.longitude;
              map.latitude = experience.latitude;
            }}
          />
        </MapStyle>
        <div>
          <i>{experience.country}</i>
          <h1>{experience.title}</h1>
          <p>{experience.description}</p>
          <Keywords>
            {experience.keywords.map((keyword) => (
              <Keyword>
                <p>{keyword}</p>
              </Keyword>
            ))}
          </Keywords>
        </div>
        <Rating rating={4}></Rating>
      </ExpInfo>

      <Field>
        <Label id="photo-carousel" text="Photos">
          <Icon icon="camera" color="neutral" shade="500" />
        </Label>
      </Field>
      <div>
        <Images>
          {experience.images.map((imageurl) => (
            <Image>
              <img src={imageurl} />
            </Image>
          ))}
        </Images>
      </div>

      <Field>
        <Label id="reviews" text="Reviews">
          <Icon icon="star" color="neutral" shade="500" />
        </Label>
      </Field>
      <div>
        <Reviews>
          {experience.reviews.map((review) => (
            <Review>
              {review.user.username}
              <Rating rating={review.rating}></Rating>
              <div>
                <p>{review.comment}</p>
              </div>
            </Review>
          ))}
        </Reviews>
      </div>
    </DivWrap>
  ) : null;
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const DivWrap = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5%;
  margin-left: 33%;
`;

const ExpInfo = styled.div`
  display: flex;
  margin-bottom: 15px;
`;
const MapStyle = styled.div`
  width: 25%;
  height: 15rem;
  margin-right: 10px;
`;

const Keywords = styled.div`
  display: inline-flex;
  padding: 10px;
`;

const Keyword = styled.div`
  border: 4px solid lightgray;
  background: lightgray;
  border-radius: 4px;
  padding: 0.25rem;
  margin-right: 10px;
`;

const Images = styled.div`
  display: inline-flex;
`;

const Image = styled.div`
  border: 4px solid lightgray;
  background: lightgray;
  border-radius: 4px;
  padding: 0.25rem;
  margin-right: 10px;
  height: fit-content;
`;

const Reviews = styled.div`
  display: inline-flex;
`;

const Review = styled.div`
  // display: flex;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Field = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;

export default ExperienceView;
