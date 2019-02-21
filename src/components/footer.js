import { Link } from 'gatsby'
import React from 'react'
import Container from './container'
import * as variable from './variables.js'
import styled from 'styled-components'
const Leftfooter = styled.div`
flex-basis:30%;
background-color:${variable.brand1};
padding:40px 0px;
padding-right:20px;
position:relative;
&:before {
  content:'';
  height:100%;
  position: absolute;
  left:-2000px;
  background-color:${variable.brand1};
  width: 2000px;
  top: 0px;
}
@media (max-width: ${variable.tabletWidth}) {
  flex-basis:40%;
}
@media (max-width: ${variable.mobileWidth}) {
  flex-basis:100%;
  &:after {
    content:'';
    height:100%;
    position: absolute;
    right:-2000px;
    background-color:${variable.brand1};
    width: 2000px;
    top: 0px;
  }
}
`
const Rightfooter = styled.div`
flex-basis:70%;
padding:40px 0px;
position:relative;
padding-left:20px;
@media (max-width: ${variable.tabletWidth}) {
  flex-basis:60%;
}
@media (max-width: ${variable.mobileWidth}) {
  flex-basis:100%;
}
`

const Footer = () => (
  <footer style={{
    backgroundColor:variable.darkGray,
    color:'#ffffff',
    }}>
    <Container style={{
      display:'flex',
      flexWrap:'wrap',
    }}>
      <Leftfooter>
      <h4>CONTACT US</h4>
      <p>7860 North Park Place</p>
      <p>San Francisco, CA 94120</p>
      <p>555-555-1234</p>
      </Leftfooter>
      <Rightfooter>
      <h4>ABOUT US</h4>
      <p>Digital Pro is an agency that will help you discover smarter ways to sell profitable digital products.</p>
      </Rightfooter>
    </Container>
  </footer>
)


export default Footer
