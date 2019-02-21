import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Helmet from 'react-helmet' 
import { Link } from 'gatsby'
import Typing from 'react-typing-animation'
import Container from '../components/container'
import Form from '../components/form'
import * as mixins from '../components/mixins.js'
import Fade from 'react-reveal/Fade'
import * as variable from '../components/variables'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'




const element = <FontAwesomeIcon icon={faCoffee} />

const Styledlink = mixins.styledlink

const Styledbutton = mixins.styledbutton

const Leftcontact = styled.div`
flex-basis:50%;
border-right: 1px solid ${variable.lightGray};
padding:40px 0px;
padding-right:20px;
@media (max-width: ${variable.mobileWidth}) {
  flex-basis:100%;
}
ul{
  padding:0px;
  margin:0px;
}
li{
  list-style:none;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
li:before{
  font-family: 'Font Awesome 5 Free';
  content:'\f00c';
  font-weight:900;
  color:${variable.brand1};
  font-size:26px;
  margin-right:20px;
}
`
const Rightcontact = styled.div`
flex-basis:50%;
padding:40px 0px;
padding-left:20px;
text-align:center;
@media (max-width: ${variable.mobileWidth}) {
  flex-basis:100%;
}
`

export const HomePageTemplate = ({ intro, contact }) => {
  return (
<main id="main" className="main">
<Helmet>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous" />
    </Helmet>
    
    <section className="hero" style=
    {{ backgroundImage: `url(${intro.introimage})`,
    paddingTop:'150px',
    paddingBottom:'150px',
    backgroundSize:'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    }}
    >
    <Container>
      <Fade bottom>
      <Typing>
      <h3 style={{ 
        margin:'0px',
        color: '#232525',
      }}>
      {intro.heading}</h3>
      <Typing.Delay ms={3000} />
      <Typing.Backspace count={20} />
      <h3 style={{
        margin:'0px',
        color: '#232525',
        }}>
        {intro.heading2}</h3>
      </Typing>
      
      <div style={{
      fontSize:'28px',
      fontWeight:'300',
      }}>
      {intro.subheading}
      </div>
      <Styledlink to={intro.link}>CLICK FOR FREE ACCESS</Styledlink>
      </Fade>
      </Container>
    </section>

    <section id="contact">
    <Container style={{
      padding:'0px 20px',
      display:'flex',
      flexWrap:'wrap',
    }}>
      <Leftcontact>
      <div dangerouslySetInnerHTML={{ __html: contact.contactleft }} />
      </Leftcontact>
      <Rightcontact>
        <Form>
        <h2>Contact</h2>
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
      </Rightcontact>
    </Container>
    </section>
    
  </main>
  )
}

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  introheading: PropTypes.string,
}

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <HomePageTemplate
        intro={post.frontmatter.intro}
        contact={post.frontmatter.contact}
      />
    </Layout>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default HomePage

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      html
      frontmatter {
        intro{
          heading
          heading2
          subheading
          link
          introimage
        }
        contact{
          contactleft
        }
      }
    }
  }
`
