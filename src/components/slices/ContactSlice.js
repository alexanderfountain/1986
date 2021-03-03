import React from "react";
import Container from "../container";
import styled from "styled-components";
import * as variable from "../variables";
const ContactStyle = styled.div`
  padding: 75px 0px;
  margin: 0 auto;
  max-width: 900px;
  .contact-outer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .contact-form-left {
    width: calc(75% - 35px);
    p {
      &:first-child {
        font-weight: 300;
      }
    }
    @media (max-width: ${variable.mobileWidth}) {
      width: 100%;
      margin-bottom: 40px;
    }
  }
  .contact-form-right {
    width: 25%;
    font-size: 17px;
    line-height: 23px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: ${variable.mobileWidth}) {
      width: 100%;
    }
    a {
      font-size: 17px;
      line-height: 23px;
    }
  }
  input {
    width: 100%;
    -webkit-appearance: none;
    border: 2px solid ${variable.blue};
    border-radius: 7px;
    padding: 15px 20px;
    font-size: 17px;
    font-weight: 300;
    &::placeholder {
      color: ${variable.blue};
      font-size: 17px;
      font-weight: 300;
    }
  }
  textarea {
    width: 100%;
    -webkit-appearance: none;
    border: 2px solid ${variable.blue};
    border-radius: 7px;
    padding: 15px 20px;
    height: 240px;
    font-size: 17px;
    font-weight: 300;
    line-height: 24px;
    &::placeholder {
      color: ${variable.blue};
      font-size: 17px;
      font-weight: 300;
    }
  }
  .hidden {
    display: none;
    -webkit-appearance: none;
  }
  .contact-submit {
    background-color: ${variable.pink};
    color: white;
    padding: 12px 30px;
    border: none;
    font-size: 24px;
    border-radius: 4px;
    text-decoration: none;
    display: inline-block;
    margin-top: 20px;
    cursor: pointer;
    a {
      color: white;
    }
    &:hover {
      background: lighten($bg, 8%);
      transition: all 0.3s ease;
    }
  }
  .email-phone {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 25px 0px;
    input {
      width: calc(50% - 6px);
    }
  }
`;
export const ContactSlice = ({ slice }) => {
  return (
    <Container>
      <ContactStyle>
        <div className="contact-outer">
          <div className="contact-form-left">
            <p>We're here to help, and respondwith tempo.</p>
            <form
              name="contact"
              method="POST"
              netlify-honeypot="bot-field"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don’t fill this out if you’re human:{" "}
                  <input name="bot-field" />
                </label>
              </p>
              <input type="text" id="name" name="name" placeholder="Name" />
              <div className="email-phone">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                />

                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                />
              </div>

              <textarea id="message" name="message" placeholder="Message" />

              <input type="submit" className="contact-submit" value="Submit" />
            </form>
          </div>
          <div className="contact-form-right">
            <div className="contact-email">
              <a href="mailto:info@1986.io">info@1986.io</a>
            </div>
            <div className="contact-address">
              <div>P.O Box 471</div>
              <div>Saint Croix Falls, Wisconsin 54024</div>
            </div>
          </div>
        </div>
      </ContactStyle>
    </Container>
  );
};

export default ContactSlice;
