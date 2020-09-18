import React, { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Link } from "gatsby";
import styled from "styled-components";
import Container from "../container";
import * as variable from "../variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const HeaderCartStyle = styled.div`
  padding: 10px 0px;
  background-color: #222222;
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 10;
  .header-cart-inner {
    display: flex;
    justify-content: flex-end;
    width: 100%;
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
        font-size: 14px;
        text-decoration: none;
        text-transform: uppercase;
        cursor: pointer;
        path {
          color: white;
        }
        svg {
          margin-right: 5px;
        }
      }
    }
  }
`;

export const HeaderCart = () => {
  const [loading, setLoading] = useState(false);
  const {
    formattedTotalPrice,
    redirectToCheckout,
    cartCount,
    clearCart,
  } = useShoppingCart();
  return (
    <HeaderCartStyle>
      <Container className="header-cart-container">
        <div class="header-cart-inner">
          <ul>
            <li>
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
                CART ({cartCount})
              </Link>
            </li>
            <li>
              <a
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  redirectToCheckout();
                }}
              >
                {loading ? "LOADING..." : "CHECKOUT"}
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </HeaderCartStyle>
  );
};

export default HeaderCart;
