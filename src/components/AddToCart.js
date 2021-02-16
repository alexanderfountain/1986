import React from "react";
import {
  useAddItemsToCart,
  useCartCount,
  useCartItems,
} from "gatsby-theme-shopify-manager";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
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

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="item">{item[0].title}</div>
        {item[0].variant.selectedOptions.map(({ name, value }) => (
          <li key={name}>
            <strong>{name}: </strong>
            {value}
          </li>
        ))}
        <button onClick={closeModal}>close</button>
      </Modal>
      <button onClick={addToCart}>Add to cart.</button>
    </div>
  );
}

export default AddToCart;
