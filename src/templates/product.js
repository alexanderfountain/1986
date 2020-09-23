import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import * as variable from "../components/variables";
import styled from "styled-components";
import Container from "../components/container";
import SkuCard from "../components/Products/SkuCard";

const ProductStyle = styled.div`
  .breadcrumb {
    display: flex;
    padding: 10px 0px;
    margin: 10px 0px;
    align-items: center;
    a {
      color: ${variable.pink};
      text-decoration: none;
      font-size: 12px;
      font-style: italic;
    }
    .bread-carrot {
      margin: 0px 10px;
      font-size: 12px;
      font-style: italic;
    }
    .bread-name {
      font-size: 12px;
      font-style: italic;
    }
  }
`;
const Product = ({ data }) => {
  //   const prismicContent = data.page.allPas.edges[0]
  //   if (!prismicContent) return null
  const product = data.prices;
  const productGatsby = data.product;
  const site = data.site;
  const newSku = {
    sku: product.id,
    name: product.product.name,
    price: product.unit_amount,
    currency: product.currency,
  };
  return (
    <Layout slug={productGatsby.uid}>
      <ProductStyle>
        <Container>
          <div className="breadcrumb">
            <a href="/">Home</a> <div className="bread-carrot">></div>
            <div className="bread-name">{product.product.name}</div>
          </div>
          <div className="product-container">
            <SkuCard
              key={product.id}
              sku={newSku}
              images={productGatsby.data.images}
            />
          </div>
        </Container>
      </ProductStyle>
    </Layout>
  );
};
export default Product;

export const productQuery = graphql`
  query ProductBySlug($uid: String!, $sku: String!) {
    product: prismicProduct(uid: { eq: $uid }) {
      uid
      data {
        sku {
          text
        }
        images {
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
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
`;
