import React, { useState } from "react";

import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";

import { PopupboxManager } from "react-popupbox";

import styled from "styled-components";

import Img from "gatsby-image";

import CheckoutModal from "./checkoutModal";

import Select from "react-select";

const optionsQuantity = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];

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
  const [selectedOption, setSelectedOption] = useState(optionsQuantity[0]);
  const { addItem } = useShoppingCart();
  function addToCart(e, sku, images, quantity) {
    addItem(sku, quantity);
    const content = (
      <div>
        <div className="popclose-parent">
          <div
            className="popclose"
            onClick={(e) => {
              closePopupbox(e);
            }}
          ></div>
          <CheckoutModal sku={sku} images={images} quantity={quantity} />
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
  return (
    <ProductSkuStyle>
      <div className="product-left">
        {images &&
          images.map((image, index) => (
            <Img fluid={image.image.localFile.childImageSharp.fluid} />
          ))}
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
        <label>Quantity</label>
        <Select
          options={optionsQuantity}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          isSearchable={false}
        />
        <button
          onClick={(e) => {
            addToCart(e, sku, images, selectedOption.value);
          }}
        >
          ADD TO CART
        </button>
      </div>
    </ProductSkuStyle>
  );
};

export default SkuCard;
