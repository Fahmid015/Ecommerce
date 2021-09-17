import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { commerce } from "../../lib/commerce";
import Product from "./Product/Product";
import "./Products.css";

const Products = ({ products, searchResult }) => {
  return (
    <div className="container products">
      {!searchResult.length && (
        <Grid container justifyContent="center" spacing={3}>
          {products.length ? (
            products.map((product) => {
              return (
                <Grid item key={product.id} xs={12} sm={10} md={5} lg={3}>
                  <Product product={product} />
                </Grid>
              );
            })
          ) : (
            <div class="spinner-border m-10" role="status">
              <span class="sr-only"></span>
            </div>
          )}
        </Grid>
      )}
      {searchResult.length && (
        <Grid container justifyContent="center" spacing={3}>
          {searchResult.map((product) => {
            return (
              <Grid item key={product.id} xs={12} sm={10} md={5} lg={3}>
                <Product product={product} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default Products;
