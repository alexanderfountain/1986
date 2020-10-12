import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import * as variable from "../components/variables";
import styled from "styled-components";
import Container from "../components/container";
import SkuCard from "../components/Products/SkuCard";
import { useAddItemsToCart, useCartCount } from "gatsby-theme-shopify-manager";
import "react-alice-carousel/lib/alice-carousel.css";
import Img from "gatsby-image";
import AddToCart from "../components/AddToCart";
import CheckoutLink from "../components/CheckoutLink";
import ReactImageZoom from "react-image-zoom";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import AliceSlide from "../components/AliceSlide"
const ProductStyle = styled.div`
.color-variant{
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: inline-block;
}
.color-blue{
  background-color: ${variable.blue};
}
.color-orange{
  background-color: orange;
}
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
  .product-container {
    display: flex;
    justify-content: space-between;
    .product-left {
      width: calc(50% - 20px);
    }
    .product-right {
      width: calc(50% - 20px);
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

    super(props);
    this.state = {
      galleryItems: props.data.product.images,
      currentIndex: 0,
      variant: props.data.product.variants[0].shopifyId,
      variantImages: props.data.product.variants[0].title,
    };
    console.log(props)
  }

  items = this.props.data.product.images;

  componentDidUpdate() {
  }
  // {this.props.data.product.images.map(
  //   (image, index) =>
  //     // <VariantImages image={image}></VariantImages>
  //     this.variantImages(image)
  //   // <Img fluid={image.localFile.childImageSharp.fluid} />
  // )}
  // galleryItems = () => {
  //   // var alt = this.state.variantImages
    
  //   // this.items.map((item, index) => {
  //   //   if(alt == item.title){
  //   //     return(
  //   //       <h2 key={item}> {item}</h2>
  //   //     )
  //   //   }
  //   // }   
  //   // )
  // }
  galleryItems = () => {
    
    if(this.state !== undefined){
      var alt = this.state.variantImages
      console.log(alt)
    return(
        this.items.map((i) => (
          // console.log(this)

          // if(alt == i.altText){
          
            <Img fluid={i.localFile.childImageSharp.fluid}/>
          
          // }
        )
        )
      )
    }
    else{
      console.log(this)
    }
    // return this.items.map((i) => <Img fluid={i.localFile.childImageSharp.fluid}/>);
  }
  variantChange = (variant, i) => {
    return(
      <div className={"color-variant color-"+variant.title} onClick={() => this.variantClick(variant, i)}></div>
    )
  }
  variantClick = (variant, i) => {
    this.setState({variant: variant.shopifyId})
    this.setState({variantImages: variant.title})
    this.setState({ currentIndex: 0 });
    var alt = variant.title
    var newGalleryItems = []
    console.log(alt)
    this.items.map((image, i) => {
      if (image.altText == alt) {
        console.log(image)
        newGalleryItems.push(image)
      }
    }
    )
    this.setState({galleryItems: newGalleryItems})
 }
  thumbItem = (item, i) => {
    var alt = this.state.variantImages
    console.log(i)
    if(alt == item.altText){
      return(
        <span onClick={() => this.slideTo(i)}>
    <Img fixed={item.localFile.childImageSharp.fixed} />{" "}
  </span>
      )
    }

  };

  variantImages = (item, i) => {
    if (item.altText == this.state.variantImages) {

    return(
      <Img fluid={item.localFile.childImageSharp.fluid} />
    )
    }
    
    // if (image.altText == this.state.variantImages) {
    //   return <h3>{image.altText}</h3>;
    // } else {
    //   return null;
    // }
  };

  slideTo = (i) => {
    this.setState({ currentIndex: i });
  }

  onSlideChanged = (e) => this.setState({ currentIndex: e.item });



  render() {
    const { galleryItems, currentIndex } = this.state;
    const product = this.props.data.product;

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
      <Layout slug={product.shopifyId}>
        <ProductStyle>
          <Container>
            <div className="breadcrumb">
              <a href="/">Home</a>
              <div className="bread-carrot"> {product.title}</div>
            </div>
            <div className="product-container">
              <div className="product-left">

              <AliceSlide items={galleryItems} currentIndex={currentIndex} />

                <ul>{galleryItems.map(this.thumbItem)}</ul>

                {/* <nav>   
           {data.product.images.map((image, index) => (
              <Img fluid={image.localFile.childImageSharp.fluid} />
            ))}
                       </nav> */}
                {/* <nav>{this.items.map(this.thumbItem)}</nav> */}
              </div>
              <div className="product-right">
                <h1>{product.title}</h1>
                {this.props.data.product.variants.map(this.variantChange)}
                {/* {this.props.data.product.variants.map(
                    (variant) =>
                    <div onClick={e => {
                      this.variantChange(variant)
                    }}>
                      {variant.title}
                    </div>
                  )} */}
                <AddToCart state={this.state} />
                <CheckoutLink />
              </div>
            </div>
          </Container>
        </ProductStyle>
      </Layout>
    );
  }
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
