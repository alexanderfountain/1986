import React from "react";
import {
  useAddItemsToCart,
  useCartCount,
  useCartItems,
} from "gatsby-theme-shopify-manager";
import Modal from "react-modal";
import styled from "styled-components";
import * as variable from "../components/variables";
import CheckoutLink from "../components/CheckoutLink";
import { Link } from "gatsby";
import check from "../images/check.svg";
import Img from "gatsby-image";

const CartStyle = styled.div`
  display: flex;
  justify-content: space-between;
  .cart-color {
    text-transform: capitalize;
  }
  .cart-popup-image {
    width: 100px;
    img {
      max-width: 100%;
      width: 100%;
      height: auto;
    }
  }
  .cart-pop-right {
    width: calc(100% - 120px);
    .cart-pop-added-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      margin-bottom: 20px;
      border-bottom: 1px solid ${variable.lightGray};
      a {
        color: ${variable.pink};
        text-decoration: none;
      }
    }
  }
  .check-continue-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    .continue-shopping {
      color: ${variable.pink};
      cursor: pointer;
    }
    .or {
      margin: 0px 10px;
    }
    .checkout {
      a {
        background-color: rgb(255, 0, 108);
        color: white;
        cursor: pointer;
        font-family: Poppins, sans-serif;
        font-size: 18px;
        letter-spacing: 0.5px;
        padding: 10px 20px;
        white-space: normal;
        width: auto;
        display: inline-block;
        text-decoration: none;
        font-weight: bold;
        border-radius: 10px;
        border: 5px solid rgb(255, 0, 108);
        text-transform: uppercase;
        &:hover {
          color: rgb(255, 0, 108);
          background: transparent;
        }
      }
    }
  }
  .item {
    margin-bottom: 5px;
  }
  .item-variant {
    text-transform: capitalize;
  }
  .cart-pop-quantity-container {
    margin-top: 20px;
    color: ${variable.gray};
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
  .x {
    margin: 0px 5px;
  }
`;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "520px",
  },
};
function AddToCart(state) {
  const cartCount = useCartCount();
  const addItemsToCart = useAddItemsToCart();
  async function addToCart() {
    const items = [
      {
        variantId: state.state.variant,
        quantity: state.state.quantity,
      },
    ];

    try {
      await addItemsToCart(items);
      // alert("Successfully added that item to your cart!");
      openModal();
    } catch {
      alert("There was a problem adding that item to your cart.");
    }
  }

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const item = useCartItems();

  console.log(state);
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <CartStyle>
          <div className="cart-popup-image">
            <Img fluid={state.state.variantImage} />
          </div>
          <div className="cart-pop-right">
            <div className="cart-pop-added-container">
              <div className="cart-pop-added">
                <span>
                  <img src={check} />
                </span>
                JUST ADDED
              </div>
              <div className="cart-pop-view-cart">
                <Link to="/cart">View Cart</Link>
              </div>
            </div>
            <div className="item">
              <strong>{state.state.title}</strong>
            </div>
            {state.state.selectedOptions.map(({ name, value }) => (
              <li className="item-variant" key={name}>
                <strong>{name}: </strong>
                {value}
              </li>
            ))}
            <div className="cart-pop-quantity-container">
              <div className="cart-pop-quantity">{state.state.quantity}</div>
              <div className="x">x</div>
              <div className="cart-pop-price">
                ${Number(state.state.variantPrice).toFixed(2)}
              </div>
            </div>
            <div className="check-continue-container">
              <div className="checkout">{<CheckoutLink />}</div>
              <div className="or">or</div>
              <div className="continue-shopping" onClick={closeModal}>
                Continue Shopping
              </div>
            </div>
          </div>
        </CartStyle>
      </Modal>
      <button id="add-to-cart-button-click" onClick={addToCart}>
        Buy Mask Now!
      </button>
    </div>
  );
}

export default AddToCart;
