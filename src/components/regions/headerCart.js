import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Container from "../container";
import * as variable from "../variables";
import { useCartCount } from "gatsby-theme-shopify-manager";
import CartIcon from "../../images/shopping-cart.svg";
import Countdown from "react-countdown";
import CheckoutLink from "../../components/CheckoutLink";

const HeaderCartStyle = styled.div`
  padding: 10px 0px;
  background-color: #222222;
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 10;
  .header-cart-inner {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    p {
      margin: 0px;
    }
  }
  ul {
    display: flex;
    margin: 0px;
    padding: 0px;
    align-items: center;
    justify-content: flex-end;
    li {
      &:nth-child(2) {
        margin-left: 20px;
      }
      list-style: none;
      a {
        color: white;
        font-size: 16px;
        text-decoration: none;
        text-transform: uppercase;
        cursor: pointer;
        display: flex;
        align-items: center;
        @media (max-width: ${variable.mobileWidth}) {
          font-size: 12px;
        }
        img {
          width: 20px;
          height: auto;
          margin-right: 5px;
          @media (max-width: ${variable.mobileWidth}) {
            width: 15px;
            margin-right: 3px;
          }
        }
        path {
          color: white;
        }
        svg {
          margin-right: 5px;
        }
      }
    }
  }
  .count-sale {
    color: white;
    text-align: center;
    font-size: 16px;
    @media (max-width: ${variable.mobileWidth}) {
      font-size: 12px;
    }
    span {
      color: white;
    }
  }
`;

export const HeaderCart = ({ saleDate }) => {
  const cartCount = useCartCount();
  var emptyCart = false;
  if (cartCount != null && cartCount != 0) {
    emptyCart = true;
  }
  console.log(saleDate);
  return (
    <HeaderCartStyle>
      <Container className="header-cart-container">
        <div class="header-cart-inner">
          <div className="count-sale">
            30% off sale ends in&nbsp;
            <Countdown date={saleDate} daysInHours={true} />
          </div>
          <ul>
            <li>
              <Link to="/cart">
                <img src={CartIcon} />
                CART ({cartCount})
              </Link>
            </li>
            {emptyCart && <li>{<CheckoutLink />}</li>}
          </ul>
        </div>
      </Container>
    </HeaderCartStyle>
  );
};

export default HeaderCart;
