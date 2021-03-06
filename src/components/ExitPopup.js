import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import exitIntent from "exit-intent-mobile";
import Modal from "react-modal";
import * as variable from "../components/variables";

const ExitStyle = styled.div`
  .only-today {
    color: ${variable.blue};
  }
  h2 {
    margin: 10px 0px;
  }
  h5 {
    margin: 10px 0px;
  }
  p {
    span {
      color: ${variable.pink};
    }
  }
  .use-on-masks {
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
    text-align: center;
    &:hover {
      color: rgb(255, 0, 108);
      background: transparent;
    }
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
    zIndex: "99999",
  },
};
Modal.setAppElement("body");
function ExitPopup() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  // Initialise
  const removeExitIntent = exitIntent({
    maxDisplays: 99999, // default 99999
    eventThrottle: 100, // default 200
    showAfterInactiveSecondsDesktop: 20, // default 60
    showAfterInactiveSecondsMobile: 20, // default 40
    showAgainAfterSeconds: 10, // default 10
    onExitIntent: () => {
      openModal();
    },
    debug: false,
  });

  // Destroy
  removeExitIntent();

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <ExitStyle>
        <div class="exit-container">
          <div className="only-today">ONLY TODAY</div>
          <div className="wait">
            <h2>Don't Go!</h2>
            <h5>We have a COUPON CODE for you!</h5>
            <p>
              Get an extra 10% off when you use the code: <span>DONTGO</span>
            </p>
            <div className="extra-ten">
              <p>
                All you have to do is apply the coupon at Checkout after you
                have entered your shipping information.
              </p>
              <p>
                <div className="use-on-masks">
                  Use Coupon On our Color-Changing Masks.
                </div>
              </p>
            </div>
          </div>
        </div>
      </ExitStyle>
    </Modal>
  );
}

export default ExitPopup;
