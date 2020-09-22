import React from "react";

import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";

import { PopupboxManager } from "react-popupbox";

import styled from "styled-components";

import Img from "gatsby-image";

import CheckoutModal from "./checkoutModal";

const ProductSkuStyle = styled.div`
  display: flex;
  .product-left {
    width: 50%;
  }
  .product-right {
    width: 50%;
  }
  button {
    color: rgb(255, 0, 108);
    cursor: pointer;
    font-family: Poppins, sans-serif;
    font-size: 22px;
    letter-spacing: 0.5px;
    padding: 21px 34px;
    white-space: normal;
    width: auto;
    display: inline-block;
    margin: 20px 0px 0px 0px;
    text-decoration: none;
    font-weight: bold;
    border-radius: 10px;
    border: 4px solid rgb(255, 0, 108);
    text-transform: uppercase;
    background-color:transparent;
    &:hover {
      background-color: rgb(255, 0, 108);
      color: white;
    }
`;

const SkuCard = ({ sku, images }) => {
  const { addItem } = useShoppingCart();
  function addToCart(e, sku, images) {
    addItem(sku);
    const content = (
      <div>
        <div className="popclose-parent">
          <div
            className="popclose"
            onClick={(e) => {
              closePopupbox(e);
            }}
          ></div>
          <CheckoutModal
            sku={sku}
            images={images}
           />
        </div>
      </div>
    );
    PopupboxManager.open({
      content,
      fadeInSpeed: 10,
      config: {},
    });
  }
  function closePopupbox(e) {
    PopupboxManager.close({
      fadeInSpeed: 10,
    });
  }
  console.log(images);
  return (
    <ProductSkuStyle>
      <div className="product-left">
      {images && 
        images.map((image, index) => (
          <Img fluid={image.image.localFile.childImageSharp.fluid} />
        ))
        }
      </div>
      <div className="product-right">
        <h1>{sku.name}</h1>
        <p>
          Price:{" "}
          {formatCurrencyString({
            value: parseInt(sku.price),
            currency: sku.currency,
          })}
        </p>
        <button
          onClick={(e) => {
            addToCart(e, sku, images);
          }}
        >
          ADD TO CART
        </button>
      </div>
    </ProductSkuStyle>
  );
};

export default SkuCard;
