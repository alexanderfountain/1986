import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Container from "../container";
import * as variable from "../variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import { PopupboxManager } from "react-popupbox";
import Img from "gatsby-image";

const CheckoutModalStyle = styled.div`
  .just-added-container {
    display: flex;
    justify-content: space-between;
    .just-added-left {
      width: 25%;
    }
    .just-added-right {
      width: 70%;
      svg {
        font-size: 28px;
        margin-right: 5px;
      }
      path {
        color: ${variable.blue};
      }
      .checkout-continue {
        display: flex;
        margin-top: 20px;
        a {
          color: ${variable.pink};
        }
        .modal-or {
          margin: 0px 10px;
        }
      }
    }
    .just-added {
      display: flex;
      align-items: center;
    }
    .just-added-top {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #cec6bf;
      padding-bottom: 20px;
      a {
        color: ${variable.pink};
        text-decoration: none;
        display: flex;
        align-items: center;
      }
      .just-added-title {
        font-size: 22px;
        margin-right: 20px;
      }
    }
  }
  .checkout-modal-cart-info {
    margin-top: 20px;
    font-weight: bold;
  }
  .checkout-continue {
    display: flex;
    align-items: center;
  }
  .modal-continue-shopping {
    color: ${variable.pink};
    cursor: pointer;
  }
  .modal-or {
    margin: 0px 10px;
  }
  .checkout-modal-quan-price {
    font-weight: normal;
    margin-top: 5px;
    font-size: 15px;
  }
`;

export const CheckoutModal = (sku, quantity) => {
  console.log(sku);
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
        <div className="just-added-left">
          <Img fluid={sku.images[0].image.localFile.childImageSharp.fluid} />
        </div>
        <div className="just-added-right">
          <div className="just-added-top">
            <div className="just-added">
              <FontAwesomeIcon icon={faCheck} />
              <div className="just-added-title">JUST ADDED:</div>{" "}
            </div>
            <Link to="/cart">View Cart</Link>
          </div>
          <div className="checkout-modal-cart-info">
            <div className="checkout-modal-name">{sku.sku.name}</div>
            <div className="checkout-modal-quan-price">
              {" "}
              {sku.quantity} x{" "}
              {formatCurrencyString({
                value: parseInt(sku.sku.price),
                currency: sku.sku.currency,
              })}
            </div>
          </div>
          <div className="checkout-continue">
            <a
              disabled={loading}
              className="the-button"
              onClick={() => {
                setLoading(true);
                redirectToCheckout();
              }}
            >
              {loading ? "LOADING..." : "CHECKOUT"}
            </a>
            <div className="modal-or">or</div>
            <div
              className="modal-continue-shopping"
              onClick={(e) => {
                closePopupbox(e);
              }}
            >
              Continue Shopping >
            </div>
          </div>
        </div>
      </div>
    </CheckoutModalStyle>
  );
};

export default CheckoutModal;
