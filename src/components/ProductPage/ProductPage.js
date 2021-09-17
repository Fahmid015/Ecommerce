import React, { useState, useEffect } from "react";
import { commerce } from "../../lib/commerce";
import "./ProductPage.css";
import ProductPageLeft from "./ProductPageLeft";
import ProductPageRight from "./ProductPageRight";
import { Snackbar, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const ProductPage = ({ addToCart, checkInventory, cart }) => {
  const [product, setProduct] = useState({});
  const [productVariants, setProductVariants] = useState([]);
  const [productInventory, setProductInventory] = useState(0);
  const [variants, setVariants] = useState({});
  const [open, setOpen] = useState(false);

  const fetchProduct = async (id) => {
    const response = await commerce.products.retrieve(id);
    const {
      name,
      price,
      media,
      quantity,
      description,
      assets,
      variant_groups,
      categories,
      inventory,
    } = response;
    setProduct({
      id,
      name,
      assets,
      quantity,
      description,
      categories,
      variant_groups,
      src: media.source,
      price: price.raw,
      inventory: inventory.available,
    });
    // console.log(response);
  };

  useEffect(() => {
    const id = window.location.pathname.split("/");
    fetchProduct(id[2]);
  }, []);

  useEffect(() => {
    const id = window.location.pathname.split("/");
    const fetchVariants = async (id) => {
      const response = await commerce.products.getVariants(id);
      setProductVariants(response.data);
    };
    fetchVariants(id[2]);
  }, [product]);

  // console.log("Product variants >>>", productVariants);

  const handleInventory = (inventory) => {
    setProductInventory(inventory);
  };

  const handleVariants = (vari) => {
    setVariants(vari);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  checkInventory(productInventory);

  return (
    <div className="container productPage">
      <div className="row">
        <ProductPageLeft
          cart={cart}
          addToCart={addToCart}
          selectedProduct={product}
          inventory={productInventory}
          variants={variants}
          handleClick={handleClick}
        />
        <ProductPageRight
          handleVariants={handleVariants}
          handleInventory={handleInventory}
          selectedProduct={product}
          selectedProductVariants={productVariants}
        />
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={product.name + " added to cart"}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default ProductPage;
