import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Container from "../container";
import * as variable from "../variables";

const FooterStyle = styled.footer`
  padding: 24px 0px;
  background-color: ${variable.darkGray};
  text-align: center;
  color: white;
  div {
    color: white;
    font-weight: bold;
    font-size: 22px;
  }
`;

export const Footer = () => {
  return (
    <FooterStyle>
      <Container className="footer-container">
        &copy; {new Date().getFullYear()} 1986.io
      </Container>
    </FooterStyle>
  );
};

export default Footer;
