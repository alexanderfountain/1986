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

const BlogTeaserContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 50px 0px;
  border-bottom: thin solid #eee;
  @media (max-width: ${variable.mobileWidth}) {
    flex-direction: column-reverse;
  }
`;
const BlogTeaserLeft = styled.div`
  flex-basis: calc(50% - 20px);
  @media (max-width: ${variable.mobileWidth}) {
    flex-basis: calc(100%);
  }
`;
const BlogTeaserRight = styled.div`
  flex-basis: calc(50% - 20px);
  @media (max-width: ${variable.mobileWidth}) {
    flex-basis: calc(100%);
  }
`;


export const HomePageTemplate = ({ intro, contact, blogs }) => {
  console.log(blogs);
  return (
    <main id="main" className="main">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
          crossorigin="anonymous"
        />
        <meta charSet="utf-8" />
        <title>1986.io | Home</title>
        <link rel="canonical" href="https://1986.io" />
      </Helmet>

      <SectionTypedHero
      introfirst={intro.heading}
      introsecond={intro.heading2}
      bgimage={intro.introimage}
      subheading={intro.subheading}
      buttonlink={intro.link}
      buttontext="Let's Chat!"
      >
      </SectionTypedHero>


      <SectionContact leftcontact={contact.contactleft}></SectionContact>
      
      <SectionBlogs>

      </SectionBlogs>
      {/* <section>
        <Container className="container blog-index">
          {blogs.edges.map(({ node: post }) => (
            <BlogTeaserContainer className="content" key={post.id}>
              <BlogTeaserLeft>
                <div className="who">
                  <span className="blog-date">{post.frontmatter.date} / </span>
                  <span className="blog-teaser-author">
                    {post.frontmatter.author}
                  </span>
                </div>
                <h2 style={{ marginTop: "5px" }}>
                  <Link
                    className="has-text-primary"
                    to={post.fields.slug}
                    style={{ borderBottom: "0px" }}
                  >
                    {post.frontmatter.title}
                  </Link>
                </h2>
                <div className="teaser-body">
                  {post.frontmatter.description}
                </div>
                <Link className="btn blog-btn" to={post.fields.slug}>
                  Read Full Article
                </Link>
              </BlogTeaserLeft>
              <BlogTeaserRight>
                <div
                  className="blog-teaser-image"
                  style={{
                    textAlign: "center"
                  }}
                >
                  <img src={post.frontmatter.image} />
                </div>
              </BlogTeaserRight>
            </BlogTeaserContainer>
          ))}
        </Container>
      </section> */}
    </main>
  );
};

// HomePageTemplate.propTypes = {
//   title: PropTypes.string.isRequired,
//   content: PropTypes.string,
//   contentComponent: PropTypes.func,
//   introheading: PropTypes.string,
// }

const HomePage = ({ data }) => {
  const { home: post, blogs: blogpost } = data;

  // console.log('data' + blogpost)
  return (
    <Layout>
      <HomePageTemplate
        intro={post.frontmatter.intro}
        contact={post.frontmatter.contact}
        blogs={blogpost}
      />
    </Layout>
  );
};

HomePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default HomePage;

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    home: markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      html
      frontmatter {
        intro {
          heading
          heading2
          subheading
          link
          introimage
        }
        contact {
          contactleft
        }
      }
    }
    blogs: allMarkdownRemark(
      limit: 3
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            description
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            image
            author
          }
        }
      }
    }
  }
`;
