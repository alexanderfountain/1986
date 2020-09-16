import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import SkuCard from "../components/Products/SkuCard"

const ProductStyle = styled.div``
const Product = ({ data }) => {
  //   const prismicContent = data.page.allPas.edges[0]
  //   if (!prismicContent) return null
  const product = data.prices
  const productStripe = data.product
  const site = data.site
  console.log(product)
  const newSku = {
    sku: product.id,
    name: product.product.name,
    price: product.unit_amount,
    currency: product.currency,
  }
  return (
    <Layout slug={productStripe.uid}>
      <ProductStyle>
        <Container>
          <h1>{product.product.name}</h1>
          <SkuCard key={product.id} sku={newSku} />
        </Container>
      </ProductStyle>
    </Layout>
  )
}
export default Product

export const productQuery = graphql`
  query ProductBySlug($uid: String!, $sku: String!) {
    product: prismicProduct(uid: { eq: $uid }) {
      uid
      data {
        sku {
          text
        }
      }
    }
    prices: stripePrice(id: { eq: $sku }) {
      id
      product {
        name
        type
      }
      currency
      unit_amount
    }
    site: allPrismicSiteInformation {
      nodes {
        data {
          meta_title {
            text
          }
          meta_description {
            text
          }
          description {
            text
          }
          site_url {
            text
          }
          site_title {
            text
          }
          twitter_author {
            text
          }
        }
      }
    }
  }
`
