import React from "react";
import styled from "styled-components";
import SectionMarkdown from "../sections/section-markdown"
import SectionEntityList from "../sections/section-entitylist"

const SectionType = ({object}) => {
  switch(object.type){
    case 'markdown':
    return <SectionMarkdown
    object={object}
    ></SectionMarkdown>;
    case 'entitylist':
    return <SectionEntityList
    object={object}
    ></SectionEntityList>
  }
  return(
    null
  )
}

export default SectionType