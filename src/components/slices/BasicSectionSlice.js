import styled from "styled-components";
import React from "react";
import BackgroundImage from "gatsby-background-image";
import Container from "../container";
import { RichText, Date } from "prismic-reactjs";
import { Link } from "gatsby";
// import YoutubeBackground from "react-youtube-background";
// import { RichText } from "prismic-dom"
import YouTube from "react-youtube";
import ResponsiveEmbed from "react-responsive-embed";
import "../scss/block/defaultBlogCta.scss";
import linkResolver from "../../utils/linkResolver";
import BasicSectionSliceInner from "../slices/BasicSectionSlice";
import LeftRightSlice from "../slices/LeftRightSlice";
import * as variable from "../variables";
import prismicHtmlSerializer from "../../gatsby/htmlSerializer";

// const linkResolver = require("../../utils/linkResolver")
import loadable from "@loadable/component";

// import YoutubeBackground from "react-youtube-background";
const LoadYoutube = ({ video_id, slice }) => {
  console.log(slice);
  if (typeof window !== "undefined") {
    // browser code
    const YoutubeBackground = loadable(() =>
      import(`react-youtube-background`)
    );
    return (
      <div className="youtube-bg">
        <YoutubeBackground videoId={video_id}>
          <Container>
            <section>
              <div class="video-content">
                <RichText
                  render={slice.primary.content.raw}
                  linkResolver={linkResolver}
                  htmlSerializer={prismicHtmlSerializer}
                />
              </div>
            </section>
          </Container>
        </YoutubeBackground>
      </div>
    );
  } else {
    return <h4>uhuh</h4>;
  }
};

const BasicStyle = styled.div`
  .video-container-outer {
    .video-container {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      video {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -100;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .video-content {
        position: relative;
        z-index: 1;
        h2 {
          color: white;
          text-align: center;
        }
      }
    }
  }
  .youtube-video-container {
    position: relative;
    &::after {
      display: block;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: rgba(0, 0, 0, 0.75);
    }
  }
  .sidebar-active {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: ${variable.mobileWidth}) {
      flex-direction: column;
    }
    .section-content {
      width: calc(100% - 390px);
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
      }
    }
    .sidebar {
      width: 350px;
      top: 60px;
      position: -webkit-sticky;
      position: sticky;
      -webkit-align-self: flex-start;
      -ms-flex-item-align: start;
      align-self: flex-start;
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
        margin-top: 40px;
      }
      .section-container {
        width: 100%;
        padding: 0px;
        max-width: 100%;
      }
      .slice-wrapper {
        > div > div {
          border-radius: 10px;
        }
      }
      .basic-slice-container {
        width: 100%;
        max-width: 100%;
        padding: 0px;
        section {
          padding: 35px;
          .section-content {
            width: 100%;
            p {
              a {
                text-decoration: underline;
              }
            }
            ul {
              margin: 0px;
              padding-left: 20px;
              li {
                margin-bottom: 3px;
                &:last-child() {
                  margin-bottom: 0px;
                }
                a {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const myCustomLink = (type, element, content, children, index) => (
  <Link key={element.data.id} to={linkResolver(element.data)}>
    {console.log(children)}
    <a>{content}</a>
  </Link>
);
// Sort and display the different slice options
const PostSlices = ({ slices }) => {
  return slices.map((slice, index) => {
    var sliceID = "";
    if (slice.primary) {
      if (slice.primary.slice_id != undefined) {
        var sliceID = slice.primary.slice_id.text;
      }
    }

    const res = (() => {
      switch (slice.slice_type) {
        case "basic_section":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-basic"
            >
              {<BasicSectionSliceInner slice={slice} />}
            </div>
          );

        case "left_right_section":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-left-right"
            >
              {<LeftRightSlice slice={slice} />}
            </div>
          );

        default:
          return;
      }
    })();
    return res;
  });
};

export const BasicSectionSlice = ({ slice }) => {
  const videoOptions = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
    },
  };
  var font_color = null;
  var fluid = null;
  var bg_color = null;
  var h1_title = false;
  var bg_video = null;
  var video_id = null;
  var bg_video_image = false;
  var sidebar = null;
  var sidebarClass = "";
  if (slice.items != null) {
    if (slice.items[0].sidebar_block_reference.document != null) {
      sidebar = slice.items[0].sidebar_block_reference.document.data.body;
      sidebarClass = "sidebar-active";
    }
  }
  if (slice.primary.background_image.localFile != null) {
    fluid = slice.primary.background_image.localFile.childImageSharp.fluid;
  }
  if (slice.primary.background_video != null) {
    bg_video = slice.primary.background_video.url;
  }
  if (slice.primary.youtube_background.embed_url != null) {
    var video_id = slice.primary.youtube_background.embed_url.split("v=")[1];
    var ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
  }
  if (
    slice.primary.background_video.url == "" &&
    slice.primary.background_image.localFile == null &&
    slice.primary.youtube_background.embed_url == null
  ) {
    bg_video_image = true;
    console.log(bg_video_image);
  }
  if (slice.primary.background_color != null) {
    bg_color = slice.primary.background_color;
  }
  if (slice.primary.font_color != null) {
    font_color = slice.primary.font_color;
  }
  // if (slice.primary.h1_title != null) {
  //   h1_title = slice.primary.h1_title
  // }
  var theh1Title = null;
  var theh2Title = null;
  if (slice.primary.section_title && slice.primary.h1_title == true) {
    var theh1Title = slice.primary.section_title.text;
  } else if (slice.primary.section_title && slice.primary.h1_title == false) {
    var theh2Title = slice.primary.section_title.text;
  }
  // const content = slice.primary.content.raw.map(function(slice, index) {
  //   if (slice.type === "heading1") {
  //     return <h1>{RichText.render(slice)}</h1>
  //   }
  // })
  return (
    <BasicStyle>
      {fluid && (
        <BackgroundImage
          Tag="section"
          fluid={fluid}
          style={{ backgroundColor: bg_color }}
          className={sidebarClass}
        >
          <Container
            className="basic-slice-container"
            style={{ color: font_color }}
          >
            {theh1Title && <h1>{theh1Title}</h1>}
            {theh2Title && <h2>{theh2Title}</h2>}
            <div className="section-content">
              <RichText
                render={slice.primary.content.raw}
                linkResolver={linkResolver}
                htmlSerializer={prismicHtmlSerializer}
                // serializeHyperlink={myCustomLink}
              />
            </div>
            {sidebar && (
              <div class="sidebar">
                <PostSlices slices={sidebar} />
              </div>
            )}
          </Container>
        </BackgroundImage>
      )}
      {bg_video && (
        <div class="video-container-outer">
          <div class="video-container">
            <div
              dangerouslySetInnerHTML={{
                __html: `
    <video
      muted
      loop
      autoplay="autoplay"
      playsinline="true"
      src="${bg_video}"
      type="video/mp4"
    />
  `,
              }}
            />
            <Container>
              <section>
                <div class="video-content">
                  <RichText
                    render={slice.primary.content.raw}
                    linkResolver={linkResolver}
                    htmlSerializer={prismicHtmlSerializer}
                  />
                </div>
              </section>
            </Container>
          </div>
        </div>
      )}
      {video_id && (
        <LoadYoutube video_id={video_id} slice={slice}></LoadYoutube>
      )}
      {bg_video_image && (
        <div style={{ backgroundColor: bg_color }}>
          <Container className="basic-slice-container">
            <section className={sidebarClass}>
              {theh1Title && <h1>{theh1Title}</h1>}
              {theh2Title && <h2>{theh2Title}</h2>}
              {slice.primary.content && (
                <div className="section-content">
                  <RichText
                    render={slice.primary.content.raw}
                    linkResolver={linkResolver}
                    htmlSerializer={prismicHtmlSerializer}
                  />
                </div>
              )}
              {sidebar && (
                <div class="sidebar">
                  <PostSlices slices={sidebar} />
                </div>
              )}
            </section>
          </Container>
        </div>
      )}
    </BasicStyle>
  );
};

export default BasicSectionSlice;
