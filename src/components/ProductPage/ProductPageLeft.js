import { Button, Grid, MobileStepper, Typography } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import _ from "lodash";

import "./ProductPage.css";

const ProductPageLeft = ({
  selectedProduct,
  inventory,
  variants,
  addToCart,
  cart,
  SlideTransition,
  handleClick,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState([]);
  const [isAddedVariant, setIsAddedVariant] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const addItemToCart = () => {
    addToCart(selectedProduct.id, productQuantity, variants);
  };

  useEffect(() => {
    if (selectedProduct.variant_groups?.length === 0) {
      const result = cart.line_items?.filter((item) => {
        return item.product_id === selectedProduct.id;
      });
      setIsAdded(result);
    } else if (selectedProduct.variant_groups?.length > 0) {
      const result = cart.line_items?.filter((item) => {
        return _.isEqual(item.variant?.options, variants);
      });
      setIsAddedVariant(result);
    }
  }, [cart, selectedProduct, variants]);

  return (
    <Grid justifyContent="center" lg={6} md={12}>
      {selectedProduct.assets && selectedProduct.assets.length > 1 ? (
        <div className="image">
          <img
            src={selectedProduct.assets[activeStep].url}
            className="productImage"
            alt=""
          />
          <MobileStepper
            className="mobileStepper"
            steps={selectedProduct.assets.length}
            position="static"
            variant="dots"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === selectedProduct.assets.length - 1}
              >
                NEXT
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                BACK
              </Button>
            }
          />
        </div>
      ) : (
        <div className="image noStepper">
          <img src={selectedProduct.src} className="productImage" />
        </div>
      )}
      <Grid container spacing={1} className="buttonGroup">
        <Grid item lg={7} md={8} sm={7} xs={12}>
          {isAdded &&
          isAdded.length < 1 &&
          isAddedVariant &&
          isAddedVariant.length < 1 ? (
            <button
              disabled={
                inventory === 0 ||
                !inventory ||
                productQuantity > inventory ||
                productQuantity < 1
              }
              className="btn btn-info btn-lg "
              onClick={function (event) {
                addItemToCart();
                handleClick(SlideTransition);
              }}
            >
              {!inventory || (inventory === undefined && inventory !== 0) ? (
                "Please Select Variant"
              ) : (
                <div>
                  Add to Cart
                  <AddShoppingCart style={{ marginLeft: "1rem" }} />
                </div>
              )}
            </button>
          ) : (
            <button disabled className="btn btn-info btn-lg ">
              Added to Cart
            </button>
          )}
        </Grid>
        <Grid item lg={5} md={4} sm={5} xs={12}>
          <div class="input-group input-group-lg">
            <span class="input-group-text" id="inputGroup-sizing-lg">
              Quantity:
            </span>
            <input
              type="number"
              value={productQuantity}
              onChange={(e) => {
                setProductQuantity(e.target.value);
              }}
              style={{ textAlign: "center" }}
              min="1"
              max={inventory || 25}
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
            />
          </div>
        </Grid>
        <div className="inventory">
          {inventory !== null ? (
            <Typography variant="h6">
              Currently in stock: {inventory === 0 ? "Out of Stock" : inventory}
            </Typography>
          ) : (
            <Typography variant="h6">Currently in stock: N/A</Typography>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default ProductPageLeft;
