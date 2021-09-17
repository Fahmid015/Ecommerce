import React, { useState } from "react";
import { SearchOutlined, ShoppingCart } from "@material-ui/icons";
import {
  Navbar,
  Container,
  InputGroup,
  DropdownButton,
  Form,
  Col,
  Button,
} from "react-bootstrap";
import logo from "../../assets/storelogo.png";
import "./Header.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import { commerce } from "../../lib/commerce";

const Header = ({
  totalItems,
  cart,
  updateCart,
  removeFromCart,
  emptyCart,
  inventory,
  searchResult,
  handleSearchResult,
}) => {
  const [keyword, setKeyword] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const handleInputChange = (event) => {
    if (!keyword || !event.target.value) {
      // setResultMessage("");
      // setSearchResult([]);
    }
    setKeyword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyword) {
      setResultMessage("No results match!");
      handleSearchResult([]);
    }
    if (keyword) {
      try {
        const { data } = await commerce.products.list({
          query: keyword,
        });
        if (!data) {
          setResultMessage("No results match!");
          handleSearchResult([]);
          return;
        }
        setResultMessage("");
        handleSearchResult(data);
      } catch (error) {
        handleSearchResult([]);
      }
    }
  };

  return (
    <Navbar sticky="top" bg="info" expand="lg">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            {" "}
            <img src={logo} alt="logo" height={100} width={100} />{" "}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Col lg={6} md={8} sm={10} xsm={12} className="mx-auto">
            <InputGroup>
              <Form
                onSubmit={handleSubmit}
                style={{ width: "100%", display: "flex" }}
              >
                <Form.Control
                  id="floatingInput"
                  type="text"
                  size="lg"
                  placeholder="Search for a Product"
                  onChange={handleInputChange}
                />
                <Button
                  type="submit"
                  className="searchButton"
                  size="lg"
                  id="button-addon2"
                >
                  <SearchOutlined className="searchIcon" fontSize="medium" />
                </Button>
              </Form>
            </InputGroup>
            <Typography variant="h6" style={{ color: "red" }}>
              {resultMessage}
            </Typography>
          </Col>
          <Typography
            variant="h5"
            style={{ margin: "20px", cursor: "pointer" }}
          >
            <Link
              to="/Products"
              style={{ marginLeft: "15px" }}
              onClick={() => {
                if (window.location.pathname === "/Products") {
                  window.location.reload(false);
                }
              }}
            >
              Shop
            </Link>
            <Cart
              totalItems={totalItems}
              cart={cart}
              updateCart={updateCart}
              removeFromCart={removeFromCart}
              emptyCart={emptyCart}
              inventory={inventory}
            />
          </Typography>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
