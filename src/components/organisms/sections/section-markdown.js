import React from "react";
import styled from "styled-components";
import Container from "../../layout/container";

const SectionMarkdownStyle = styled.section`

`;



const SectionMarkdown = ({object}) => (

<SectionMarkdownStyle>
{ console.log('object', object.markdown)}
<Container>
  <div dangerouslySetInnerHTML={{ __html: object.markdown }} />
  NOT WORKING DANGEROUSLY
</Container>
</SectionMarkdownStyle>
)

export default SectionMarkdown