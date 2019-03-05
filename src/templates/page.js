import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import Container from "../components/layout/container";
import * as variable from "../components/variables";
import styled from "styled-components";
import SectionContact from "../components/pages/home/section-contact";
import SectionTypedHero from "../components/organisms/sections/section-typed-hero";
import SectionBlogs from "../components/pages/home/section-blogs"


export const PageTemplate = ({  }) => {
  return (
    <main id="main" className="main">
 
      <h1>test</h1>
    </main>
  );
};

// HomePageTemplate.propTypes = {
//   title: PropTypes.string.isRequired,
//   content: PropTypes.string,
//   contentComponent: PropTypes.func,
//   introheading: PropTypes.string,
// }

const Page = ({ data }) => {

  // console.log('data' + blogpost)
  return (
    <Layout>
      <PageTemplate

      />
    </Layout>
  );
};

Page.propTypes = {
  data: PropTypes.object.isRequired
};

export default Page;
