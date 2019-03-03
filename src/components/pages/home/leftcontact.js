import * as variable from "../../../components/variables";
import styled from "styled-components";
import React from "react";
const Leftcontactstyle = styled.div`
  flex-basis: 50%;
  border-right: 1px solid ${variable.lightGray};
  padding: 40px 0px;
  padding-right: 20px;
  @media (max-width: ${variable.mobileWidth}) {
    flex-basis: 100%;
    padding: 0px;
    border: 0px;
  }
  ul {
    padding: 0px;
    margin: 0px;
  }
  li {
    list-style: none;
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  li:before {
    font-family: "Font Awesome 5 Free";
    content: "\f00c";
    font-weight: 900;
    color: ${variable.brand1};
    font-size: 26px;
    margin-right: 20px;
  }
`;


const Leftcontact = ({leftcontactcopy}) => (
    <Leftcontactstyle dangerouslySetInnerHTML={{ __html: leftcontactcopy }}>
    </Leftcontactstyle>
  )
  
  export default Leftcontact
  