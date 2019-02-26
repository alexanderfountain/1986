import styled from 'styled-components'
import * as variable from './variables.js'
import { Link } from 'gatsby'
export const styledlink = styled(Link)`
    border: none;
    color: ${variable.brand1};
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    letter-spacing: 0.5px;
    padding: 21px 34px;
    text-transform: uppercase;
    white-space: normal;
    width: auto;
    display:inline-block;
    margin:40px 0px;
    text-decoration:none;
    font-weight:bold;
    border-radius: 10px;
    border: 4px solid ${variable.brand1};
  &:hover {
    color: white;
    background-color:${variable.brand1};
    text-decoration:line-through;
  }
`
export const styledbutton = styled('button')`
    border: none;
    color: ${variable.brand1};
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.5px;
    padding: 21px 34px;
    text-transform: uppercase;
    white-space: normal;
    width: auto;
    display:inline-block;
    margin:40px 0px;
    text-decoration:none;
    font-weight:bold;
    border-radius: 10px;
    border: 4px solid ${variable.brand1};
    text-transform:uppercase;
  &:hover {
    background-color:${variable.brand1};
    color:white;
    text-decoration:line-through;
  }
`