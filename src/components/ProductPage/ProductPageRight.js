import { Grid, Typography } from "@material-ui/core";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import "./ProductPage.css";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

const ProductPageRight = ({
  selectedProduct,
  selectedProductVariants,
  handleInventory,
  handleVariants,
}) => {
  const [product, setProduct] = useState({});
  const [productVariants, setProductVariants] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState();
  const [selectedVariantId, setselectedVariantId] = useState({});

  // Initialize products from API
  useEffect(() => {
    setProduct({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
      inventory: selectedProduct.inventory,
      variantGroups: selectedProduct.variant_groups?.map((variantGroup) => {
        return {
          id: variantGroup.id,
          name: variantGroup.name,
          options: variantGroup.options.map((option) => {
            return {
              id: option.id,
              name: option.name,
              price: option.price.raw,
            };
          }),
        };
      }),
      categories: selectedProduct.categories?.map((category) => {
        return {
          id: category.id,
          name: category.name,
        };
      }),
    });
  }, [selectedProduct]);

  //Inventory without variants
  useEffect(() => {
    if (productVariants?.length < 1 || productVariants === undefined) {
      setInventory(product.inventory);
    }
  }, [product, productVariants]);

  // Initialize product variants from API
  useEffect(() => {
    setProductVariants(
      selectedProductVariants?.map((productVariant) => {
        return {
          id: productVariant.id,
          inventory: productVariant.inventory,
          options: productVariant.options,
        };
      })
    );
  }, [selectedProductVariants]);

  // Inventory
  useEffect(() => {
    let variants = {};
    Object.entries(selectedVariants)?.map(([variantId, variant]) => {
      variants = {
        ...variants,
        [variantId]: variant.option.id,
      };
    });
    productVariants?.map((productVariant) => {
      return (
        _.isEqual(productVariant.options, variants) &&
        setInventory(productVariant.inventory)
      );
    });
  }, [selectedVariants, selectedProduct]);

  useEffect(() => {
    let newPrice = product.price ? product.price : 0;
    Object.entries(selectedVariants).map(([variantId, variant]) => {
      newPrice += variant.option.price;
    });
    setPrice(newPrice);
  }, [selectedVariants, product]);

  const handleSelect = (variantGroup, option) => {
    const selectedId = {
      [variantGroup.id]: option.id,
    };
    const selected = {
      [variantGroup.id]: {
        name: variantGroup.name,
        option: {
          id: option.id,
          name: option.name,
          price: option.price,
        },
      },
    };
    setselectedVariantId({ ...selectedVariantId, ...selectedId });
    setSelectedVariants({ ...selectedVariants, ...selected });
  };

  handleInventory(inventory);
  handleVariants(selectedVariantId);

  return (
    <Grid lg={6} md={12} sm={12} className="productInfo">
      <Typography variant="h3">{product.name}</Typography>
      <Typography variant="h4">Price: ${price.toFixed(2)}</Typography>
      <Typography variant="h6" style={{ marginTop: "1rem" }}>
        <b>Product Description:</b>
      </Typography>
      <Typography
        style={{
          borderBottom: "1px solid lightskyblue",
        }}
        variant="body1"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
      {product.variantGroups &&
        product.variantGroups.map((variantGroup) => {
          return (
            <div className="productSelectors">
              <Typography variant="h6" key={variantGroup.id}>
                {variantGroup.name}:
                <pre>
                  {selectedVariants[variantGroup.id]?.option.name ? (
                    <Typography
                      variant="h6"
                      style={{
                        background: "lightskyblue",
                        paddingLeft: "0.5rem",
                        paddingRight: "0.5rem",
                      }}
                    >
                      {selectedVariants[variantGroup.id]?.option.name}
                    </Typography>
                  ) : (
                    <Typography variant="body1" style={{ color: "red" }}>
                      <b> Select {variantGroup.name} </b>
                    </Typography>
                  )}
                </pre>
                <ButtonGroup>
                  <DropdownButton
                    key={variantGroup.id}
                    title="Select"
                    id="bg-nested-dropdown"
                    size="sm"
                  >
                    {variantGroup.options &&
                      variantGroup.options.map((option) => {
                        return (
                          <Dropdown.Item
                            onSelect={() => handleSelect(variantGroup, option)}
                            value={option.id}
                            key={option.id}
                            eventKey={option.id}
                          >
                            {option.name}
                          </Dropdown.Item>
                        );
                      })}
                  </DropdownButton>
                </ButtonGroup>
              </Typography>
            </div>
          );
        })}
      <div style={{ marginTop: "2rem", borderTop: "1px solid lightskyblue" }}>
        <Typography variant="h6">
          <b>Categories:</b>
        </Typography>
        <div className="categories">
          {product.categories &&
            product.categories.map((c) => {
              return (
                <Typography key={c.id} variant="h6">
                  {c.name}
                </Typography>
              );
            })}
        </div>
      </div>
    </Grid>
  );
};

export default ProductPageRight;
