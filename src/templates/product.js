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
import AliceSlide from "../components/AliceSlide";
import Select from "react-select";
import OrangeVideo from "../videos/orange-example.mp4";
import BlueVideo from "../videos/blue-example.mp4";
import OrangeVideoThumb from "../images/mask-orange-video.png";
import BlueTexture from "../images/blue-texture.png";
import OrangeTexture from "../images/orange-texture.png";
import ModalVideo from "react-modal-video";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
const ProductStyle = styled.div`
  label {
    display: block;
  }
  .color-variant {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
  }
  .color-blue {
    background-image: url(${BlueTexture});
    background-size: cover;
    backgroun-repeat: no-repeat;
  }
  .color-orange {
    background-image: url(${OrangeTexture});
    background-size: cover;
    backgroun-repeat: no-repeat;
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
    @media (max-width: ${variable.mobileWidth}) {
      flex-direction: column;
    }
    .product-left {
      width: calc(60% - 20px);
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
      }
    }
    .product-right {
      width: calc(40% - 20px);
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
      }
      label {
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 10px;
        margin-bottom: 10px;
        margin-top: 30px;
        border-bottom: thin solid ${variable.lightGray};
      }
    }
  }
  .video-thumb {
    cursor: pointer;
  }
  .thumb-ul {
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    flex-wrap: wrap;
    .gatsby-image-wrapper {
      @media (max-width: ${variable.tabletWidth}) {
        width: 75px !important;
        height: 75px !important;
      }
      @media (max-width: ${variable.mobileWidth}) {
        width: 50px !important;
        height: 50px !important;
      }
    }
    span {
      margin: 0px 5px;
    }
  }
  h1 {
    margin: 0px;
  }
  .title-color {
    text-transform: capitalize;
  }
  .variant-color-blue {
    .color-blue {
      border: 2px solid ${variable.darkGray};
    }
  }
  .variant-color-orange {
    .color-orange {
      border: 2px solid ${variable.darkGray};
    }
  }
  .add-to-cart {
    margin-top: 20px;
    button {
      -webkit-appearance: none;
      -moz-appearance: none;
      background: transparent;
      color: rgb(255, 0, 108);
      cursor: pointer;
      font-family: Poppins, sans-serif;
      font-size: 20px;
      letter-spacing: 0.5px;
      padding: 21px 34px;
      white-space: normal;
      width: auto;
      display: inline-block;
      margin: 20px 0px 0px 0px;
      text-decoration: none;
      font-weight: bold;
      border-radius: 10px;
      border: 5px solid rgb(255, 0, 108);
      text-transform: uppercase;
      &:hover {
        background-color: rgb(255, 0, 108);
        color: white;
      }
    }
  }
`;

const quantityOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];
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
      currentIndex: 6,
      variant: props.data.product.variants[0].shopifyId,
      variantImages: props.data.product.variants[0].title,
      quantity: 1,
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }
  openModal() {
    this.setState({ isOpen: true });
  }
  items = this.props.data.product.images;

  componentDidUpdate() {
    console.log(this.state);
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
    if (this.state !== undefined) {
      var alt = this.state.variantImages;
      console.log(alt);
      return (
        <div>
          {console.log(this)}
          {this.items.map((i) => (
            // if(alt == i.altText){

            <Img className="thumb" fluid={i.localFile.childImageSharp.fluid} />

            // }
          ))}
        </div>
      );
    } else {
      console.log(this);
    }
    // return this.items.map((i) => <Img fluid={i.localFile.childImageSharp.fluid}/>);
  };
  variantChange = (variant, i) => {
    return (
      <div
        className={"color-variant color-" + variant.title}
        onClick={() => this.variantClick(variant, i)}
      ></div>
    );
  };
  quantityChange = (quantity) => {
    this.setState({ quantity: quantity.value });
  };
  variantClick = (variant, i) => {
    this.setState({ variant: variant.shopifyId });
    this.setState({ variantImages: variant.title });
    this.setState({ currentIndex: 0 });
    var alt = variant.title;
    var newGalleryItems = [];
    console.log(alt);
    this.items.map((image, i) => {
      if (image.altText == alt) {
        console.log(image);
        newGalleryItems.push(image);
      }
    });
    this.setState({ galleryItems: newGalleryItems });
  };
  thumbItem = (item, i) => {
    var alt = this.state.variantImages;
    if (alt == item.altText) {
      return (
        <span onClick={() => this.slideTo(i)}>
          <Img
            className="the-thumb"
            fixed={item.localFile.childImageSharp.fixed}
          />{" "}
        </span>
      );
    }
  };

  variantImages = (item, i) => {
    if (item.altText == this.state.variantImages) {
      return <Img fluid={item.localFile.childImageSharp.fluid} />;
    }

    // if (image.altText == this.state.variantImages) {
    //   return <h3>{image.altText}</h3>;
    // } else {
    //   return null;
    // }
  };

  slideTo = (i) => {
    this.setState({ currentIndex: i });
  };

  onSlideChanged = (e) => this.setState({ currentIndex: e.item });

  render() {
    const { galleryItems, currentIndex } = this.state;
    console.log(currentIndex);
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
    console.log(this.state.variantImages);

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
                <AliceSlide
                  items={galleryItems}
                  currentIndex={this.state.currentIndex}
                />

                <ul className="thumb-ul">
                  {galleryItems.map(this.thumbItem)}{" "}
                  {this.state.variantImages == "orange" && (
                    <React.Fragment>
                      <ModalVideo
                        channel="custom"
                        isOpen={this.state.isOpen}
                        url={OrangeVideo}
                        onClose={() => this.setState({ isOpen: false })}
                      />
                      <span className="video-thumb" onClick={this.openModal}>
                        <Img
                          fixed={
                            this.props.data.videoPlay.childImageSharp.fixed
                          }
                        />
                      </span>
                    </React.Fragment>
                  )}
                  {this.state.variantImages == "blue" && (
                    <React.Fragment>
                      <ModalVideo
                        channel="custom"
                        isOpen={this.state.isOpen}
                        url={BlueVideo}
                        onClose={() => this.setState({ isOpen: false })}
                      />
                      <span className="video-thumb" onClick={this.openModal}>
                        <Img
                          fixed={
                            this.props.data.videoPlay.childImageSharp.fixed
                          }
                        />
                      </span>
                    </React.Fragment>
                  )}
                </ul>

                {/* <nav>   
           {data.product.images.map((image, index) => (
              <Img fluid={image.localFile.childImageSharp.fluid} />
            ))}
                       </nav> */}
                {/* <nav>{this.items.map(this.thumbItem)}</nav> */}
              </div>
              <div className="product-right">
                <h1>
                  <span className="title-color">
                    {this.state.variantImages}{" "}
                  </span>
                  {product.title}
                </h1>
                <label>Color</label>
                <div className={"variant-color-" + this.state.variantImages}>
                  {this.props.data.product.variants.map(this.variantChange)}
                </div>
                {/* {this.props.data.product.variants.map(
                    (variant) =>
                    <div onClick={e => {
                      this.variantChange(variant)
                    }}>
                      {variant.title}
                    </div>
                  )} */}
                <label>Quantity</label>
                <Select
                  isSearchable={false}
                  defaultValue={quantityOptions[0]}
                  onChange={this.quantityChange}
                  options={quantityOptions}
                />
                <div className="add-to-cart">
                  <AddToCart state={this.state} />
                </div>
                {/* <CheckoutLink /> */}
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
                fluid(maxWidth: 800, maxHeight: 800) {
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
            fluid(maxWidth: 800, maxHeight: 800) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
            fixed(width: 100, height: 100) {
              ...GatsbyImageSharpFixed_withWebp_tracedSVG
            }
          }
        }
      }
    }
    videoPlay: file(relativePath: { eq: "mask-orange-video.png" }) {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed_withWebp_tracedSVG
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
