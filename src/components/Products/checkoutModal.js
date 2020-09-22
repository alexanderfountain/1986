import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Container from "../container";
import * as variable from "../variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "use-shopping-cart";
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
      svg{
        font-size: 28px;
        margin-right:5px;
      }
      path{
        color:${variable.blue};
      }
      .checkout-continue{
        display:flex;
        margin-top:20px;
        a{
          color:${variable.pink};
        }
        .modal-or{
          margin:0px 10px;
        }
      }
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

export const CheckoutModal = (sku) => {
  console.log(sku)
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
        {console.log(sku.images)}
        </div>
        <div className="just-added-right">
          <div className="just-added-top">
            <div className="just-added">
            <FontAwesomeIcon icon={faCheck} />
            JUST ADDED: {sku.sku.name}</div>
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
            <div className="modal-or">OR</div>
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
