import React from "react";
import styled from "styled-components";
import Container from "./container";
import * as variable from "./variables";
import AliceCarousel from "react-alice-carousel";
import Img from "gatsby-image";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
const AliceStyle = styled.div``;

export const AliceSlide = (items, currentIndex) => {
  return (
    <AliceStyle>
      <AliceCarousel
        items={items.items}
        slideToIndex={items.currentIndex}
        // onSlideChanged={this.onSlideChanged}
        buttonsDisabled
        dotsDisabled
      >
        {items.items.map((image, index) => (
          <Img fluid={image.localFile.childImageSharp.fluid} />
        ))}
      </AliceCarousel>
      {/* <Slide
                infinite={false}
                indicators={false}
                arrows={false}
                >
                {items.items.map((image, index) => (
              <Img fluid={image.localFile.childImageSharp.fluid} />
            ))}
                </Slide> */}
    </AliceStyle>
  );
};

export default AliceSlide;
