import React from "react";
import styled from "styled-components";
import Container from "../../layout/container";
import SectionType from "../sections/section-type"

const SectionHeroStyle = styled.section`
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


const Section = ({section}) => {
  return(
    <SectionHeroStyle id={section.sectionid} style={{backgroundImage: `url(${section.backgroundimage})`,}}>
      <h2>{section.sectiontitle}</h2>
      {section.sectionvalue.map(( sectionvalue, index ) => (

        <SectionType 
          key={index}
          object={sectionvalue}
          >
        </SectionType>

      ))}
    </SectionHeroStyle>
  )
}


export default Section