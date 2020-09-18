import React from "react";

import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";

import { PopupboxManager } from "react-popupbox";

const cardStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "flex-start",
  padding: "1rem",
  marginBottom: "1rem",
  boxShadow: "5px 5px 25px 0 rgba(46,61,73,.2)",
  backgroundColor: "#fff",
  borderRadius: "6px",
  maxWidth: "300px",
};
const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#fff",
  outline: "none",
  padding: "12px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
};

const SkuCard = ({ sku }) => {
  const { addItem } = useShoppingCart();
  function addToCart(e, sku) {
    addItem(sku);
    const content = (
      <div>
        <div className="popclose-parent">
          <div
            className="popclose"
            onClick={(e) => {
              closePopupbox(e);
            }}
          >
            Close
          </div>
          the content
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
  console.log(sku);
  return (
    <div style={cardStyles}>
      <h4>{sku.name}</h4>
      <p>
        Price:{" "}
        {formatCurrencyString({
          value: parseInt(sku.price),
          currency: sku.currency,
        })}
      </p>
      <button
        style={buttonStyles}
        onClick={(e) => {
          addToCart(e, sku);
        }}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default SkuCard;
