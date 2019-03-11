import React from "react";
import styled from "styled-components";
import Container from "../../layout/container";
import { StaticQuery, graphql } from 'gatsby'

const SectionEntityListStyle = styled.section`

`;



export const SectionEntityList = ({object}) => (
  <StaticQuery
    query={graphql`
      query EntityQyery {
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
    `}
  render={data => (
    <>

    <h3>hsdfhsd</h3>

</>
    )}
  />

)

export default SectionEntityList