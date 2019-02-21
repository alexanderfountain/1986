import styled from 'styled-components'
import * as variable from './variables.js'
import { Link } from 'gatsby'
export const styledlink = styled(Link)`
    border: none;
    color: #fff;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.5px;
    padding: 20px 30px;
    text-transform: uppercase;
    white-space: normal;
    width: auto;
    border-radius: 50px;
    display:inline-block;
    margin:40px 0px;
    text-decoration:none;
    background-color: ${variable.brand1};
  &:hover {
    color: ${variable.brand1};
    background-color:#ffffff;
  }
`
export const styledbutton = styled('button')`
    border: none;
    color: #fff;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.5px;
    padding: 20px 30px;
    text-transform: uppercase;
    white-space: normal;
    width: auto;
    border-radius: 50px;
    display:inline-block;
    margin:40px 0px;
    text-decoration:none;
    font-weight:bold;
    background-color: ${variable.brand1};
  &:hover {
    background-color:${variable.darkGray};
  }
`