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
import { PopupboxManager, PopupboxContainer } from "react-popupbox";
import "react-popupbox/dist/react-popupbox.css";
import { ContextProvider } from "gatsby-theme-shopify-manager";

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
      <ContextProvider
        shopName="19-86"
        accessToken="ea3f72385a09fa80335785e41a2d8993"
      >
        <HeaderCart />
        <Header />
        <PopupboxContainer />
        <main>{children}</main>
        <Footer />
      </ContextProvider>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
