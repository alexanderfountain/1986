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
import Countdown from "react-countdown";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import Reviews from "../components/reviews";
import star from "../images/star.svg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { myContext } from "../../provider";

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
      width: calc(50% - 20px);
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
      }
    }
    .product-right {
      width: calc(50% - 20px);
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
        margin-top: 20px;
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
      background: rgb(255, 0, 108);
      color: white;
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
        text-decoration: underline;
      }
    }
  }
  .product-price {
    margin-top: 20px;
    font-size: 24px;
  }
  .product-description {
    margin-top: 40px;
    padding: 20px 0px;
    font-size: 18px;
    line-height: 26px;
    border-top: thin solid ${variable.blue};
    border-bottom: thin solid ${variable.blue};
  }
  .compare-price {
    text-decoration: line-through;
  }
  .now-price {
    color: ${variable.pink};
    margin-left: 10px;
  }
  .count-sale {
    font-size: 16px;
    font-style: italic;
    color: ${variable.red};
  }
  .free-shipping {
    margin-bottom: 5px;
    font-style: italic;
  }
  .low-stock {
    color: ${variable.red};
    margin-bottom: 5px;
    font-style: italic;
    span {
      color: ${variable.darkGray};
    }
  }
  .reviews-outer {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .stars {
      margin-right: 5px;
      img {
        width: 20px;
        height: 20px;
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

const renderer = ({ hours, minutes, seconds, completed }) => {
  // Render a countdown
  return (
    <span>
      00:{minutes}:{seconds}
    </span>
  );
};

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.data.product.title,
      galleryItems: props.data.product.images,
      currentIndex: 6,
      variant: props.data.product.variants[0].shopifyId,
      variantImages: props.data.product.variants[0].title,
      variantPrice: props.data.product.variants[0].priceV2.amount,
      comparePrice: props.data.product.variants[0].compareAtPriceV2.amount,
      variantDescription:
        props.data.product.variants[0].product.descriptionHtml,
      selectedOptions: props.data.product.variants[0].selectedOptions,
      limitedQuantity: "12",
      variantImage:
        props.data.product.variants[0].image.localFile.childImageSharp.fluid,
      quantity: 1,
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }
  openModal() {
    this.setState({ isOpen: true });
  }
  items = this.props.data.product.images;

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
      return (
        <div>
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
    console.log(variant);
    this.setState({ variant: variant.shopifyId });
    this.setState({ variantImages: variant.title });
    this.setState({ currentIndex: 0 });
    this.setState({ variantPrice: variant.priceV2.amount });
    this.setState({ comparePrice: variant.compareAtPriceV2.amount });
    this.setState({ variantDescription: variant.product.descriptionHtml });
    this.setState({
      variantImage: variant.image.localFile.childImageSharp.fluid,
    });
    this.setState({ selectedOptions: variant.selectedOptions });
    if (variant.title == "blue") {
      this.setState({ limitedQuantity: "12" });
    }
    if (variant.title == "orange") {
      this.setState({ limitedQuantity: "10" });
    }
    var alt = variant.title;
    var newGalleryItems = [];
    this.items.map((image, i) => {
      if (image.altText == alt) {
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
    const product = this.props.data.product;
    const reviews = this.props.data.review.nodes;
    const reviewCount = reviews.length;
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
    console.log(product);

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
                        channel="youtube"
                        youtube={{ mute: 1, autoplay: 1 }}
                        isOpen={this.state.isOpen}
                        videoId="sw2XrP8d-XM"
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
                        channel="youtube"
                        isOpen={this.state.isOpen}
                        videoId="dYUPTyNsmc4"
                        onClose={() => this.setState({ isOpen: false })}
                        youtube={{ mute: 1, autoplay: 1 }}
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
                <div className="reviews-outer">
                  <span className="stars">
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                  </span>
                  <span>
                    <AnchorLink href="#reviews-anchor">
                      {reviewCount} reviews
                    </AnchorLink>
                  </span>
                </div>
                <div className="product-price">
                  <div className="product-price-original">
                    <myContext.Consumer>
                      {(context) => (
                        <div className="count-sale">
                          50% off sale ends in&nbsp;
                          <Countdown
                            date={context.saleDate}
                            daysInHours={true}
                          />
                        </div>
                      )}
                    </myContext.Consumer>
                    <span className="compare-price">
                      ${Number(this.state.comparePrice).toFixed(2)}
                    </span>
                    <span className="now-price">
                      ${Number(this.state.variantPrice).toFixed(2)}
                    </span>
                  </div>
                </div>
                <label>Choose your color:</label>
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
                <label>How many would you like?</label>
                <Select
                  isSearchable={false}
                  defaultValue={quantityOptions[0]}
                  onChange={this.quantityChange}
                  options={quantityOptions}
                />
                <div className="low-stock">
                  Low in stock! Only <span>{this.state.limitedQuantity}</span>{" "}
                  Remaining!
                </div>
                <div className="free-shipping">
                  Free Shipping with orders of 3 or more masks!
                </div>
                <div className="add-to-cart">
                  <AddToCart state={this.state} />
                </div>
              </div>
            </div>
            <div className="product-description">
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.variantDescription,
                }}
              />
            </div>
            <div id="reviews-anchor">
              <Reviews reviews={reviews}></Reviews>
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
        selectedOptions {
          name
          value
        }
        compareAtPriceV2 {
          amount
        }
        image {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 200, maxHeight: 200) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
            url
          }
        }
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
          description
          descriptionHtml
          variants {
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 200, maxHeight: 200) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
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
    review: allPrismicReview {
      nodes {
        first_publication_date(formatString: "MMM d, Y")

        data {
          name {
            text
          }
          product
          stars
          review {
            text
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
