import React from "react";
import styled from "styled-components";
import Typing from "react-typing-animation";
import Container from "../../layout/container";
import Fade from "react-reveal/Fade";
import Styledlink from "../../atoms/link"

const SectionEntityListStyle = styled.section`
  padding-top: 150px;
  padding-bottom: 50px;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 400px;
  h3{
    margin: 0px;
    color: #232525;
  }
  .subheading{
    font-size: 28px;
    font-weight: 300;
  }
`;



const SectionEntityList = ({object}) => (

    
<SectionEntityListStyle>
<Container>
<h2>The entitylist yo</h2>
</Container>
{ console.log('object', object)}
</SectionEntityListStyle>
)

export default SectionEntityList