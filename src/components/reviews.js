import React from "react";
import star from "../images/star.svg";
import styled from "styled-components";
import { Link } from "gatsby";
import * as variable from "../components/variables";

const ReviewsStyle = styled.div`
  .reviews-outer {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  .stars {
    margin-right: 5px;
    img {
      width: 20px;
      height: 20px;
    }
  }

  .reviews-container {
    margin-top: 40px;
    margin-bottom: 40px;
    border: thin solid ${variable.lightGray};
    padding: 20px;
    h2 {
      width: 100%;
      padding: 20px;
      text-align: center;
      border-top: thin solid ${variable.gray};
      border-bottom: thin solid ${variable.gray};
    }
  }
  .based-onn-reviews {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: thin solid ${variable.lightGray};
    padding: 20px 0px;
  }
  .star-based {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    @media (max-width: ${variable.mobileWidth}) {
      flex-direction: column;
      align-items: flex-start;
    }
    .based-on {
      margin-left: 5px;
      @media (max-width: ${variable.mobileWidth}) {
        margin-left: 0px;
      }
    }
  }
  .review-inner {
    padding: 20px 0px;
    border-bottom: thin solid ${variable.lightGray};
    &:last-child {
      border: 0px;
    }
    .review-name {
      font-size: 24px;
      font-weight: bold;
      margin: 5px 0px 0px 0px;
    }
    .review-date {
      font-style: italic;
    }
    .review-review {
      margin-top: 10px;
    }
  }
`;

const Reviews = ({ reviews }) => {
  console.log(reviews);
  return (
    <ReviewsStyle>
      <div className="reviews-container">
        <h2>CUSTOMER REVIEWS</h2>
        <div className="based-onn-reviews">
          <div className="star-based">
            <div className="stars">
              <img src={star} />
              <img src={star} />
              <img src={star} />
              <img src={star} />
              <img src={star} />
            </div>
            <div className="based-on">Based on {reviews.length} reviews</div>
          </div>
          <div className="write-review">
            <Link to="#">Write a review</Link>
          </div>
        </div>
        <div className="review-ind">
          {reviews.map((review) => (
            <div className="review-inner">
              <div className="review-inner-left">
                <div className="review-stars">
                  <div className="stars">
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                  </div>
                </div>
                <div className="review-name">{review.data.name[0].text}</div>
                <div className="review-date">
                  {review.first_publication_date}
                </div>
                <div className="review-review">
                  {review.data.review[0].text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ReviewsStyle>
  );
};

export default Reviews;
