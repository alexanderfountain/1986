import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Container from "../container";
import * as variable from "../variables";

const HeaderCartStyle = styled.div``;

export const CheckoutModal = () => {
  return (
    <CheckoutModalStyle>
      <Container className="header-cart-container">
        <h2>Your Item was added to cart.</h2>
      </Container>
    </CheckoutModalStyle>
  );
};

export default CheckoutModal;
