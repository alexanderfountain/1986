import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import * as variable from './variables.js'
import Mobilemenu from './mobilemenu'
const Nav = styled.nav`
  ul{
    margin:0px;
    padding:0px;
  }
  li{
    margin-left:25px;
    margin-bottom:0px;
    text-decoration:none;
  }
  a {
    text-decoration: none;
    color: ${variable.darkGray};
    font-weight: 600;
    transition: all 0.2s;
    font-family:Poppins, sans-serif;
    text-transform:uppercase;
    font-size:12px;
    letter-spacing: 0.5px;
    -webkit-font-smoothing: antialiased;
    text-decoration:none;
    border-bottom:0px;
    &:hover {
      color: ${variable.brand1};
      text-decoration: line-through;
    }
  }
  @media (max-width: ${variable.tabletWidth}) {
    display:none;
  }
`

const Menu = () => (

  <div>
    <Nav>
    <ul style={{
      listStyle:'none',
      display:'flex',
      justifyContent:'flex-end',
    }}>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/blog">Blog</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
    </Nav>
    <Mobilemenu />
  </div>
    
)


export default Menu
