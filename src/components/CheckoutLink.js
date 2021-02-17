import React from "react";
import { useCheckoutUrl } from "gatsby-theme-shopify-manager";

function CheckoutLink() {
  const checkoutUrl = useCheckoutUrl();

  return checkoutUrl == null ? (
    <p>There is no active checkout.</p>
  ) : (
    <p>
      <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
        CHECKOUT
      </a>
    </p>
  );
}

export default CheckoutLink;
