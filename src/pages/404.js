import React from "react";
import Container from "../components/container";
import Layout from "../components/layout";
import pre404 from "../images/404.svg";
import styled from "styled-components";
const Style404 = styled.div`
  padding: 60px 0px;
  text-align: center;
  p {
    margin: 20px 0px 40px 0px;
  }
  h1 {
    margin: 0px;
  }
  img {
    max-width: 600px;
    width: 100%;
  }
`;
const NotFoundPage = () => (
  <Layout>
    <Container>
      <Style404>
        <h1>NOT FOUND</h1>
        <p>1.21 gigawatts! You might need a Delorean to find this page...</p>
        <img src={pre404} />
      </Style404>
    </Container>
  </Layout>
);
export default NotFoundPage;
