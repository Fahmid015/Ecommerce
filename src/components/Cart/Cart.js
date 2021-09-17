import React, { useState } from "react";
import "./Cart.css";
import { Cancel, ShoppingCart } from "@material-ui/icons";
import {
  Badge,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Drawer,
  Grid,
  Typography,
} from "@material-ui/core";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cart = ({
  totalItems,
  cart,
  updateCart,
  removeFromCart,
  emptyCart,
  inventory,
}) => {
  const [state, setState] = useState(false);

  const toggleDrawer = () => {
    setState(!state);
  };

  const EmptyCart = () => {
    return (
      <div className="emptyCart">
        <ShoppingCart />
        <Typography variant="subtitle2">
          Your Cart is currently empty
        </Typography>
      </div>
    );
  };

  const FilledCart = () => {
    return (
      <Grid container spacing={1} style={{ margin: "2rem" }}>
        {cart.line_items &&
          cart.line_items.map((item) => {
            return (
              <Grid item lg={12} md={12} sm={12} xs={12} key={item.id}>
                <Card className="cartItem">
                  <Link
                    onClick={toggleDrawer}
                    to={`ProductPage/${item.product_id}`}
                  >
                    <CardMedia
                      style={{
                        height: "150px",
                        width: "150px",
                        margin: "1rem",
                      }}
                      image={
                        item.variant
                          ? item.variant.assets[0].url
                          : item.media.source
                      }
                    />
                  </Link>
                  <CardContent className="cartItemTitle">
                    <Link
                      onClick={toggleDrawer}
                      to={`ProductPage/${item.product_id}`}
                    >
                      <Typography variant="h6">{item.name}</Typography>
                    </Link>
                    {item.selected_options.map((option) => {
                      return (
                        <Typography variant="body2">
                          {option.group_name}: {option.option_name}
                        </Typography>
                      );
                    })}
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove Item
                    </Button>
                  </CardContent>

                  <Col className="cartDetails">
                    <Typography>
                      <b>Item Price: {item.price.formatted_with_symbol} </b>
                    </Typography>
                    <Typography>
                      <b>
                        Total Price: {item.line_total.formatted_with_symbol}
                      </b>
                    </Typography>

                    <Typography style={{ marginTop: "1rem" }}>
                      Quantity Selected:
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        marginBottom: "1rem",
                      }}
                    >
                      <Button
                        onClick={() => updateCart(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <Typography style={{ margin: "1rem" }}>
                        {item.quantity}
                      </Typography>
                      <Button
                        disabled={
                          (item.variant &&
                            item.quantity >= item.variant.inventory) ||
                          item.quantity >= inventory
                        }
                        onClick={() => updateCart(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                </Card>
              </Grid>
            );
          })}
        <div className="cartActions">
          <Typography variant="h5">
            Cart Total: <b> {cart.subtotal.formatted_with_symbol} </b>
          </Typography>
          <CardActions>
            <Button size="lg" variant="danger" onClick={emptyCart}>
              Empty Cart
            </Button>
          </CardActions>
        </div>
        <Link to="/Checkout" style={{ width: "100%", marginTop: "1rem" }}>
          <Button size="lg" variant="info" onClick={toggleDrawer}>
            Proceed to Checkout
          </Button>
        </Link>
      </Grid>
    );
  };

  return (
    <div>
      <div onClick={toggleDrawer}>
        <Badge color="secondary" badgeContent={totalItems}>
          <ShoppingCart
            fontSize="large"
            style={{ marginLeft: "20px", cursor: "pointer" }}
          />
        </Badge>
      </div>
      <Drawer anchor="right" open={state} onClose={toggleDrawer}>
        <div>
          <div className="cartHeader">
            <Typography
              variant="h5"
              color="textSecondary"
              gutterBottom
              style={{ marginLeft: "auto" }}
            >
              YOUR CART
            </Typography>
            <Cancel
              onClick={toggleDrawer}
              style={{ cursor: "pointer", marginLeft: "auto" }}
            />
          </div>
          <div className="cartContent">
            {!cart.line_items?.length ? <EmptyCart /> : <FilledCart />}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Cart;
