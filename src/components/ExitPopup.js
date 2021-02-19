// import React from "react";
// import { useStaticQuery, graphql } from "gatsby";
// import Img from "gatsby-image";
// import styled from "styled-components";
// import exitIntent from "exit-intent-mobile";
// import Modal from "react-modal";

// const ExitStyle = styled.div``;
// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     width: "90%",
//     maxWidth: "520px",
//     zIndex: "99999",
//   },
// };
// Modal.setAppElement("body");
// function ExitPopup() {
//   const [modalIsOpen, setIsOpen] = React.useState(false);
//   function openModal() {
//     setIsOpen(true);
//   }
//   function closeModal() {
//     setIsOpen(false);
//   }
//   function afterOpenModal() {
//     // references are now sync'd and can be accessed.
//     // subtitle.style.color = "#f00";
//   }

//   // Initialise
//   const removeExitIntent = exitIntent({
//     maxDisplays: 99999, // default 99999
//     eventThrottle: 100, // default 200
//     showAfterInactiveSecondsDesktop: 60, // default 60
//     showAfterInactiveSecondsMobile: 40, // default 40
//     showAgainAfterSeconds: 10, // default 10
//     onExitIntent: () => {
//       openModal();
//     },
//     debug: false,
//   });

//   // Destroy
//   removeExitIntent();

//   return (
//     <ExitStyle>
//       <Modal
//         isOpen={modalIsOpen}
//         onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Example Modal"
//       >
//         <div class="exit-container">
//           <div className="only-today">ONLY TODAY</div>
//           <div className="wait">
//             <h2>Don't Go!</h2>
//             <p>
//               You still have some products in your cart. Get an extra 10% off
//               when you use the code: <span>DONTGO</span>
//             </p>
//             <div className="extra-ten">
//               That's a full 40% off your entire order when added to our already
//               crazy 30% off sale!
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </ExitStyle>
//   );
// }

// export default ExitPopup;
