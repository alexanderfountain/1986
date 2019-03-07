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
import SectionMarkdown from "../components/organisms/sections/section-markdown"
import SectionEntityList from "../components/organisms/sections/section-entitylist"
import Section from "../components/organisms/sections/section"

export const PageTemplate = ({ title, content }) => {

  

  return (
    <main id="main" className="main">
      {content.map(( section, index ) => (
        <Section
        section={section}
        >
        </Section>
      ))}
    </main>
  );
};




const Page = ({ data }) => {
  const { markdownRemark: post } = data;

 
  return (
    <Layout>
      <PageTemplate
        title={post.frontmatter.title}
        content={post.frontmatter.content}
      />
    </Layout>
  );
};

Page.propTypes = {
  data: PropTypes.object.isRequired
};

export default Page;

export const PageQuery = graphql`
  query Page($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      fields {
        slug
      }
      html
      frontmatter {
        title
        content {
          sectiontitle
          sectionid
          backgroundimage
          backgroundcolor
          textcolor
          sectionvalue {
            type
          }
        }
      }
    }
  }
`;