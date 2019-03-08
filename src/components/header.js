import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Container from '../components/layout/container'
import Menu from './menu'
import styled from "styled-components"
import Logo from '../images/logo_no_comp.png'

const HeaderStyle = styled.header`
  background-color:rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  position: fixed;
  top: 0px;
  width: 100%;
  zIndex: 999;
  box-shadow: 0px 1px 2px #ccc;
  .header-menu{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo{
    flex-basis:150px;
  }
`;

const Header = ({ siteTitle }) => (
  <HeaderStyle>
      <Container>

      <div className="header-menu">
      <Link className="logo"to="/" style={{borderBottom:'none',}}><img src={Logo} alt="1986 logo" style={{
        width:'100%',
        height:'auto',
        display:'flex',
        alignItems:'center',
      }} /></Link>
      <div style={{
        flexBasis:'calc(60% - 200px)',
        display:'flex',
        justifyContent:'flex-end',
      }}>
      <Menu>
      </Menu>
      </div>
      </div>
      </Container>
  </HeaderStyle>
    
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
