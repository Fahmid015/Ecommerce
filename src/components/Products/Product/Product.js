import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="card">
      <Link to={`ProductPage/${product.id}`}>
        <CardMedia
          className="cardMedia"
          image={product.media.source}
          title={product.name}
        />
        <div className="middle">
          <div className="text">
            <b>View Product</b>
          </div>
        </div>
        <CardContent>
          <div className="cardContent">
            <Typography variant="body1" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body2">
              {product.price.formatted_with_symbol}
            </Typography>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default Product;
