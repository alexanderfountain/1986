import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Skus from "../components/Products/Skus"
import CartOverview from "../components/CartOverview"

import { loadStripe } from "@stripe/stripe-js"
import { CartProvider } from "use-shopping-cart"
import Container from "../components/container"

const CartExample = () => {
  return (
    <Layout>
      <Container>
        <h1>Shopping Cart</h1>
        <CartOverview />
      </Container>
    </Layout>
  )
}

export default CartExample
