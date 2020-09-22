import PropTypes, { nominalTypeHack } from "prop-types";
import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Container from "../container";
import BackgroundImage from "gatsby-background-image";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import Collapse from "@material-ui/core/Collapse";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import * as variable from "../variables";
import MobileMenu from "../mobilemenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { withPreview } from "gatsby-source-prismic-graphql";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: variable.medLightGray,
    padding: "10px 20px",
    fontSize: theme.typography.pxToRem(16),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: 18,
    color: variable.medLightGray,
    textDecoration: "none",
    paddingTop: 10,
    paddingBottom: 10,
    display: "block",
  },
}));

const HeaderStyle = styled.header`
  background-color: rgba(255, 255, 255, 1);
  padding: 8px 20px;
  // position: fixed;
  top: 0px;
  width: 100%;
  margin-top: 39px;
  box-shadow: rgb(204, 204, 204) 0px 1px 2px;
  z-index: 10;
  .header-inner {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    .logo {
      height: auto;
      width: 125px;
    }
    .main-menu {
      flex-basis: calc(60% - 150px);
      display: flex;
      justify-content: flex-end;
      margin: 0px;
      padding: 0px;
      list-style: none;
      display: flex;
      -webkit-box-pack: end;
      justify-content: flex-end;
      @media (max-width: ${variable.tabletWidth}) {
        display: none;
      }
      li {
        list-style: none;
        margin-left: 25px;
        margin-bottom: 0px;
        text-decoration: none;
        a {
          color: ${variable.darkGray};
          font-weight: 400;
          transition: all 0.2s ease 0s;
          text-transform: uppercase;
          font-size: 18px;
          letter-spacing: 0.5px;
          -webkit-font-smoothing: antialiased;
          text-decoration: none;
          border-bottom: 0px;
          &:hover {
            color: rgb(255, 0, 108);
          }
        }
      }
    }
  }
`;
const activeStyle = {
  color: variable.pink,
};

function menuRender(menuitem) {
  if (
    menuitem.items[0].sub_nav_link_label.text != "" &&
    menuitem.items[0].sub_nav_link_label.text != "Dummy"
  ) {
    return (
      <HtmlTooltip
        TransitionComponent={Fade}
        interactive
        classes="tooltip"
        id="the-tooltip"
        title={
          <React.Fragment>
            {menuitem.items.map((submenuitem, index) => (
              <div key={index}>
                {console.log(submenuitem)}
                {submenuitem.sub_nav_link.url && (
                  <Link
                    activeStyle={activeStyle}
                    to={submenuitem.sub_nav_link.url}
                  >
                    {submenuitem.sub_nav_link_label.text}
                  </Link>
                )}
                {submenuitem.relative_link.text && (
                  <Link
                    activeStyle={activeStyle}
                    to={submenuitem.relative_link.text}
                  >
                    {submenuitem.sub_nav_link_label.text}
                  </Link>
                )}
              </div>
            ))}
          </React.Fragment>
        }
      >
        <Link activeStyle={activeStyle} to={menuitem.primary.link.url}>
          {menuitem.primary.label.text}
        </Link>
      </HtmlTooltip>
    );
  } else {
    if (menuitem.primary.link.url != "") {
      return (
        <Link activeStyle={activeStyle} to={menuitem.primary.link.url}>
          {menuitem.primary.label.text}
        </Link>
      );
    }
    if (menuitem.primary.relative_link) {
      return (
        <Link
          activeStyle={activeStyle}
          to={menuitem.primary.relative_link.text}
        >
          {menuitem.primary.label.text}
        </Link>
      );
    }
  }
}

const query2 = graphql`
  query menu {
    allPrismicSiteInformation {
      nodes {
        data {
          nav {
            ... on PrismicSiteInformationNavNavItem {
              id
              items {
                sub_nav_link {
                  url
                  link_type
                }
                sub_nav_link_label {
                  text
                }
                relative_link {
                  text
                }
              }
              primary {
                label {
                  text
                }
                link {
                  url
                  link_type
                }
                relative_link {
                  text
                }
              }
            }
          }
          logo {
            localFile {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
          twitter {
            url
          }
        }
      }
    }
  }
`;

export const Header = () => (
  <StaticQuery
    query={query2}
    render={withPreview((data) => {
      const nav = data.allPrismicSiteInformation.nodes[0].data.nav;
      const logo =
        data.allPrismicSiteInformation.nodes[0].data.logo.localFile
          .childImageSharp.fluid;
      var twitter = null;
      if (data.allPrismicSiteInformation.nodes[0].data.twitter) {
        var twitter = data.allPrismicSiteInformation.nodes[0].data.twitter.url;
      }
      // const classes = useStyles()
      return (
        <HeaderStyle className="header">
          {twitter && (
            <div className="header-social-container">
              <Container>
                <div className="social-container">
                  <a href={twitter} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
              </Container>
            </div>
          )}
          <Container className="header-container">
            <div className="header-inner">
              <Link className="logo" to="/">
                <Img fluid={logo} />
              </Link>
              <div className="mobile-menu-container">{<MobileMenu />}</div>
              <ul className="main-menu">
                {nav.map((menuitem, index) => (
                  <li key={index}>{menuRender(menuitem)}</li>
                ))}
              </ul>
            </div>
          </Container>
        </HeaderStyle>
      );
    }, query2)}
  />
);

export default Header;
