import React from "react";
import { useAddItemsToCart, useCartCount } from "gatsby-theme-shopify-manager";

function AddToCart(state) {
  console.log(state.state.variant);
  const cartCount = useCartCount();
  const addItemsToCart = useAddItemsToCart();
  async function addToCart() {
    const items = [
      {
        variantId: state.state.variant,
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
    <div>
      <button onClick={addToCart}>Add items to your cart</button>
    </div>
  );
}

export default AddToCart;
