import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Container from "../container";
import * as variable from "../variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "use-shopping-cart";
import { PopupboxManager } from "react-popupbox";

const CheckoutModalStyle = styled.div`
  .just-added-container {
    display: flex;
    justify-content: space-between;
    .just-added-left {
      width: 25%;
    }
    .just-added-right {
      width: 70%;
    }
    .just-added-top {
      display: flex;
      justify-content: space-between;
      border-bottom: thin solid ${variable.darkGray};
      padding-bottom: 10px;
      a {
        color: ${variable.pink};
        text-decoration: none;
      }
    }
  }
`;

export const CheckoutModal = () => {
  const [loading, setLoading] = useState(false);
  function closePopupbox(e) {
    PopupboxManager.close({
      fadeInSpeed: 10,
    });
  }
  const {
    formattedTotalPrice,
    redirectToCheckout,
    cartCount,
    clearCart,
  } = useShoppingCart();
  return (
    <CheckoutModalStyle>
      <div className="just-added-container">
        <div className="just-added-left"></div>
        <div className="just-added-right">
          <div className="just-added-top">
            <div className="just-added">JUST ADDED</div>
            <Link to="/cart">View Cart</Link>
          </div>
          <div className="checkout-continue">
            <a
              disabled={loading}
              onClick={() => {
                setLoading(true);
                redirectToCheckout();
              }}
            >
              {loading ? "LOADING..." : "CHECKOUT"}
            </a>
            OR
            <div
              className="popclose"
              onClick={(e) => {
                closePopupbox(e);
              }}
            >
              Continue Shopping
            </div>
          </div>
        </div>
      </div>
    </CheckoutModalStyle>
  );
};

export default CheckoutModal;
