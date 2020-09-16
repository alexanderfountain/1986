/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Header from "../components/regions/header";
import HeaderCart from "../components/regions/headerCart";
import Footer from "../components/regions/footer";
import CartOverview from "../components/CartOverview";
import { loadStripe } from "@stripe/stripe-js";
import { CartProvider } from "use-shopping-cart";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import "../components/scss/layout/layout.scss";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

const Layout = ({ children, slug }) => {
  if (slug) {
    var pageId = slug;
  } else {
    var pageId = "";
  }
  var currentWindow = "";
  if (typeof window !== "undefined" && window) {
    currentWindow = window.location.origin;
  }
  return (
    <div id={pageId}>
      <CartProvider
        mode="client-only"
        stripe={stripePromise}
        successUrl={`${currentWindow}/page-2/`}
        cancelUrl={`${currentWindow}/`}
        currency="USD"
        allowedCountries={["US", "GB", "CA"]}
        billingAddressCollection={true}
      >
        <HeaderCart />
        <Header />
        <main>{children}</main>
        <Footer />
      </CartProvider>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
