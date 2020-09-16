import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Skus from "../components/Products/Skus";
import CartOverview from "../components/CartOverview";

import { loadStripe } from "@stripe/stripe-js";
import { CartProvider } from "use-shopping-cart";

import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

const CartExample = () => {
  const { addItem } = useShoppingCart();
  var currentWindow = "";
  if (typeof window !== "undefined" && window) {
    currentWindow = window.location.origin;
  }
  return (
    <Layout>
      <h1>Checkout with cart example</h1>
      <h2>
        With{" "}
        <a href="https://use-shopping-cart.netlify.app/">use-shopping-cart</a>
      </h2>
      <CartProvider
        mode="client-only"
        stripe={stripePromise}
        successUrl={`${currentWindow}/page-2/`}
        cancelUrl={`${currentWindow}/`}
        currency="USD"
        allowedCountries={["US", "GB", "CA"]}
        billingAddressCollection={true}
      >
        <CartOverview />
        <Skus />
        <button onClick={() => addItem("prod_HyqqBgn9InlreR")}>
          ADD TO CART
        </button>
      </CartProvider>
    </Layout>
  );
};

export default CartExample;
