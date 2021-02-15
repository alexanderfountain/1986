import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";
import Container from "../container";

const GalleryStyle = styled.div`
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;
  // .gatsby-image-wrapper {
  //   width: calc(100% / 3);

  //   img {
  //     width: 100%;
  //     height: auto;
  //   }
  // }

  columns: 4 200px;
  column-gap: 1rem;
  .gatsby-image-wrapper {
    width: 150px;
    background: #ec985a;
    color: white;
    margin: 0 1rem 1rem 0;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-family: system-ui;
    font-weight: 900;
    font-size: 2rem;
  }
  @for $i from 1 through 36 {
    .gatsby-image-wrapper:nth-child(#{$i}) {
      $h: (random(400) + 100) + px;
      height: $h;
      line-height: $h;
    }
  }
`;

export const GallerySlice = ({ slice }) => {
  console.log(slice);

  return (
    <Container>
      <GalleryStyle>
        {slice.items &&
          slice.items.map((item, index) => (
            <Img fluid={item.gallery_image.localFile.childImageSharp.fluid} />
          ))}
      </GalleryStyle>
    </Container>
  );
};

export default GallerySlice;
