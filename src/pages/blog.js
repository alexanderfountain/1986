import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Video from '../videos/meeting.mp4'
import Container from '../components/container'
import * as variable from '../components/variables'
import styled from 'styled-components'

const BlogTeaserContainer = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:space-between;
padding:100px 0px;
border-bottom: thin solid #eee;
`
const BlogTeaserLeft = styled.div`
flex-basis:calc(50% - 20px);
`
const BlogTeaserRight = styled.div`
flex-basis:50%;
flex-basis:calc(50% - 20px);
`
export default class BlogPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
            <div className="content blog-index-header" style={{
              position:'relative',
              borderBottom: '1px solid #eee',
            }}>
            
            <div id="video-viewport">
            <video autoPlay loop>
            <source src={Video} type="video/mp4" />
            </video>
            </div>
            <div className="header-top-video" style={{
              paddinTop:'100px',
              paddingBottom:'100px',
              position:'absolute',
              top:'30%',
              width:'100%',
            }}>
            <Container style={{
              textAlign:'center',
            }}>
            <h1>Blog</h1>

            <p style={{marginBottom:'0px'}}>This is a sample category description, which can be used to boost your SEO rankings.</p>
            <p style={{marginTop:'0px'}}>Make sure you have this enabled from the Edit Category screen in your dashboard.</p>

            </Container>
            </div>
            </div>
          <Container className="container blog-index">

            {posts
              .map(({ node: post }) => (
                <BlogTeaserContainer
                  className="content"
                  key={post.id}
                >
                    <BlogTeaserLeft>
                    <div className="who">
                    <span className="blog-date">{post.frontmatter.date} / </span> 
                    <span className="blog-teaser-author">{post.frontmatter.author}</span>
                    </div>
                    <h2 style={{marginTop:'5px'}}>
                    <Link className="has-text-primary" to={post.fields.slug} style={{borderBottom:'0px'}}>
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
                    <div className="blog-teaser-image" style={{
                      textAlign:'center',
                      }}>
                      <img src={post.frontmatter.image} />
                      </div>
                    </BlogTeaserRight>
                  </BlogTeaserContainer>
              ))}
          </Container>
        </section>
      </Layout>
    )
  }
}

BlogPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
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
`