// Filename - components/Footer.js

import React from "react";
import { Box, FooterContainer, Row, Column, FooterLink, Heading } from "../styles/FooterStyles.js";

const Footer = () => {
  return (
    <Box
      className="rents-background landing-header"
      style={{
        maxHeight: "370px",
        paddingTop: "30px",
        position: "relative",
        left: "0",
        bottom: "0",
        right: "0",
      }}
    >
      <h1 className="landing-title">Alquiler Seguro</h1>
      <FooterContainer className="landing-subtitle">
        <Row>
          {/* Dejamos comentadas las posibles secciones para añadir a la página más adelante */}
          {/* <Column>
            <Heading>Sobre nosotros</Heading>
            <FooterLink href="#">Porpósito</FooterLink>
            <FooterLink href="#">Meta</FooterLink>
            <FooterLink href="#">Testimonios</FooterLink>
          </Column> */}
          {/* <Column>
            <Heading>Services</Heading>
            <FooterLink href="#"></FooterLink>
            <FooterLink href="#"></FooterLink>
            <FooterLink href="#"></FooterLink>
            <FooterLink href="#"></FooterLink>
          </Column> */}
          <Column>
            <Heading>Contáctanos</Heading>
            <FooterLink href="https://github.com/JuanjoRiera">Juanjo Riera</FooterLink>
            <FooterLink href="https://github.com/vlicus">Samuel Cobas</FooterLink>
            <FooterLink href="https://github.com/AuthorGG">Carlos Curiel</FooterLink>
            <FooterLink href="https://github.com/nicofernandezdl7">Nicolás Fernández</FooterLink>
          </Column>
          {/* <Column>
          Columna para las redes sociales de la aplicación
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Youtube
                </span>
              </i>
            </FooterLink>
          </Column> */}
        </Row>
      </FooterContainer>
    </Box>
  );
};
export default Footer;
