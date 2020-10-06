import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import * as variable from "../components/variables";
import styled from "styled-components";
import Container from "../components/container";
import SkuCard from "../components/Products/SkuCard";
import { useAddItemsToCart, useCartCount } from "gatsby-theme-shopify-manager";
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

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
  // const product = data.prices;
  // const productGatsby = data.product;
  // const site = data.site;
  // const newSku = {
  //   sku: product.id,
  //   name: product.product.name,
  //   price: product.unit_amount,
  //   currency: product.currency,
  // };
  console.log(data);
  const cartCount = useCartCount();
  const addItemsToCart = useAddItemsToCart();

  async function addToCart() {
    const items = [
      {
        variantId: data.product.variants[0].shopifyId,
        quantity: 1,
      },
    ];

    try {
      await addItemsToCart(items);
      // alert("Successfully added that item to your cart!");
    } catch {
      alert("There was a problem adding that item to your cart.");
    }
  }
  return (
    <Layout slug={data.product.shopifyId}>
      <ProductStyle>
        <Container>
          <div className="breadcrumb">
            <a href="/">Home</a> <div className="bread-carrot"></div>
          </div>
          <div className="product-container">
            <div className="product-left">
            <AliceCarousel mouseTrackingEnabled>
      <img src="https://picsum.photos/id/1018/1000/600/" className="yours-custom-class" />
      <img src="https://picsum.photos/id/1015/1000/600/" className="yours-custom-class" />
    </AliceCarousel>

            </div>           
            <div className="product-right">
            <p>There are currently {cartCount} items in your cart.</p>
            <button onClick={addToCart}>Add items to your cart</button>
              </div>

          </div>
        </Container>
      </ProductStyle>
    </Layout>
  );
};
export default Product;

export const productQuery = graphql`
  query ProductBySlug($shopifyId: String!) {
    product: shopifyProduct(shopifyId: { eq: $shopifyId }) {
      variants {
        product {
          images {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
        priceV2 {
          amount
        }
        shopifyId
        id
      }
      title
      shopifyId
      images {
        altText
        localFile {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
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
