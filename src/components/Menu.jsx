import React, { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../contexts/authContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Menu = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <section>
      <header>
        <div className="left-part"></div>
        <Link className="text-decoration-none" id="logo" to="/">
          Will-PGM school
        </Link>
      </header>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav" className="text-capitalize fs-6">
            <Nav className="me-auto">
              <Nav.Link as={Link} eventKey="1" to="/">
                {t("home")}
              </Nav.Link>

              <Nav.Link as={Link} eventKey="2" to="event">
                {t("event")}
              </Nav.Link>

              <Nav.Link as={Link} eventKey="3" to="posts">
                {t("news")}
              </Nav.Link>
              <Nav.Link as={Link} eventKey="4" to="about">
                {t("about")}
              </Nav.Link>

              <Nav.Link as={Link} eventKey="5" to="contact">
                {t("contact")}
              </Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link>
                {currentUser?.username}
              </Nav.Link>
              {currentUser ? (
                <Nav.Link eventKey={1} as={Link} to="/" onClick={logout}>
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link eventKey={1} as={Link} to="/login">
                  Login
                </Nav.Link>
              )}

              {!currentUser && (
                <Nav.Link eventKey={2} as={Link} to="/register">
                  Register
                </Nav.Link>
              )}
            </Nav>

            <Nav>
              <Nav.Link eventKey="10">
                <LanguageSwitcher />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

export default Menu;
