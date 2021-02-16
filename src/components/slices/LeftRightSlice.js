import styled from "styled-components";
import React from "react";
import BackgroundImage from "gatsby-background-image";
import Container from "../container";
import { RichText } from "prismic-reactjs";
import * as variable from "../variables";
import linkResolver from "../../utils/linkResolver";
import prismicHtmlSerializer from "../../gatsby/htmlSerializer";

const LeftRightStyle = styled.div`
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
  ._form {
    display: block;
  }
  .left-right-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // max-width: ${variable.desktopWidth};
    // display: block;
    // padding: 0px 20px;
    margin: 0 auto;
    @media (max-width: ${variable.tabletWidth}) {
      max-width: ${variable.tabletWidth};
    }
    @media (max-width: ${variable.mobileWidth}) {
      max-width: ${variable.mobileWidth};
      padding: 0px 15px;
    }
  }
  section {
    width: 50%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    @media (max-width: ${variable.mobileWidth}) {
      min-height:200px;
    }
    &:nth-child(1) {
      justify-content: flex-end;
    }
    &:nth-child(2) {
      justify-content: flex-start;
    }
    @media (max-width: ${variable.mobileWidth}) {
      width: 100%;
    }
    > div {
      max-width: calc(${variable.desktopWidth} / 2);
      display: block;
      padding: 0px 20px;
      margin: 0;
      width: 100%;
      @media (max-width: ${variable.tabletWidth}) {
        max-width: calc(${variable.tabletWidth} / 2);
      }

      @media (max-width: ${variable.mobileWidth}) {
        max-width: calc(${variable.mobileWidth} / 1);
      }
    }
  }
  .section-embed {
    iframe {
      max-width: 100%;
    }
  }
  img {
    max-width: 100%;
    margin: 0 auto;
  }
`;

export const addActive = (id) => {
  if (typeof window !== "undefined") {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://prescriptivesolutions.activehosted.com/f/embed.php?id=" + id;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
};

function returnLeft(primary, leftWidth) {
  var bg_video = null;
  var bg_video_image = false;
  if (
    primary.left_background_video.url == "" &&
    primary.left_background_image.localFile == null
  ) {
    bg_video_image = true;
    console.log(bg_video_image);
  }

  if (primary.left_background_video != null) {
    bg_video = primary.left_background_video.url;
  }
  return (
    <React.Fragment>
      {primary.left_background_image.localFile && (
        <BackgroundImage
          Tag="section"
          fluid={primary.left_background_image.localFile.childImageSharp.fluid}
        >
          <div
          // style={{
          //   width: "calc(" + variable.desktopWidth + " * ." + leftWidth + ")",
          // }}
          >
            {primary.left_content && (
              <div className="section-content">
                <RichText
                  render={primary.left_content.raw}
                  linkResolver={linkResolver}
                  htmlSerializer={prismicHtmlSerializer}
                />
              </div>
            )}
            {primary.embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{ __html: primary.embed.text }}
              />
            )}
          </div>
        </BackgroundImage>
      )}
      {bg_video && (
        <section class="video-container-outer">
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
          </div>
        </section>
      )}

      {bg_video_image && (
        <section>
          <div
          // style={{
          //   width: "calc(" + variable.desktopWidth + " * ." + leftWidth + ")",
          // }}
          >
            {primary.left_content && (
              <div className="section-content">
                <RichText
                  render={primary.left_content.raw}
                  linkResolver={linkResolver}
                  htmlSerializer={prismicHtmlSerializer}
                />
              </div>
            )}
            {primary.embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{ __html: primary.embed.text }}
              />
            )}
            {primary.active_campaign_form_number && (
              <div className={"_form_" + primary.active_campaign_form_number}>
                {addActive(primary.active_campaign_form_number)}
              </div>
            )}
          </div>
        </section>
      )}
    </React.Fragment>
  );
}

function returnRight(primary, rightWidth) {
  return (
    <React.Fragment>
      {primary.right_background_image.localFile && (
        <BackgroundImage
          Tag="section"
          fluid={primary.right_background_image.localFile.childImageSharp.fluid}
        >
          <div
          // style={{
          //   width:
          //     "calc(" + variable.desktopWidth + " * ." + rightWidth + ")",
          // }}
          >
            {primary.right_content && (
              <div className="section-content">
                <RichText
                  linkResolver={linkResolver}
                  render={primary.right_content.raw}
                  htmlSerializer={prismicHtmlSerializer}
                />
              </div>
            )}
            {primary.right_embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{
                  __html: primary.right_embed.text,
                }}
              />
            )}
          </div>
        </BackgroundImage>
      )}
      {!primary.right_background_image.localFile && (
        <section>
          <div
          // style={{
          //   width:
          //     "calc(" + variable.desktopWidth + " * ." + rightWidth + ")",
          // }}
          >
            {primary.right_content && (
              <div className="section-content">
                {primary.right_content_above_form && (
                  <div className="content-above-form">
                    <RichText
                      render={primary.right_content_above_form.raw}
                      linkResolver={linkResolver}
                      htmlSerializer={prismicHtmlSerializer}
                    />
                  </div>
                )}
                {primary.right_active_campaign_form_number && (
                  <div
                    className={
                      "_form_" + primary.right_active_campaign_form_number
                    }
                  >
                    {addActive(primary.right_active_campaign_form_number)}
                  </div>
                )}
                <div className="right-content-lower">
                  <RichText
                    render={primary.right_content.raw}
                    linkResolver={linkResolver}
                    htmlSerializer={prismicHtmlSerializer}
                  />
                </div>
              </div>
            )}
            {primary.right_embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{
                  __html: primary.right_embed.text,
                }}
              />
            )}
          </div>
        </section>
      )}
    </React.Fragment>
  );
}

export const LeftRightSlice = ({ slice }) => {
  var leftWidth = 50;
  var rightWidth = 50;
  if (slice.primary.right_width) {
    var leftWidth = slice.primary.left_width;
  }
  if (slice.primary.right_width) {
    var rightWidth = slice.primary.right_width;
  }
  return (
    <LeftRightStyle>
      <div className="left-right-container">
        {returnLeft(slice.primary, leftWidth)}
        {returnRight(slice.primary, rightWidth)}
      </div>
    </LeftRightStyle>
  );
};

export default LeftRightSlice;
