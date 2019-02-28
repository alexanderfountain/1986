import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Video from '../videos/meeting.mp4'
import Container from '../components/container'
import * as variable from '../components/variables'
import styled from 'styled-components'
import * as mixins from '../components/mixins.js'
import Form from '../components/form'

const Styledlink = mixins.styledlink

const Styledbutton = mixins.styledbutton

const BlogTeaserContainer = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:space-between;
padding:50px 0px;
border-bottom: thin solid #eee;
@media (max-width: ${variable.mobileWidth}) {
  flex-direction: column-reverse;
}
`
const BlogTeaserLeft = styled.div`
flex-basis:calc(50% - 20px);
@media (max-width: ${variable.mobileWidth}) {
  flex-basis:calc(100%);
}
`
const BlogTeaserRight = styled.div`
flex-basis:calc(50% - 20px);
@media (max-width: ${variable.mobileWidth}) {
  flex-basis:calc(100%);
}
`
export default class ContactPage extends React.Component {
  render() {

    return (
      <Layout>
        <section className="section">
            <Container style={{
              textAlign:'center',
            }}>
            <h1>Contact</h1>

            <Form>
        <h2>Let's Chat</h2>
        <p>Fill out the form below.</p>
      <form name="contact" method="post" netlify-honeypot="bot-field" data-netlify="true">
			<input type="hidden" name="form-name" value="contact" />
			<p hidden> <label htmlFor="bot-field">Don’t fill this out:{' '}<input name="bot-field" /> </label> </p>
								<div class="form-group">
									<input type="text" placeholder="Name" name="name" id="name" class="form-control" data-required="true" data-interactive="true" />
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
            </Container>

        </section>
      </Layout>
    )
  }
}