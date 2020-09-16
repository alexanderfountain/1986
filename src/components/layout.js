/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "../components/regions/header"
import HeaderCart from "../components/regions/headerCart"
import Footer from "../components/regions/footer"
import CartOverview from "../components/CartOverview"
import { loadStripe } from "@stripe/stripe-js"
import { CartProvider } from "use-shopping-cart"
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"
import "../components/scss/layout/layout.scss"

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const Layout = ({ children, slug }) => {
  console.log(slug)
  if (slug) {
    var pageId = slug
  } else {
    var pageId = ""
  }

  return (
    <div id={pageId}>
      <CartProvider
        mode="client-only"
        stripe={stripePromise}
        successUrl={`${window.location.origin}/page-2/`}
        cancelUrl={`${window.location.origin}/`}
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
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
