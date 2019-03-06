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
import SectionBlogs from "../components/pages/home/section-blogs";

export const PageTemplate = ({ title, content }) => {
  return (
    <main id="main" className="main">
      <h1>{title}</h1>
      {content.map(({ sectionvalue }) => (
        <div className="content">
          {sectionvalue.map(() => (
            <div className="content">
              <h2>test</h2>
            </div>
          ))}
        </div>
      ))}
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
  const { markdownRemark: post } = data;

  console.log(post.frontmatter);
  return (
    <Layout>
      <PageTemplate
        title={post.frontmatter.title}
        content={post.frontmatter.content}
      />
    </Layout>
  );
};

// Page.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default Page;

export const PageQuery = graphql`
  query Page($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      html
      frontmatter {
        title
        content {
          sectionvalue {
            limit
            entitytype
            type
          }
        }
      }
    }
  }
`;
