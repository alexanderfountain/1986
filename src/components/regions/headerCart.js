import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Container from "../container";
import * as variable from "../variables";
import { useCartCount } from "gatsby-theme-shopify-manager";
import CartIcon from "../../images/shopping-cart.svg";
import Countdown from "react-countdown";
import CheckoutLink from "../../components/CheckoutLink";
const renderer = ({ hours, minutes, seconds, completed }) => {
  // Render a countdown
  return (
    <span>
      00:{minutes}:{seconds}
    </span>
  );
};

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
    p {
      margin: 0px;
    }
  }
  ul {
    display: flex;
    margin: 0px;
    padding: 0px;
    li {
      &:nth-child(1) {
        margin-right: 20px;
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
        img {
          width: 20px;
          height: auto;
          margin-right: 5px;
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
    span {
      color: white;
    }
  }
`;

export const HeaderCart = () => {
  const cartCount = useCartCount();
  return (
    <HeaderCartStyle>
      <Container className="header-cart-container">
        <div class="header-cart-inner">
          <div className="count-sale">
            30% off sale ends in&nbsp;
            <Countdown date={Date.now() + 1000000} renderer={renderer} />
          </div>
          <ul>
            <li>
              <Link to="/cart">
                <img src={CartIcon} />
                CART ({cartCount})
              </Link>
            </li>
            {cartCount && <li>{<CheckoutLink />}</li>}
            <li>
              {/* <a
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  redirectToCheckout();
                }}
              >
                {loading ? "LOADING..." : "CHECKOUT"}
              </a> */}
            </li>
          </ul>
        </div>
      </Container>
    </HeaderCartStyle>
  );
};

export default HeaderCart;
