import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Container from '../components/container'
import * as variable from '../components/variables'
import styled from 'styled-components'
import { HTMLContent } from '../components/Content'
import Form from '../components/form'
import * as mixins from '../components/mixins.js'


const Styledbutton = mixins.styledbutton

const Blogfullcontainer = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:space-between;
`

const Blogleft = styled.div`
flex-basis:70%;
padding-right:20px;
`
const Blogright = styled.div`
flex-basis:30%;
padding:40px 0px 0px 20px;
text-align:center;
`

export const BlogPostTemplate = ({
  contentComponent,
  title,
  image,
  content,
  date,
  author,
}) => {
  const PostContent = contentComponent
  return (

    <Layout>
      <section className="section" style={{paddingBottom:'40px'}}>
      <Container>
      <Blogfullcontainer style={{marginTop:'40px'}}>
      <Blogleft>
      <div className="who">
        <span className="blog-date">{date} / </span> 
        <span className="blog-teaser-author">{author}</span>
      </div>
      <h1 style={{marginTop:'5px'}}>{title}</h1>
      <div style={{
        float:'left',
        padding:'0px 20px 20px 0px',
      }}><img src={image} /></div>
      <PostContent content={content} />
      </Blogleft>
      <Blogright>
      <Form>
        <h6>Contact Us</h6>
        <p>Fill out the form below.</p>
      <form name="contact" method="post" netlify-honeypot="bot-field" data-netlify="true">
			<input type="hidden" name="form-name" value="contact" />
			<p hidden> <label htmlFor="bot-field">Don’t fill this out:{' '}<input name="bot-field" /> </label> </p>
								<div class="form-group">
									<input type="text" placeholder="First Name" name="name" id="name" class="form-control" data-required="true" data-interactive="true" />
								</div>
								<div class="form-group">
									<input type="text" name="surname" placeholder="Last Name" id="surname" class="form-control" data-required="true" data-interactive="true" />
								</div>
								<div class="form-group">
									<input type="email" name="email" placeholder="Email" id="email" class="form-control" data-required="true" data-interactive="true" />
								</div>
								<div class="form-group">
									<input type="tel" name="phone" id="phone" placeholder="Phone Number" class="form-control" data-required="false" data-interactive="true" />
								</div>
								<div class="form-group text">
									<textarea name="textarea" id="textarea" placeholder="Message" class="textarea form-control" data-required="true" data-trim="true"/>
								</div>
								<div>
									<Styledbutton type="submit" style={{
                    width:'100%',
                    marginTop:'0px',

                  }}>
                  Contact
                  </Styledbutton>
								</div>
							</form>
          </Form>
      </Blogright>
      </Blogfullcontainer>
      </Container>
      </section>
      </Layout>
  )
}

BlogPostTemplate.propTypes = {
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        frontmatter={post.frontmatter}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        date={post.frontmatter.date}
        author={post.frontmatter.author}
      />
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        image
        author
      }
    }
  }
`
