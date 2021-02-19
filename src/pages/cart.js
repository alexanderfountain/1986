/** @jsx jsx */
import React from "react";
import Container from "../components/container";
import Layout from "../components/layout";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Grid, Divider, Button, Card, Text } from "@theme-ui/components";
import { Styled, jsx } from "theme-ui";
import styled from "styled-components";
import Img from "gatsby-image";
import * as variable from "../components/variables";
import {
  useAddItemToCart,
  useCartItems,
  useCheckoutUrl,
  useCart,
  useUpdateItemQuantity,
} from "gatsby-theme-shopify-manager";

const CartStyle = styled.div`
  button {
    background-color: ${variable.darkGray};
    cursor: pointer;
  }
`;

const CartPage = () => {
  const {
    allShopifyProductVariant: { nodes: variants },
    allShopifyProduct: { nodes: products },
  } = useStaticQuery(graphql`
    query {
      allShopifyProductVariant {
        nodes {
          shopifyId
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
      allShopifyProduct {
        nodes {
          handle
          variants {
            shopifyId
          }
        }
      }
    }
  `);
  const lineItems = useCartItems();
  const updateItemQuantity = useUpdateItemQuantity();
  const checkoutUrl = useCheckoutUrl();
  console.log(checkoutUrl);
  const cart = useCart();
  const { tax, total } = getCartTotals(cart);
  const addItemToCart = useAddItemToCart();
  const betterProductHandles = products.map(({ handle, variants }) => {
    const newVariants = variants.map((variant) => variant.shopifyId);
    return {
      variants: newVariants,
      handle,
    };
  });

  function getCartTotals(cart) {
    if (cart == null) {
      return { tax: "-", total: "-" };
    }

    const tax = cart.totalTaxV2
      ? `$${Number(cart.totalTaxV2.amount).toFixed(2)}`
      : "-";
    const total = cart.totalPriceV2
      ? `$${Number(cart.totalPriceV2.amount).toFixed(2)}`
      : "-";

    return {
      tax,
      total,
    };
  }

  async function removeFromCart(variantId) {
    try {
      await updateItemQuantity(variantId, 0);
    } catch (e) {
      console.log(e);
    }
  }

  function getHandleForVariant(variantId) {
    const selectedProduct = betterProductHandles.find((product) => {
      return product.variants.includes(variantId);
    });

    return selectedProduct ? selectedProduct.handle : null;
  }

  function getImageFluidForVariant(variantId) {
    const selectedVariant = variants.find((variant) => {
      return variant.shopifyId === variantId;
    });

    if (selectedVariant) {
      return selectedVariant.image.localFile.childImageSharp.fluid;
    }
    return null;
  }

  const LineItem = ({ item }) => (
    <div
      className="line-item"
      sx={{
        display: "flex",
        justifyContent: ["flex-start", "space-between"],
        alignItems: "center",
        flexDirection: ["column", "row"],
      }}
    >
      <div
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          maxWidth: ["100%", "60%"],
        }}
      >
        <div
          sx={{
            padding: 1,
            border: "1px solid gray",
            width: "100%",
            maxWidth: ["100%", "120px"],
            marginRight: "20px",
          }}
        >
          <Img fluid={getImageFluidForVariant(item.variant.id)} />
        </div>
        <div
          sx={{
            width: "100%",
            maxWidth: ["100%", "calc(100% - 120px)"],
          }}
        >
          <Link
            url={`/product/${getHandleForVariant(item.variant.id)}`}
            sx={{ fontSize: 3, m: 0, fontWeight: 700 }}
          >
            {item.title}
          </Link>
          <Styled.ul sx={{ mt: 2, mb: 0, padding: 0, listStyle: "none" }}>
            {item.variant.selectedOptions.map(({ name, value }) => (
              <li key={name}>
                <strong>{name}: </strong>
                {value}
              </li>
            ))}
            <li key="quantity">
              <strong>Quantity: </strong>
              {item.quantity}
            </li>
          </Styled.ul>
        </div>
      </div>
      <div
        sx={{
          width: "100%",
          maxWidth: ["100%", "40%"],
          marginTop: ["20px", "0px"],
          display: "flex",
          justifyContent: ["flex-start", "flex-end"],
          alignItems: "center",
        }}
      >
        <Button variant="link" onClick={() => removeFromCart(item.variant.id)}>
          Delete
        </Button>

        <Text
          sx={{
            fontSize: 4,
            fontWeight: 700,
            marginLeft: "20px",
          }}
        >
          ${Number(item.variant.priceV2.amount).toFixed(2)}
        </Text>
      </div>
    </div>
  );

  const emptyCart = (
    <CartStyle>
      <Layout>
        <Container>
          <Styled.h1>Cart</Styled.h1>
          <Styled.p>Your shopping cart is empty.</Styled.p>
        </Container>
      </Layout>
    </CartStyle>
  );

  return lineItems.length < 1 ? (
    emptyCart
  ) : (
    <CartStyle>
      <Layout>
        <Container>
          <Styled.h1>Cart</Styled.h1>
          {lineItems.map((item) => (
            <React.Fragment key={item.id}>
              <LineItem key={item.id} item={item} />
              <Divider sx={{ my: 4 }} />
            </React.Fragment>
          ))}
          <div sx={{ display: "flex" }}>
            <Card
              sx={{
                marginLeft: ["0px", "auto"],
                width: "100%",
                maxWidth: ["100%", "400px"],
                margin: "20px 0px",
              }}
            >
              <Styled.h3 sx={{ mt: 0, mb: 3 }}>Cart Summary</Styled.h3>
              <Divider />

              <Grid gap={1} columns={2} sx={{ my: 3 }}>
                <Text>Subtotal:</Text>
                <Text sx={{ marginLeft: "auto" }}>{total}</Text>
                <Text>Shipping:</Text>
                <Text sx={{ marginLeft: "auto" }}> - </Text>
                <Text>Tax: </Text>
                <Text sx={{ marginLeft: "auto" }}>{tax}</Text>
              </Grid>

              <Divider />
              <Grid gap={1} columns={2}>
                <Text variant="bold">Estimated Total:</Text>
                <Text variant="bold" sx={{ marginLeft: "auto" }}>
                  {total}
                </Text>
              </Grid>
              <br />
              {checkoutUrl != null ? (
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cart-checkout"
                >
                  Checkout
                </a>
              ) : null}
            </Card>
          </div>
        </Container>
      </Layout>
    </CartStyle>
  );
};
export default CartPage;
