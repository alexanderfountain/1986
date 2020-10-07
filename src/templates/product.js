import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby";
import Layout from "../components/layout";
import * as variable from "../components/variables";
import styled from "styled-components";
import Container from "../components/container";
import SkuCard from "../components/Products/SkuCard";
import { useAddItemsToCart, useCartCount } from "gatsby-theme-shopify-manager";
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import Img from "gatsby-image";
import AddToCart from "../components/AddToCart"

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

class Product extends React.Component {
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

  constructor(props) {
    console.log(props)

    super(props);
      this.state = {
        galleryItems: this.galleryItems(),
        currentIndex: 0,
        variant: props.data.product.variants[0].shopifyId,
        variantImages: props.data.product.variants[0].title
      }
  }
  items = this.props.data.product.images
  galleryItems() {
    return this.items.map((i) => <h2 key={i}> {i}</h2>)
  }
  // console.log(data);
 

  thumbItem = (item, i) => <span onClick={() => this.slideTo(i)}><Img fixed={item.localFile.childImageSharp.fixed} /> </span>

  slideTo = (i) => this.setState({ currentIndex: i })

  onSlideChanged = (e) => this.setState({ currentIndex: e.item })


  render(){

    const { galleryItems, currentIndex } = this.state

    // const cartCount = useCartCount();
    // const addItemsToCart = useAddItemsToCart();
    // async function addToCart() {
    //   const items = [
    //     {
    //       variantId: this.state.variant,
    //       quantity: 1,
    //     },
    //   ];
  
    //   try {
    //     await addItemsToCart(items);
    //     // alert("Successfully added that item to your cart!");
    //   } catch {
    //     alert("There was a problem adding that item to your cart.");
    //   }
    // }
  return (
    // <h2>test</h2>
    <Layout slug={this.props.data.product.shopifyId}>
      <ProductStyle>
        <Container>
          <div className="breadcrumb">
            <a href="/">Home</a> <div className="bread-carrot"></div>
          </div>
          <div className="product-container">
            <div className="product-left">
            <AliceCarousel 
            items={galleryItems}
            slideToIndex={currentIndex}
            onSlideChanged={this.onSlideChanged}>
            {this.props.data.product.images.map((image, index) => (
              <Img fluid={image.localFile.childImageSharp.fluid} />
            ))}
           </AliceCarousel>
           {console.log(this)}
           {/* {this.items.map(console.log(this))} */}
           <ul>{this.items.map(this.thumbItem)}</ul>

           {/* <nav>   
           {data.product.images.map((image, index) => (
              <Img fluid={image.localFile.childImageSharp.fluid} />
            ))}
                       </nav> */}
    {/* <nav>{this.items.map(this.thumbItem)}</nav> */}


            </div>           
            <div className="product-right">
            {/* <p>There are currently {cartCount} items in your cart.</p> */}
            {/* <button onClick={addToCart}>Add items to your cart</button> */}
            <AddToCart state={this.state} />
              </div>

          </div>
        </Container>
      </ProductStyle>
    </Layout>
  );
};
}
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
        title
      }
      title
      shopifyId
      images {
        altText
        localFile {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
            fixed(width: 100, height: 100) {
              ...GatsbyImageSharpFixed_withWebp_tracedSVG
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
